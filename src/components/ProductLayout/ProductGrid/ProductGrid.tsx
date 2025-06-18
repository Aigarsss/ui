import React from "react";
import { useProductContext } from "@/context/ProductContext";
import classes from "./ProductGrid.module.scss";
import ProductCard from "@/components/ProductCard";

const ProductGrid = () => {
	const { filteredProducts } = useProductContext();

	return (
		<div className={classes.gridContainer}>
			{filteredProducts.map((product) => {
				return <ProductCard key={product.id} product={product} />;
			})}
		</div>
	);
};

export default ProductGrid;
