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
}>({
	filteredProducts: [],
	layoutType: "list",
	setLayoutType: () => undefined,
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
				setFilteredProducts(data.devices);
			} else {
				console.error("TODO");
			}
		};
		fetchProducts();
	}, []);

	// console.log({ filteredProducts });

	const value = useMemo(() => {
		return {
			filteredProducts,
			layoutType,
			setLayoutType,
		};
	}, [filteredProducts, layoutType]);

	return <ProductContext value={value}>{children}</ProductContext>;
};

export const useProductContext = () => use(ProductContext);

export default ProductContextProvider;
