import FilterAndSearch from "@/components/FilterAndSearch";
import ProductGrid from "@/components/ProductLayout/ProductGrid";
import ProductList from "@/components/ProductLayout/ProductList";
import { useGetProducts } from "@/hooks/useGetProducts";
import { useAppliedLayout } from "@/stores/productsStore";
import { LoaderIcon } from "lucide-react";

const HomePage = () => {
	const appliedLayout = useAppliedLayout();
	const { filteredDevices, isPending } = useGetProducts();

	return (
		<div className="mx-2 md:mx-8">
			<FilterAndSearch />

			{isPending && (
				<div className="animate-pulse w-full flex justify-center mt-20">
					<LoaderIcon className="animate-spin mr-2" />
					Loading...
				</div>
			)}

			{filteredDevices.length > 0 && appliedLayout === "list" ? (
				<ProductList filteredDevices={filteredDevices} />
			) : (
				<ProductGrid filteredDevices={filteredDevices} />
			)}
		</div>
	);
};

export default HomePage;
