import axios from "axios";
import { apiConfig } from "../../../../modules/app/config";
const API_URL = `${apiConfig.user}/users`;

export async function updateUser(user) {
  console.log("fetch::updateUser::", user);

  const { name, email, username, phone, sex, role, isActive } = user;
  const body = { name, email, username, phone, sex, role, isActive };
  const response = await axios.put(`${API_URL}/${user.id}`, body);

  console.log("fetch::updateUser:: response:", response);
  return response.data.user;
}
