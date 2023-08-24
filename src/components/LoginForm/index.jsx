import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Input";
import Button from "../Button";
import { sendRequest } from "../../config/request";
import { useState } from "react";
const LoginForm = ({ onToggle }) => {
  const navigation = useNavigate();
  const [credentials, setCredentials] = useState({
    email: null,
    password: null,
  });
  const [error, setError] = useState(null);
  const loginHandler = async () => {
    try {
      const response = await sendRequest({
        method: "POST", route: "/auth/login", body: credentials,
      });
      if (response.token) {
        localStorage.setItem("access_token", response.token);
        navigation("/landing");
      } else{
        setError(response.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  return (
    <div className="flex column light-bg spaceBetween rounded authenticationBox">
      <h1>Login</h1>
      <div className="spacer-30"></div>
      <Input
        label={"Email"}
        placeholder={"Type your email here..."}
        onChange={(email) =>
          setCredentials({ ...credentials, email })
        }
      />
      <div className="spacer-15"></div>
      <Input
        label={"Password"}
        placeholder={"Type your password here..."}
        type={"password"}
        onChange={(password) =>
          setCredentials({ ...credentials, password })
        }
      />
      {error && <p>{error}</p>}
      <div className="spacer-30"></div>
      <Button
        color={"primary-bg"}
        textColor={"white-text"}
        text={"Login"}
        onClick={() => loginHandler()}
      />
      <div className="spacer-10"></div>
      <p className="black-text">
        Don't have an account?{" "}
        <span className="pointer primary-text" onClick={() => onToggle()}>
          Register
        </span>
      </p>
    </div>
  );
};
export default LoginForm;