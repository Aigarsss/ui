import { Link, useParams } from "react-router";
import type * as React from "react";
import { useProductContext } from "../../context/ProductContext";

const ProductPage: React.FC = () => {
	const { filteredProducts } = useProductContext();
	const { productId } = useParams();

	const productOfInterest = filteredProducts.find(
		(product) => product.id === productId,
	);

	return (
		<div>
			<Link to="/">Back</Link>

			<div className="flex">
				{/*<img src={`https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2F${productOfInterest.id}%2Fdefault%2${productOfInterest.images.default}.png&w=${36}&q=75`} alt=""/>*/}
				{/*<img src="https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2Fed67d43e-2d5c-4928-ace8-edf984baeff1%2Fdefault%2 F977c1f8c477549aeb7238727fd4ecc62.png&w=36&q=75" alt=""/>*/}
				<div className="w-1/2">
					<img
						src="https://images.unsplash.com/photo-1749810364373-5e2f18bb842a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt=""
					/>
				</div>

				<div>
					<div>{productOfInterest?.product.name}</div>
					<div>{productOfInterest?.line.name}</div>

					<div className="flex justify-between">
						<span>Product line</span>
						<span>{productOfInterest?.line.name}</span>
					</div>
					<div className="flex justify-between">
						<span>ID</span>
						<span>{productOfInterest?.line.id}</span>
					</div>
					<div className="flex justify-between">
						<span>Short name</span>
						<span>{productOfInterest?.shortnames.join(", ")}</span>
					</div>
					<div className="flex justify-between">
						<span>Max power</span>
						<span>xxx</span>
					</div>
					<div className="flex justify-between">
						<span>Speed</span>
						<span>xxx</span>
					</div>
					<div className="flex justify-between">
						<span>Number of ports</span>
						<span>xxx</span>
					</div>
				</div>
			</div>

			<div>see all details as json</div>
			<pre>{JSON.stringify(productOfInterest, 1, 2)}</pre>
		</div>
	);
};

export default ProductPage;
