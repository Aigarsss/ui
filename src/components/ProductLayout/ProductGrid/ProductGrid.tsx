import React from "react";
import classes from "./ProductGrid.module.scss";
import ProductCard from "@/components/ProductCard";
import type { Device } from "@/types/types";

const ProductGrid = ({ filteredDevices }: { filteredDevices: Device[] }) => {
	return (
		<div className={classes.gridContainer}>
			{filteredDevices.map((device) => {
				return <ProductCard key={device.id} product={device} />;
			})}
		</div>
	);
};

export default ProductGrid;
