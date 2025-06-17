import { Outlet } from "react-router";
import NavBar from "./components/NavBar";

function Layout() {
	return (
		<>
			<NavBar />

			<Outlet />
		</>
	);
}

export default Layout;
