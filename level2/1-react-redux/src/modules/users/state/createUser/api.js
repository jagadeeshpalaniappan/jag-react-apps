import axios from "axios";
import { API_URL_MAP, USERS } from "../../constants";
// const API_URL = `${API_URL_MAP[USERS]}/users`;
const API_URL = `${API_URL_MAP[USERS]}/users`;

export async function createUser(user) {
  console.log("fetch::createUser::", user);

  const { name, email, username, phone, sex, role } = user;
  const body = {
    name,
    email: "tmp@jag.sh",
    username: "jagtmp",
    phone: "1111",
    sex: "M",
    role: "Dev",
  };
  const response = await axios.post(API_URL, body);

  console.log("fetch::createUser:: response:", response);
  return response.data.user;
}
