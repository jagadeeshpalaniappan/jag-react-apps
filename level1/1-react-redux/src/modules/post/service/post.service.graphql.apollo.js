import ApolloClient, { gql } from "apollo-boost";

import { arrToMap } from "../../common/utils/all.utils";

// const GRAPHQL_API = "https://jag-rest-api.vercel.app/demo/graphql/v1/api";
const GRAPHQL_API = "/demo/graphql/v1/api"; // LOCAL

const client = new ApolloClient({ uri: GRAPHQL_API });

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
  const response = await client.query({ query, variables: { options } });

  console.log("fetch::getPosts:: response:", response);
  const { data, meta } = response.data.posts;
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

  const response = await client.query({ query, variables: { id: post.id } });

  console.log("fetch::getPosts:: response:", response);
  return response.data.post;
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
  const response = await client.mutate({ mutation, variables: { input } });

  console.log("fetch::createPost:: response:", response);
  return response.data.createPost;
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
  const response = await client.mutate({ mutation, variables: { id, input } });

  console.log("fetch::updatePost:: response:", response);
  return response.data.updatePost;
};

export const deletePost = async (post) => {
  console.log("fetch::deletePost:: post:", post);
  const mutation = gql`
    mutation($id: ID!) {
      deletePost(id: $id)
    }
  `;

  const variables = { id: post.id };
  const response = await client.mutate({ mutation, variables });

  console.log("fetch::deletePost:: response:", response);
  return response.data.deletePost;
};
