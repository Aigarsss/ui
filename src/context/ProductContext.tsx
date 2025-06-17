import {
	createContext,
	type ReactElement,
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
}>({
	filteredProducts: [],
	layoutType: "list",
	setLayoutType: () => undefined,
	availableLines: [],
});

const ProductContextProvider = ({ children }: { children: ReactElement }) => {
	const [initialProducts, setInitialProducts] = useState<Device[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<Device[]>([]);
	const [layoutType, setLayoutType] = useState<"list" | "grid">("list");

	useEffect(() => {
		const fetchProducts = async () => {
			// todo, zod?
			const res = await fetch(
				"https://static.ui.com/fingerprint/ui/public.json",
			);
			const data = await res.json();

			if (data.devices) {
				setInitialProducts(data.devices);
				setFilteredProducts(data.devices);
			} else {
				console.error("TODO");
			}
		};
		fetchProducts();
	}, []);

	// console.log({ filteredProducts });

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

	// lines, search and product line
	const updateFilterValues = () => {};

	const value = useMemo(() => {
		return {
			filteredProducts,
			layoutType,
			setLayoutType,
			availableLines,
		};
	}, [filteredProducts, layoutType, availableLines]);

	return <ProductContext value={value}>{children}</ProductContext>;
};

export const useProductContext = () => use(ProductContext);

export default ProductContextProvider;
