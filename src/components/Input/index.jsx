import React from "react";
import "./style.css";

const Input = ({ onChange, label, placeholder,value, type = "text" }) => {
  return (
    <div className="flex column baseInput">
      <label>{label}</label>
      <input
        className="roundedMedium"
        value={value}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}

export default Input;