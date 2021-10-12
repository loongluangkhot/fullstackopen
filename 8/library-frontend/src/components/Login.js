import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import Notify from "./Notify";
import { LOGIN } from "../queries";
import { useNotify } from "../hooks";

const Login = (props) => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror, notify] = useNotify();
  const [login, loginResult] = useMutation(LOGIN, {
    onError: (err) => {
      notify(err.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (loginResult.data) {
      const token = loginResult.data.login.value;
      props.onLogin(token);
    }
  }, [loginResult.data]); // eslint-disable-line

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    if (username && password) {
      console.log("logging in...");
      login({
        variables: {
          username,
          password,
        },
      });
      setusername("");
      setpassword("");
      seterror("");
    }
  };

  return (
    <div>
      <Notify errorMessage={error} />
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setusername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setpassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
