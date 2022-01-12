import { useState } from "react";

export const formHooks = (callback,initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    console.log("clicked");
    e.preventDefault();
     callback();
  };
  return {
    onChange,
    onSubmit,
    values,
  };
};
