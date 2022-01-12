import jwtDecode from "jwt-decode";
import { createContext, useReducer } from "react";

import cookies from "js-cookie";

export const initialState = {
  user: null,
};

if (cookies.get("jwtToken")) {
  const token = jwtDecode(cookies.get("jwtToken"));

  if (token.exp * 1000 < Date.now()) {
    cookies.remove("jwtToken");
  } else {
    initialState.user = token;
  }
}

const AuthContext = createContext({
  user: null,
  login: (data) => {},
  logout: () => {},
});

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const login = (data) => {
    cookies.set("jwtToken", data.token);

    dispatch({
      type: "LOGIN",
      payload: data,
    });
  };

  const logout = () => {
    cookies.remove("jwtToken");
    dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
