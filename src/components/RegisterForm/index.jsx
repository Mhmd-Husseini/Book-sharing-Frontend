import React from "react";
import Input from "../Input";
import Button from "../Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendRequest } from "../../config/request";
import "./style.css"; 

const RegisterForm = ({ onToggle }) => {
  const navigation = useNavigate();
  const [credentials, setCredentials] = useState({
    email: null,
    password: null,
    name: null,
  });

  const registerHandler = async () => {
    try {
      const response = await sendRequest({
        method: "POST",
        route: "/auth/register",
        body: credentials,
      });
      localStorage.setItem("access_token", response.token);
      navigation("/landing");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-form-container">
      <h1>Register</h1>
      <Input
        label={"Email"}
        placeholder={"Type your email here..."}
        onChange={(email) => setCredentials({ ...credentials, email })}
      />
      <Input
        label={"Password"}
        placeholder={"Type your password here..."}
        onChange={(password) => setCredentials({ ...credentials, password })}
      />
      <Input
        label={"Name"}
        placeholder={"Type your name here..."}
        onChange={(name) => setCredentials({ ...credentials, name })}
      />
      <Button
        color={"primary-bg"}
        textColor={"white-text"}
        text={"Signup"}
        onClick={() => registerHandler()}
      />
      <p className="login-link">
        Already have an account?{" "}
        <span className="pointer primary-text" onClick={() => onToggle()}>
          Login
        </span>
      </p>
    </div>
  );
};

export default RegisterForm;
