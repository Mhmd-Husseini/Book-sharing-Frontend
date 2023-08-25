import React from "react";
import "./style.css";
const Nav = ({handleOpenModal, handleOpenCalendarModal}) => {
    return (
        <>
        <nav className="navbar">
            <div className="navbar-brand">Book Share</div>
            <ul className="navbar-list">
                <li className="navbar-item" onClick={handleOpenModal}>Add Book</li>
                <li className="navbar-item">Logout</li>
            </ul>
        </nav>
        </>
    );
};
export default Nav;