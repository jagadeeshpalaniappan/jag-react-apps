import axios from "axios";
import { apiConfig } from "../../../../modules/app/config";
const API_URL = `${apiConfig.user1}/users`;

export async function createUser(user) {
  console.log("fetch::createUser::", user);

  const { name, email, username, phone, sex, role } = user;
  const body = { name, email, username, phone, sex, role };
  const response = await axios.post(API_URL, body);

  console.log("fetch::createUser:: response:", response);
  return response.data.user;
}
