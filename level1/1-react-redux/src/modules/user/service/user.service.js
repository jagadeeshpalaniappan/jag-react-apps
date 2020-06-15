import axios from "axios";

const USER_REST_API = "https://wonder-31s-staging.begin.app/api/v1/any/users";

// const covertKeyToId = (item) => ({ ...item, id: item.key });
// const covertKeyToIdArr = (items) => {
//   return items.map(covertKeyToId);
// };

export const getUsers = async (config) => {
  console.log("fetch::getUsers::", config);
  const params = {};
  if (config.sortBy && config.sortBy !== "default") params.sort = config.sortBy;

  const response = await axios.get(USER_REST_API, { params });
  console.log("fetch::getUsers:: response:", response);

  return response.data.users.data;
};

export const getUser = async (user) => {
  console.log("fetch::getUser::");

  const response = await axios.get(`${USER_REST_API}/${user.id}`);
  console.log("fetch::getUsers:: response:", response);
  return response.data.user;
};

export const createUser = async (user) => {
  console.log("fetch::createUser:: user:", user);

  const body = {
    name: user.name,
    email: user.email,
    username: user.username,
  };
  const response = await axios.post(USER_REST_API, body);

  console.log("fetch::createUser:: response:", response);
  return response.data.user;
};

export const updateUser = async (user) => {
  console.log("fetch::updateUser:: user:", user);

  // const body = {
  //   id: user.id,
  //   name: user.name,
  //   email: user.email,
  //   username: user.username,
  // };

  const body = user;
  const response = await axios.put(`${USER_REST_API}/${user.id}`, body);

  console.log("fetch::updateUser:: response:", response);
  return response.data.user;
};

export const deleteUser = async (user) => {
  console.log("fetch::deleteUser:: user:", user);

  const response = await axios.delete(`${USER_REST_API}/${user.id}`);

  console.log("fetch::deleteUser:: response:", response);
  return response.data;
};
