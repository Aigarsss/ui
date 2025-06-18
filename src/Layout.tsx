import { Outlet } from "react-router";
import NavBar from "./components/NavBar";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useProductContext } from "@/context/ProductContext";
import { Info } from "lucide-react";

function Layout() {
	const { error } = useProductContext();

	return (
		<>
			<NavBar />

			{error && (
				<div
					className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 m-4"
					role="alert"
				>
					<Info />
					<div className="ml-2">{error}</div>
				</div>
			)}

			<ErrorBoundary>
				<Outlet />
			</ErrorBoundary>
		</>
	);
}

export default Layout;
