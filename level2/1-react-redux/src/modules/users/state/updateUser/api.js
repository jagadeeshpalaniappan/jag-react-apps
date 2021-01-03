import axios from "axios";
import { API_URL_MAP, USERS } from "../../constants";
// const API_URL = `${API_URL_MAP[USERS]}/users`;
const API_URL = `${API_URL_MAP[USERS]}/users`;

export async function updateUser(user) {
  console.log("fetch::updateUser::", user);

  const { name, email, username, phone, sex, role } = user;
  const body = {
    name,
    email: "tmp@jag.sh",
    username: "jagtmp",
    phone: "1111",
    sex: "M",
    role: "Dev",
  };
  const response = await axios.put(`${API_URL}/${user.id}`, body);

  console.log("fetch::updateUser:: response:", response);
  return response.data.user;
}
