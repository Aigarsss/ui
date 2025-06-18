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
import type { Device } from "@/types/types";
import { z } from "zod";

const ProductContext = createContext<{
	filteredProducts: Device[];
	layoutType: "list" | "grid";
	setLayoutType: React.Dispatch<React.SetStateAction<"list" | "grid">>;
	availableLines: { id: string; name: string }[];
	selectedFilters: string[];
	setSelectedFilters: Dispatch<SetStateAction<string[]>>;
	initialProducts: Device[];
	error: string;
}>({
	filteredProducts: [],
	layoutType: "list",
	setLayoutType: () => undefined,
	availableLines: [],
	selectedFilters: [],
	setSelectedFilters: () => undefined,
	initialProducts: [],
	error: "",
});

const ProductContextProvider = ({ children }: { children: ReactElement }) => {
	const [initialProducts, setInitialProducts] = useState<Device[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<Device[]>([]);
	const [layoutType, setLayoutType] = useState<"list" | "grid">("list");
	const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
	const [error, setError] = useState("");

	const UIDB_URL = "https://static.ui.com/fingerprint/ui/public.json"; // non-working link - https://dummyjson.com/test

	const ApiResponseSchema = z.object({
		devices: z.array(
			z.object({
				id: z.string(),
				images: z.object({
					default: z.string(),
					nopadding: z.string(),
					topology: z.string(),
				}),
				line: z.object({
					id: z.string(),
					name: z.string(),
				}),
				product: z.object({
					abbrev: z.string(),
					name: z.string(),
				}),
				shortnames: z.array(z.string()),
				unifi: z
					.object({
						adoptability: z.string().optional(),
						network: z
							.object({
								ethernetMaxSpeedMegabitsPerSecond: z.number().optional(),
								numberOfPorts: z.number().optional(),
								radios: z.record(
									z.string(),
									z.object({
										gain: z.number().optional(),
										maxPower: z.number().optional(),
										maxSpeedMegabitsPerSecond: z.number().optional(),
									}),
								),
							})
							.optional(),
					})
					.optional(),
			}),
		),
		version: z.string(),
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: We want this to only run once
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await fetch(UIDB_URL);
				const rawData = await res.json();
				const data = ApiResponseSchema.parse(rawData);

				setInitialProducts(data.devices);
			} catch (error) {
				setInitialProducts([]);

				if (error instanceof z.ZodError) {
					console.error("Schema validation failed:", error.errors);
					setError(
						"⚠️ API response format has changed. Please contact UIDB team.",
					);
				} else {
					console.error("Fetch error:", error);
					setError("⚠️ Failed to fetch data. Please try again.");
				}
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
						item.line?.id === obj.line?.id &&
						item.line?.name === obj.line?.name,
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
			error,
		};
	}, [
		filteredProducts,
		layoutType,
		availableLines,
		selectedFilters,
		initialProducts,
		error,
	]);

	return <ProductContext value={value}>{children}</ProductContext>;
};

export const useProductContext = () => use(ProductContext);

export default ProductContextProvider;
