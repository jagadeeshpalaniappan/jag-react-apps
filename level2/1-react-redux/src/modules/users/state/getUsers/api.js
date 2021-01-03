import axios from "axios";

import { API_URL_MAP, USERS } from "../../constants";
// const API_URL = `${API_URL_MAP[USERS]}/users`;
const API_URL = `${API_URL_MAP[USERS]}/users`;

export async function getUsers(config) {
  console.log("fetch::getUsers::", config);
  const params = {};
  const response = await axios.get(API_URL, { params });
  console.log("fetch::getUsers:: response:", response);
  const { data, meta } = response.data;
  return { data, pagination: meta };
}
