import React from "react";
import classes from "./NavBar.module.scss";
import Logo from "../Logo";

const NavBar = () => {
	return (
		<div className={classes.navbar}>
			<div className="flex items-center">
				<Logo />
				<div className="ml-4 text-text-3">Devices</div>
			</div>

			<div className="text-text-3 mr-8">Author</div>
		</div>
	);
};

export default NavBar;
