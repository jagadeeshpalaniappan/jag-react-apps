import axios from "axios";
import { apiConfig } from "../../../app/config";
const API_URL = `${apiConfig.post}/posts`;

export async function deletePost(post) {
  console.log("fetch::deletePost:: post:", post);

  const response = await axios.delete(`${API_URL}/${post.id}`);

  console.log("fetch::deletePost:: response:", response);
  return response.data;
}
