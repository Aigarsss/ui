import React from "react";
import { useNavigate } from "react-router";
import { useProductContext } from "@/context/ProductContext";
import classes from "./ProductList.module.scss";
import { getImageUrl } from "@/utils/getImageUrl";
import { motion } from "motion/react";
import { motionTransition, motionVariantFadeIn } from "@/utils/animation";

const ProductList = () => {
	const { filteredProducts } = useProductContext();
	const navigate = useNavigate();

	return (
		<motion.table
			className={classes.table}
			variants={motionVariantFadeIn}
			initial="hidden"
			animate="show"
			transition={motionTransition}
		>
			<thead>
				<tr>
					<th />
					<th className="text-sm text-text-1 font-medium">Product line</th>
					<th className="text-sm text-text-1 font-medium">Name</th>
				</tr>
			</thead>

			<tbody>
				{filteredProducts?.map((product) => {
					return (
						<tr
							key={product.id}
							tabIndex={0}
							onClick={() => navigate(`/${product.id}`)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									navigate(`/${product.id}`);
								}
							}}
						>
							<td>
								<div className="flex justify-center items-center">
									<img
										src={getImageUrl(product.id, product.images.default)}
										width={20}
										height={20}
										alt=""
									/>
								</div>
							</td>
							<td className="text-sm text-text-2">{product.line.name}</td>
							<td className="text-sm text-text-3">{product.product.name}</td>
						</tr>
					);
				})}
			</tbody>
		</motion.table>
	);
};

export default ProductList;
