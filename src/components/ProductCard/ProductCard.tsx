import type React from "react";
import type { Device } from "@/types/types";
import classes from "./ProductCard.module.scss";
import { Link } from "react-router";
import { getImageUrl } from "@/utils/getImageUrl";

interface ProductCardProps {
	product: Device;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	return (
		<div className={classes.container}>
			<Link to={`/${product.id}`} type="button">
				<div className={classes.imageContainer}>
					<img
						src={getImageUrl(product.id, product.images.default)}
						width={84}
						height={84}
						alt=""
					/>
					<span className={classes.line}>{product.line.name}</span>
				</div>

				<div className={classes.descriptionContainer}>
					<h3 className="text-text-1 text-sm font-light">
						{product.product.name}
					</h3>

					<span className="text-text-3 text-xs font-light">
						{product.shortnames.join(", ")}
					</span>
				</div>
			</Link>
		</div>
	);
};

export default ProductCard;
