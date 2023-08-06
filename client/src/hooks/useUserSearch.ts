import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { User } from "../types";

function useUserSearch() {
  const mutation = useMutation(searchUsers);
  return mutation;
}

const { CancelToken } = axios;
let source = CancelToken.source();

const searchUsers = async (
  query: Pick<User, "email" | "number">
): Promise<User[]> => {
  let url = `http://localhost:8000/api/users?email=${query.email}`;
  if (query.number) {
    url += `&number=${query.number}`;
  }

  source.cancel();
  source = CancelToken.source();

  try {
    const response = await axios.get(url, { cancelToken: source.token });

    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request was cancelled");
    } else {
      console.error("Request failed", error);
    }

    return [];
  }
};

export { useUserSearch };
