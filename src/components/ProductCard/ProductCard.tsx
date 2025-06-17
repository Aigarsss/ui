import type React from "react";
import type { Device } from "../../types/types";
import classes from "./ProductCard.module.scss";
import { Link } from "react-router";

interface ProductCardProps {
	product: Device;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	return (
		<Link to={`/${product.id}`} className={classes.container} type="button">
			<div className={classes.imageContainer}>
				<img
					src={`https://static.ui.com/fingerprint/ui/icons/${product.icon.id}_64x64.png`}
					alt=""
				/>
				<span className={classes.line}>{product.line.name}</span>
			</div>

			<div className={classes.descriptionContainer}>
				<h3>{product.product.name}</h3>

				<span>{product.shortnames.join(", ")}</span>
			</div>
		</Link>
	);
};

export default ProductCard;
