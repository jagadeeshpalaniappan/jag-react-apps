import axios from "axios";

import { apiConfig } from "../../../app/config";
const API_URL = `${apiConfig.user}/users`;

export async function getUsers(config) {
  console.log("fetch::getUsers::", config);
  const params = {};
  const response = await axios.get(API_URL, { params });
  console.log("fetch::getUsers:: response:", response);
  const { data, meta } = response.data;
  return { data, pagination: meta };
}
