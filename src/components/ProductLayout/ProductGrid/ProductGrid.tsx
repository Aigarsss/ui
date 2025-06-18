import React from "react";
import { useProductContext } from "@/context/ProductContext";
import classes from "./ProductGrid.module.scss";
import ProductCard from "@/components/ProductCard";
import { motion } from "motion/react";
import { motionTransition, motionVariantFadeIn } from "@/utils/animation";

const ProductGrid = () => {
	const { filteredProducts } = useProductContext();

	return (
		<motion.div
			variants={motionVariantFadeIn}
			initial="hidden"
			animate="show"
			transition={motionTransition}
			className={classes.gridContainer}
		>
			{filteredProducts.map((product) => {
				return <ProductCard key={product.id} product={product} />;
			})}
		</motion.div>
	);
};

export default ProductGrid;
