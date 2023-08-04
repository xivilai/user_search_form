import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "react-input-mask";

import "./App.css";

interface Inputs {
  email: string;
  phone: string;
}

const searchUsers = async (formData: Inputs) => {
  let url = `/api/users?email=${formData.email}`;
  if (formData.phone) {
    url += `&phone=${formData.phone}`;
  }

  const response = await axios.get(url);

  return response.data();
};

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const mutation = useMutation(searchUsers);

  const handleSearch: SubmitHandler<Inputs> = (formData) => {
    mutation.mutate(formData);
  };

  return (
    <form action="/api/users" onSubmit={handleSubmit(handleSearch)}>
      <div>
        <label>
          Email{" "}
          <input
            type="email"
            {...register("email", {
              required: "Email address is required",
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
          />
        </label>

        {errors.email && <p role="alert">{errors.email.message}</p>}
      </div>

      <div>
        <label>
          Phone{" "}
          <Input
            mask="99-99-99"
            {...register("phone", { pattern: /^\d{2}-\d{2}-\d{2}$/ })}
          />
        </label>
        {errors.phone && (
          <p role="alert">Phone must be in the format ##-##-##</p>
        )}
      </div>

      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? "Loading..." : "Search users"}
      </button>
    </form>
  );
}

export default App;
