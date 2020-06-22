import axios from "axios";

// const POST_REST_API = "https://jag-rest-api.vercel.app/demo/rest/v1/api/posts";
const POST_REST_API = "/demo/rest/v1/api/posts"; // LOCAL

// const covertKeyToId = (item) => ({ ...item, id: item.key });
// const covertKeyToIdArr = (items) => {
//   return items.map(covertKeyToId);
// };

export const getPosts = async (config) => {
  console.log("fetch::getPosts::", config);
  const params = {};

  // PAGINATION:
  if (config.pageSize) params.pageSize = config.pageSize;
  else params.pageSize = "10"; // default
  if (config.pageBefore) params.pageBefore = config.pageBefore;
  if (config.pageAfter) params.pageAfter = config.pageAfter;

  // SORT & SEARCH:
  if (config.sortBy && config.sortBy !== "default") params.sort = config.sortBy;
  if (config.searchBy && config.searchBy.length > 0)
    params.search = config.searchBy;

  // // FILTER:
  if (config.filters) {
    const filters = config.filters.map((filter) => {
      if (filter.key === "isActive") {
        return { ...filter, value: filter.value === "active" };
      }
      return { ...filter };
    });
    params.filters = JSON.stringify(filters);
  }

  const response = await axios.get(POST_REST_API, { params });
  console.log("fetch::getPosts:: response:", response);
  const { data, meta } = response.data;
  return { data, pagination: meta };
};

export const getPost = async (post) => {
  console.log("fetch::getPost::");

  const response = await axios.get(`${POST_REST_API}/${post.id}`);
  console.log("fetch::getPosts:: response:", response);
  return { post: response.data.post };
};

export const createPost = async (post) => {
  console.log("fetch::createPost:: post:", post);

  const { title, body, userId } = post;
  const reqBody = { title, body, userId };
  const response = await axios.post(POST_REST_API, reqBody);

  console.log("fetch::createPost:: response:", response);
  return response.data.post;
};

export const updatePost = async (post) => {
  console.log("fetch::updatePost:: post:", post);

  const { title, body, userId, isActive } = post;
  const reqBody = { title, body, userId, isActive };
  const response = await axios.put(`${POST_REST_API}/${post.id}`, reqBody);

  console.log("fetch::updatePost:: response:", response);
  return response.data.post;
};

export const deletePost = async (post) => {
  console.log("fetch::deletePost:: post:", post);

  const response = await axios.delete(`${POST_REST_API}/${post.id}`);

  console.log("fetch::deletePost:: response:", response);
  return response.data;
};

export const getPostsByPostId = async (config) => {
  console.log("fetch::getPostsByPostId::", config);

  const params = {};
  params.filters = JSON.stringify([{ key: "postId", value: config.postId }]);
  const response = await axios.get(`/demo/rest/v1/api/posts`, { params });

  console.log("fetch::getPostsByPostId:: response:", response);
  const { data: posts, meta: pagination } = response.data;
  return { posts, pagination };
};

export const getTodosByPostId = async (config) => {
  console.log("fetch::getTodosByPostId::", config);

  const params = {};
  params.filters = JSON.stringify([{ key: "postId", value: config.postId }]);
  const response = await axios.get(`/demo/rest/v1/api/todos`, { params });

  console.log("fetch::getTodosByPostId:: response:", response);
  const { data: todos, meta: pagination } = response.data;
  return { todos, pagination };
};
