import React from "react";
import Input from "../Input";
import Button from "../Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendRequest } from "../../config/request";
import "./style.css"; 

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
        method: "POST",
        route: "/auth/login",
        body: credentials,
      });
      if (response.token) {
        localStorage.setItem("access_token", response.token);
        navigation("/landing");
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="login-form-container">
      <h1>Login</h1>
      <Input
        label={"Email"}
        placeholder={"Type your email here..."}
        onChange={(email) => setCredentials({ ...credentials, email })}
      />
      <Input
        label={"Password"}
        placeholder={"Type your password here..."}
        type={"password"}
        onChange={(password) => setCredentials({ ...credentials, password })}
      />
      {error && <p className="error-message">{error}</p>}
      <Button
        color={"primary-bg"}
        textColor={"white-text"}
        text={"Login"}
        onClick={() => loginHandler()}
      />
      <p className="register-link">
        Don't have an account?{" "}
        <span className="pointer primary-text" onClick={() => onToggle()}>
          Register
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
