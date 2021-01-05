import axios from "axios";
import { apiConfig } from "../../../app/config";
const API_URL = `${apiConfig.post}/posts`;

export async function updatePost(post) {
  console.log("fetch::updatePost::", post);

  const { title, body, userId, isActive } = post;
  const reqBody = { title, body, userId, isActive };
  const response = await axios.put(`${API_URL}/${post.id}`, reqBody);

  console.log("fetch::updatePost:: response:", response);
  return response.data.post;
}
