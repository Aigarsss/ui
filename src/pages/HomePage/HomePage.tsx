import FilterAndSearch from "@/components/FilterAndSearch";
import ProductList from "@/components/ProductLayout/ProductList";
import ProductGrid from "@/components/ProductLayout/ProductGrid";
import { useGetProducts } from "@/hooks/useGetProducts";
import { useAppliedLayout } from "@/stores/productsStore";

const HomePage = () => {
	const appliedLayout = useAppliedLayout();
	const { filteredDevices, isPending } = useGetProducts();

	return (
		<div className="mx-8">
			<FilterAndSearch />

			{isPending && <div className="animate-pulse">Loading...</div>}

			{filteredDevices.length > 0 && appliedLayout === "list" ? (
				<ProductList filteredDevices={filteredDevices} />
			) : (
				<ProductGrid filteredDevices={filteredDevices} />
			)}
		</div>
	);
};

export default HomePage;
