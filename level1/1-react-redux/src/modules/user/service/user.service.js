export {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "./user.service.rest";

// GraphQL (graphql-request) // (smaller size)
// Need: graphql-request
/*
export {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "./user.service.graphql";
*/

// GraphQL (ApolloClient) // TEST-ONLY (big size)
// Need: apollo-boost, graphql (not sure why do we need this?)
/* 
export {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "./user.service.graphql.appollo";
 */
