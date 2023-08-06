import { User } from "../types";
import userData from "../users.json";

async function searchUsers(email: string, number?: string) {
  let users = userData.filter((user: User) => user.email === email);
  if (number) {
    number = formatNumber(number);
    users = users.filter((user: User) => user.number === number);
    console.log(number, users);
  }

  return users;
}

function formatNumber(number: string) {
  return number.replace(/-/g, '');
}

export { searchUsers };
