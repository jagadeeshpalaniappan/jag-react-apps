import axios from "axios";
import { apiConfig } from "../../../../modules/app/config";
const API_URL = `${apiConfig.user}/users`;

export async function deleteUser(user) {
  console.log("fetch::deleteUser:: user:", user);

  const response = await axios.delete(`${API_URL}/${user.id}`);

  console.log("fetch::deleteUser:: response:", response);
  return response.data;
}
