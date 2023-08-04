import { useQuery } from "@tanstack/react-query";
import "./App.css";
import axios from "axios";
import { FormEvent, useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const {
    data: users,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get(`/users?email=${email}`),
    refetchOnWindowFocus: false
  });

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const form = evt.target as HTMLFormElement;
    const email: string = form.email;
    const phoneNumber: string = form.phoneNumber;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          required
        />
        <input
          type="number"
          name="phone-number"
          autoComplete="off"
          placeholder="phone number"
          required
        />
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Search users"}
      </button>
    </form>
  );
}

export default App;
