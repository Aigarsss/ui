import FilterAndSearch from "@/components/FilterAndSearch";
import { useProductContext } from "@/context/ProductContext";
import ProductList from "@/components/ProductLayout/ProductList";
import ProductGrid from "@/components/ProductLayout/ProductGrid";

const HomePage = () => {
	const { layoutType, filteredProducts, error } = useProductContext();

	return (
		<div className="mx-8">
			<FilterAndSearch />

			{error && <div>{error}</div>}

			{filteredProducts.length === 0 && !error && (
				<div className="animate-pulse">Loading...</div>
			)}

			{filteredProducts.length > 0 && layoutType === "list" ? (
				<ProductList />
			) : (
				<ProductGrid />
			)}
		</div>
	);
};

export default HomePage;
