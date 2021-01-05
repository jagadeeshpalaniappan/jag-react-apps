import axios from "axios";
import { apiConfig } from "../../../app/config";
const API_URL = `${apiConfig.post}/posts`;

export async function createPost(post) {
  console.log("fetch::createPost::", post);

  const { name, email, username, phone, sex, role } = post;
  const body = { name, email, username, phone, sex, role };
  const response = await axios.post(API_URL, body);

  console.log("fetch::createPost:: response:", response);
  return response.data.post;
}
