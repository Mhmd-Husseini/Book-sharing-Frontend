import React from "react";
import Input from "../Input";
import Button from "../Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendRequest } from "../../config/request";
const RegisterForm = ({ onToggle }) => {
  const navigation = useNavigate();
  const [credentials, setCredentials] = useState({
    email: null,
    password: null,
    name: null
  });
  const registerHandler = async () => {
    try {
      const response = await sendRequest({ method: "POST", route: "/auth/register", body: credentials,
      });
      localStorage.setItem("access_token", response.token);
      navigation("/landing");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex column spaceBetween light-bg rounded authenticationBox">
      <h1>Register</h1>
      <div className="spacer-30"></div>
      <Input label={"Email"} placeholder={"Type your email here..."} onChange={(email) =>
          setCredentials({...credentials, email})
        }/>
      <div className="spacer-15"></div>
      <Input label={"Password"} placeholder={"Type your password here..."} onChange={(password) =>
          setCredentials({...credentials, password})
        }/>
      <div className="spacer-15"></div>
      <Input
        label={"Name"}
        placeholder={"Type your name here..."} onChange={(name) =>
          setCredentials({...credentials, name})
        }
      />
      <div className="spacer-30"></div>
      <Button
        color={"primary-bg"}
        textColor={"white-text"}
        text={"Signup"}
        onClick={() => registerHandler()}
      />
      <div className="spacer-10"></div>
      <p className="black-text">
        Already have an account?{" "}
        <span className="pointer primary-text" onClick={() => onToggle()}>
          Login
        </span>
      </p>
    </div>
  );
};
export default RegisterForm;