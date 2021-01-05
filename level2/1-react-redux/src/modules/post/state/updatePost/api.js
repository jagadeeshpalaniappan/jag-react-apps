import axios from "axios";
import { apiConfig } from "../../../app/config";
const API_URL = `${apiConfig.post}/posts`;

export async function updatePost(post) {
  console.log("fetch::updatePost::", post);

  const { name, email, username, phone, sex, role, isActive } = post;
  const body = { name, email, username, phone, sex, role, isActive };
  const response = await axios.put(`${API_URL}/${post.id}`, body);

  console.log("fetch::updatePost:: response:", response);
  return response.data.post;
}
