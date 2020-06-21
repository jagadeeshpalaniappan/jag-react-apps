import ApolloClient, { gql } from "apollo-boost";

import { arrToMap } from "../../common/utils/all.utils";

// const GRAPHQL_API = "https://jag-rest-api.vercel.app/demo/graphql/v1/api";
const GRAPHQL_API = "/demo/graphql/v1/api"; // LOCAL

const client = new ApolloClient({ uri: GRAPHQL_API });

const _getUsersOptions = (config) => {
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

export const getUsers = async (config) => {
  console.log("fetch::getUsers::", config);

  const query = gql`
    query($options: UsersQueryOptions) {
      users(options: $options) {
        data {
          id
          name
          username
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

  const options = _getUsersOptions(config);
  const response = await client.query({ query, variables: { options } });

  console.log("fetch::getUsers:: response:", response);
  const { data, meta } = response.data.users;
  return { data, page: meta };
};

export const getUser = async (user) => {
  console.log("fetch::getUser::", user);

  // TODO: filters ---> filterBy

  const query = gql`
    query($id: ID!) {
      user(id: $id) {
        id
        name
        email
        username
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

  const response = await client.query({ query, variables: { id: user.id } });

  console.log("fetch::getUsers:: response:", response);
  return response.data.user;
};

export const createUser = async (user) => {
  console.log("fetch::createUser:: user:", user);
  const mutation = gql`
    mutation($input: CreateUserInput!) {
      createUser(input: $input) {
        id
        name
      }
    }
  `;

  const { name, email, username, phone, sex, role } = user;
  const input = { name, email, username, phone, sex, role };
  const response = await client.mutate({ mutation, variables: { input } });

  console.log("fetch::createUser:: response:", response);
  return response.data.createUser;
};

export const updateUser = async (user) => {
  console.log("fetch::updateUser:: user:", user);
  const mutation = gql`
    mutation($id: ID!, $input: UpdateUserInput!) {
      updateUser(id: $id, input: $input) {
        id
        name
      }
    }
  `;

  const { id, name, email, username, phone, sex, role } = user;
  const input = { name, email, username, phone, sex, role };
  const response = await client.mutate({ mutation, variables: { id, input } });

  console.log("fetch::updateUser:: response:", response);
  return response.data.updateUser;
};

export const deleteUser = async (user) => {
  console.log("fetch::deleteUser:: user:", user);
  const mutation = gql`
    mutation($id: ID!) {
      deleteUser(id: $id)
    }
  `;

  const variables = { id: user.id };
  const response = await client.mutate({ mutation, variables });

  console.log("fetch::deleteUser:: response:", response);
  return response.data.deleteUser;
};
