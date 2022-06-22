import React from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
	return (
		<>
			<div className="Nav">
				<h3 className="Title">Bug Tracker</h3>
				<p className="logout">Logout</p>
			</div>
			<div className="sidebar">
				<NavLink className="NavLink active" to="/">
					Dashboard
				</NavLink>
				<NavLink className="NavLink" to="/ManageRole">
					Manage Role Assignment
				</NavLink>
				<NavLink className="NavLink" to="/MyProject">
					My Project
				</NavLink>
				<NavLink className="NavLink" to="/MyTicket">
					My Ticket
				</NavLink>
				<NavLink className="NavLink" to="/UserProfile">
					User Profile
				</NavLink>
			</div>
		</>
	);
};

export default Menu;
