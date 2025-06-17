import React from "react";
import classes from "./NavBar.module.scss";
import Logo from "../Logo";
import { Link } from "react-router";

const NavBar = () => {
	return (
		<div className={classes.navbar}>
			<div className="flex items-center">
				<Logo />
				<Link to="/" className="ml-4 text-text-3">
					Devices{" "}
				</Link>
			</div>

			<div className="text-text-3 mr-8">
				Aigars Uplejs |{" "}
				<Link to="/readme" className="underline">
					Readme
				</Link>
			</div>
		</div>
	);
};

export default NavBar;
