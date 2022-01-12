import { useContext, useState } from "react";

import { useRouter } from "next/router";
import { formHooks } from "../util/hooks";
import { AuthContext } from "../context/authentication";
import { useMutation } from "urql";

const REGISTER_MUTATION = `
  mutation (
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
      photo
    }
  }
`;

export default function Register() {
  const context = useContext(AuthContext);
  const router = useRouter();
  const [errors, setErrors] = useState({});

  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const { onChange, onSubmit, values } = formHooks(registerUser, initialState);

  const [result, addUser] = useMutation(REGISTER_MUTATION);

  function registerUser() {
    addUser(values).then((result) => {
      if (result.error) {
        setErrors(result.error.graphQLErrors[0].extensions.errors);
      } else {
        context.login(result.data.register);
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
          <h1 className="mb-8 text-3xl text-center">Register</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="username"
            placeholder="Username"
            value={values.username}
            onChange={onChange}
          />

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            value={values.email}
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
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={values.confirmPassword}
            onChange={onChange}
          />

          <button
            type="submit"
            className="w-full bg-neutral-800 text-zinc-50 text-center py-3 rounded focus:outline-none my-1"
          >
            Create Account
          </button>

          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <a
            className="no-underline border-b border-blue text-blue"
            href="../login/"
          >
            Log in
          </a>
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
