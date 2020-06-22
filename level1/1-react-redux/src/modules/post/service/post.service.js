export {
  getPosts,
  getPost,
  getPostsByUserId,
  getTodosByPostId,
  createPost,
  updatePost,
  deletePost,
} from "./post.service.rest";
// } from "./post.service.graphql";

// GraphQL (graphql-request) // (smaller size)
// Need: graphql-request

// export {
//   getPosts,
//   getPost,
//   createPost,
//   updatePost,
//   deletePost,
// } from "./post.service.graphql";

// GraphQL (ApolloClient) // TEST-ONLY (big size)
// Need: apollo-boost, graphql (not sure why do we need this?)
/* 
export {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "./post.service.graphql.appollo";
 */
