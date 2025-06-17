import { useProductContext } from "../../context/ProductContext";

import FilterAndSearch from "../../components/FilterAndSearch";
import ProductList from "../../components/ProductLayout/ProductList";
import ProductGrid from "../../components/ProductLayout/ProductGrid";

const HomePage = () => {
	const { layoutType } = useProductContext();

	return (
		<div className="mx-8">
			<FilterAndSearch />

			{layoutType === "list" ? <ProductList /> : <ProductGrid />}
		</div>
	);
};

export default HomePage;
