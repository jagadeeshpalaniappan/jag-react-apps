import axios from "axios";

import { apiConfig } from "../../../app/config";
const API_URL = `${apiConfig.post}/posts`;

export async function getPosts(config) {
  console.log("fetch::getPosts::", config);
  const params = {};
  const response = await axios.get(API_URL, { params });
  console.log("fetch::getPosts:: response:", response);
  const { data, meta } = response.data;
  return { data, pagination: meta };
}
