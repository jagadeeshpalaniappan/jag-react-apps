import axios from "axios";

// const USER_REST_API = "https://jag-rest-api.vercel.app/demo/rest/v1/api/users";
const USER_REST_API = "/demo/rest/v1/api/users"; // LOCAL

// const covertKeyToId = (item) => ({ ...item, id: item.key });
// const covertKeyToIdArr = (items) => {
//   return items.map(covertKeyToId);
// };

export const getUsers = async (config) => {
  console.log("fetch::getUsers::", config);
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

  const response = await axios.get(USER_REST_API, { params });
  console.log("fetch::getUsers:: response:", response);
  const { data, meta } = response.data;
  return { data, page: meta };
};

export const getUser = async (user) => {
  console.log("fetch::getUser::");

  const response = await axios.get(`${USER_REST_API}/${user.id}`);
  console.log("fetch::getUsers:: response:", response);
  return response.data.user;
};

export const createUser = async (user) => {
  console.log("fetch::createUser:: user:", user);

  const { name, email, username, phone, sex, role } = user;
  const body = { name, email, username, phone, sex, role };
  const response = await axios.post(USER_REST_API, body);

  console.log("fetch::createUser:: response:", response);
  return response.data.user;
};

export const updateUser = async (user) => {
  console.log("fetch::updateUser:: user:", user);

  const { id, name, email, username, phone, sex, role } = user;
  const body = { id, name, email, username, phone, sex, role };
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