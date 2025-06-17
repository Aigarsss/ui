import { useProductContext } from "../../context/ProductContext";

import FilterAndSearch from "../../components/FilterAndSearch";
import ProductList from "../../components/ProductLayout/ProductList";
import ProductGrid from "../../components/ProductLayout/ProductGrid";

const HomePage = () => {
	const { layoutType, filteredProducts } = useProductContext();

	return (
		<div className="mx-8">
			<FilterAndSearch />

			{filteredProducts.length === 0 && (
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
