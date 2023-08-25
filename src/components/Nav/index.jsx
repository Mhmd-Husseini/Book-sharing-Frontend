import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom"; 

const Nav = ({ handleOpenModal, handleOpenCalendarModal }) => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.clear();

    navigate("/"); 
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">Books Hub</div>
        <ul className="navbar-list">
          <li className="navbar-item" onClick={handleOpenModal}>
            Add Book
          </li>
          <li className="navbar-item" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
