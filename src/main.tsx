import { scan } from "react-scan"; // must be imported before React and React DOM
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Layout from "./Layout";
import ProductContextProvider from "./context/ProductContext";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ReadmePage from "./pages/ReadmePage";

scan({
	enabled: true,
});

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<ProductContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<HomePage />} />
						<Route path="/:productId" element={<ProductPage />} />
						<Route path="/readme" element={<ReadmePage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ProductContextProvider>
	</StrictMode>,
);
