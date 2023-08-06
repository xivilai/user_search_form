import { useForm, SubmitHandler } from "react-hook-form";
import Input from "react-input-mask";

import "./App.css";
import { useUserSearch } from "./hooks/useUserSearch";
import { User } from "./types";

type Inputs = Pick<User, "email" | "number">;

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { data: users, isLoading, isError, mutate } = useUserSearch();

  const handleSearch: SubmitHandler<Inputs> = (formData) => {
    mutate(formData);
  };

  return (
    <>
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
            Number{" "}
            <Input
              mask="99-99-99"
              {...register("number", { pattern: /^\d{2}-\d{2}-\d{2}$/ })}
            />
          </label>
          {errors.number && (
            <p role="alert">Number must be in the format ##-##-##</p>
          )}
        </div>
        {isError ? <p role="alert">Error occured</p> : null}
        <button type="submit">Search users</button>
      </form>

      {isLoading && <p>"Loading..."</p>}
      {users?.length === 0 && <p>No users found</p>}
      {users?.length ? <h2>Users</h2> : null}

      <ul>
        {users?.map((user, i) => (
          <div key={i} style={{ marginBottom: "16px" }}>
            <div>Email: {user.email}</div>
            <div>Number: {user.number}</div>
          </div>
        ))}
      </ul>
    </>
  );
}

export default App;
