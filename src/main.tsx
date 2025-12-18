import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { scan } from "react-scan"; // must be imported before React and React DOM
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ReadmePage from "./pages/ReadmePage";

scan({
	enabled: true,
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<HomePage />} />
						<Route path="/:productId" element={<ProductPage />} />
						<Route path="/readme" element={<ReadmePage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>,
);
