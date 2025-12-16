import { Outlet } from "react-router";
import NavBar from "./components/NavBar";
import ErrorBoundary from "@/components/ErrorBoundary";
import { InfoIcon } from "lucide-react";
import { useGetProducts } from "@/hooks/useGetProducts";

function Layout() {
	const { queryError } = useGetProducts();

	return (
		<>
			<NavBar />

			{queryError && (
				<div
					className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 m-4"
					role="alert"
				>
					<InfoIcon />
					<div className="ml-2">{queryError.message}</div>
				</div>
			)}

			<ErrorBoundary>
				<Outlet />
			</ErrorBoundary>
		</>
	);
}

export default Layout;
