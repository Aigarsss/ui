import ProductCard from "@/components/ProductCard";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import type { Device } from "@/types/types";
import classes from "./ProductGrid.module.scss";

const ProductGrid = ({ filteredDevices }: { filteredDevices: Device[] }) => {
	const { visibleItemsCount } = useInfiniteScroll({ filteredDevices });

	return (
		<div className={classes.gridContainer}>
			{filteredDevices?.slice(0, visibleItemsCount).map((device) => {
				return <ProductCard key={device.id} product={device} />;
			})}
		</div>
	);
};

export default ProductGrid;
