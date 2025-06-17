import {
	type Dispatch,
	type ReactElement,
	type SetStateAction,
	createContext,
	use,
	useEffect,
	useMemo,
	useState,
} from "react";
import type { Device } from "../types/types";

const ProductContext = createContext<{
	filteredProducts: Device[];
	layoutType: "list" | "grid";
	setLayoutType: React.Dispatch<React.SetStateAction<"list" | "grid">>;
	availableLines: { id: string; name: string }[];
	selectedFilters: string[];
	setSelectedFilters: Dispatch<SetStateAction<string[]>>;
	initialProducts: Device[];
}>({
	filteredProducts: [],
	layoutType: "list",
	setLayoutType: () => undefined,
	availableLines: [],
	selectedFilters: [],
	setSelectedFilters: () => undefined,
	initialProducts: [],
});

const ProductContextProvider = ({ children }: { children: ReactElement }) => {
	const [initialProducts, setInitialProducts] = useState<Device[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<Device[]>([]);
	const [layoutType, setLayoutType] = useState<"list" | "grid">("list");
	const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

	useEffect(() => {
		const fetchProducts = async () => {
			// todo, zod?
			const res = await fetch(
				"https://static.ui.com/fingerprint/ui/public.json",
			);
			const data = await res.json();

			if (data.devices) {
				setInitialProducts(data.devices);
			} else {
				console.error("TODO");
			}
		};
		fetchProducts();
	}, []);

	// Apply line filters
	useEffect(() => {
		if (selectedFilters.length === 0) {
			setFilteredProducts(initialProducts);
		} else {
			const filteredItems = initialProducts.filter((item) => {
				return selectedFilters.includes(item.line.id);
			});

			setFilteredProducts(filteredItems);
		}
	}, [selectedFilters, initialProducts]);

	const availableLines = initialProducts
		// Finds the first match (self is the original array). If not the first match, filter out
		.filter(
			(obj, index, self) =>
				index ===
				self.findIndex(
					(item) =>
						item.line.id === obj.line.id && item.line.name === obj.line.name,
				),
		)
		.map((item) => item.line)
		.sort((a, b) => (a.id > b.id ? 1 : -1));

	const value = useMemo(() => {
		return {
			filteredProducts,
			layoutType,
			setLayoutType,
			availableLines,
			selectedFilters,
			setSelectedFilters,
			initialProducts,
		};
	}, [
		filteredProducts,
		layoutType,
		availableLines,
		selectedFilters,
		initialProducts,
	]);

	return <ProductContext value={value}>{children}</ProductContext>;
};

export const useProductContext = () => use(ProductContext);

export default ProductContextProvider;
