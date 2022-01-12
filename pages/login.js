import { useContext, useEffect, useState } from "react";
import { formHooks } from "../util/hooks";
import { AuthContext } from "../context/authentication";
import { useRouter } from "next/router";
import { useMutation } from "urql";

const LOGIN_MUTATION = `
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      email
      username
      createdAt
      token
      photo
    }
  }
`;

export default function Login() {
  const context = useContext(AuthContext);

  const router = useRouter();
  const [errors, setErrors] = useState({});

  const initialState = {
    username: "",
    password: "",
  };
  const { onChange, onSubmit, values } = formHooks(
    loginUserCallback,
    initialState
  );
  const [result, loginUser] = useMutation(LOGIN_MUTATION);

  function loginUserCallback() {
    loginUser(values).then((result) => {
      if (result.error) {
        setErrors(result.error.graphQLErrors[0].extensions.errors);
      } else {
        context.login(result.data.login);
        router.push("/");
      }
    });
  }
  return (
    <form
      onSubmit={onSubmit}
      className={"bg-grey-lighter min-h-screen flex flex-col"}
    >
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Login</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="username"
            placeholder="Username"
            value={values.username}
            onChange={onChange}
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={onChange}
          />

          <button
            type="submit"
            className="w-full bg-neutral-800 text-zinc-50 text-center py-3 rounded focus:outline-none my-1"
          >
            Login
          </button>
        </div>

        {Object.keys(errors).length > 0 && (
          <ul>
            {Object.values(errors).map((value) => (
              <li className="text-red-600" key={value}>
                *{value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}
