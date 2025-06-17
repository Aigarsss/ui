import React from "react";
import { Link, useNavigate } from "react-router";
import { useProductContext } from "../../../context/ProductContext";
import classes from "./ProductList.module.scss";

const ProductList = () => {
	const { filteredProducts } = useProductContext();
	const navigate = useNavigate();

	return (
		<table className={classes.table}>
			<thead>
				<tr>
					<th />
					<th>Product line</th>
					<th>Name</th>
				</tr>
			</thead>

			<tbody>
				{filteredProducts?.map((device) => {
					return (
						<tr
							key={device.id}
							tabIndex={0}
							onClick={() => navigate(`/${device.id}`)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									navigate(`/${device.id}`);
								}
							}}
						>
							<td>
								<img
									src={`https://static.ui.com/fingerprint/ui/icons/${device.icon.id}_32x32.png`}
									// src={`https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2Fed67d43e-2d5c-4928-ace8-edf984baeff1%2Fdefault%2  F977c1f8c477549aeb7238727fd4ecc62.png&w=36&q=75`}
									// src="https://static.ui.com/fingerprint/ui/icons/1a431afe-91c6-400f-bd34-c2eeffec263d_32x32.png"
									alt=""
								/>
							</td>
							<td>{device.line.name}</td>
							<td>{device.product.name}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default ProductList;
