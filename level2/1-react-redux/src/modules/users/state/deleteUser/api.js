import axios from "axios";
import { API_URL_MAP, USERS } from "../../constants";
// const API_URL = `${API_URL_MAP[USERS]}/users`;
const API_URL = `${API_URL_MAP[USERS]}/users`;

export async function deleteUser(user) {
  console.log("fetch::deleteUser:: user:", user);

  const response = await axios.delete(`${API_URL}/${user.id}`);

  console.log("fetch::deleteUser:: response:", response);
  return response.data;
}
