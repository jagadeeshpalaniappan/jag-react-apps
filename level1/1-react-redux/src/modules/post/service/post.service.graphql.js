import { GraphQLClient } from "graphql-request";
import { arrToMap } from "../../common/utils/all.utils";

export function gql(string) {
  return String(string).replace(`\n`, ` `);
}

// const GRAPHQL_API = "https://jag-rest-api.vercel.app/demo/graphql/v1/api";
const GRAPHQL_API = "/demo/graphql/v1/api"; // LOCAL

const client = new GraphQLClient(GRAPHQL_API, {
  headers: {
    // authorization: "Bearer MY_TOKEN",
  },
});

const _getPostsOptions = (config) => {
  const options = {};

  // PAGINATION:
  const { pageSize: size, pageBefore: before, pageAfter: after } = config;
  options.pagination = { size: Number(size) || 10, before, after };

  // SORT & SEARCH:
  const { sortBy, searchBy, filters } = config;
  if (sortBy !== "default") options.sort = config.sortBy;
  if (searchBy && searchBy.length > 0) options.search = config.searchBy;

  // FILTER:
  if (filters && filters.length > 0) {
    const filterBy = arrToMap(filters); // filters ---> filterBy
    filterBy.isActive = filterBy.isActive === "active"; // "active" to true/false
    options.filterBy = filterBy;
  }

  return options;
};

export const getPosts = async (config) => {
  console.log("fetch::getPosts::", config);

  const query = gql`
    query($options: PostsQueryOptions) {
      posts(options: $options) {
        data {
          id
          name
          postname
          sex
          role
        }
        meta {
          before
          after
        }
      }
    }
  `;

  const options = _getPostsOptions(config);
  const variables = { options };
  const response = await client.request(query, variables);

  console.log("fetch::getPosts:: response:", response);
  const { data, meta } = response.posts;
  return { data, pagination: meta };
};

export const getPost = async (post) => {
  console.log("fetch::getPost::", post);

  // TODO: filters ---> filterBy

  const query = gql`
    query($id: ID!) {
      post(id: $id) {
        id
        name
        email
        postname
        phone
        sex
        role
        isActive
        posts {
          id
          title
          body
          isActive
        }
        todos {
          id
          title
          description
          isActive
        }
      }
    }
  `;

  const variables = { id: post.id };
  const response = await client.request(query, variables);

  console.log("fetch::getPosts:: response:", response);
  const { posts, todos, ...postOnly } = response.post;
  return { post: postOnly, posts, todos };
};

export const createPost = async (post) => {
  console.log("fetch::createPost:: post:", post);
  const mutation = gql`
    mutation($input: CreatePostInput!) {
      createPost(input: $input) {
        id
        name
      }
    }
  `;

  const { name, email, postname, phone, sex, role } = post;
  const input = { name, email, postname, phone, sex, role };
  const variables = { input };
  const response = await client.request(mutation, variables);

  console.log("fetch::createPost:: response:", response);
  return response.createPost;
};

export const updatePost = async (post) => {
  console.log("fetch::updatePost:: post:", post);
  const mutation = gql`
    mutation($id: ID!, $input: UpdatePostInput!) {
      updatePost(id: $id, input: $input) {
        id
        name
      }
    }
  `;

  const { id, name, email, postname, phone, sex, role } = post;
  const input = { name, email, postname, phone, sex, role };
  const variables = { id, input };
  const response = await client.request(mutation, variables);

  console.log("fetch::updatePost:: response:", response);
  return response.updatePost;
};

export const deletePost = async (post) => {
  console.log("fetch::deletePost:: post:", post);
  const mutation = gql`
    mutation($id: ID!) {
      deletePost(id: $id)
    }
  `;

  const variables = { id: post.id };
  const response = await client.request(mutation, variables);

  console.log("fetch::deletePost:: response:", response);
  return response.deletePost;
};
