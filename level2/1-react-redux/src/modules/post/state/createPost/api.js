import axios from "axios";
import { apiConfig } from "../../../app/config";
const API_URL = `${apiConfig.post}/posts`;

export async function createPost(post) {
  console.log("fetch::createPost::", post);

  const { title, body, userId } = post;
  const reqBody = { title, body, userId };
  const response = await axios.post(API_URL, reqBody);

  console.log("fetch::createPost:: response:", response);
  return response.data.post;
}
