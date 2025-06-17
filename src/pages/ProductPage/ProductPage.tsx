import { Link, useParams } from "react-router";
import type * as React from "react";
import { useProductContext } from "../../context/ProductContext";
import { type ReactNode, useState } from "react";
import classes from "./ProductPage.module.scss";
import clsx from "clsx";

interface HoveringButtonProps {
	to: string;
	children: ReactNode;
	classNames?: string;
}

const HoveringButton: React.FC<HoveringButtonProps> = ({
	to,
	children,
	classNames,
}) => {
	return (
		<Link to={to} className={clsx(classes.hoveringButton, classNames)}>
			{children}
		</Link>
	);
};

const ProductPage: React.FC = () => {
	const [isShowingJson, setIsShowingJson] = useState(false);
	const { filteredProducts } = useProductContext();
	const { productId } = useParams();

	const productOfInterest = filteredProducts.find(
		(product) => product.id === productId,
	);

	const getNavigateItemId = (type: "prev" | "next"): string | undefined => {
		const totalProducts = filteredProducts.length;
		const index = filteredProducts.findIndex((obj) => obj.id === productId);

		// Probably not going to happen, but still
		if (index === -1) {
			return productId;
		}

		// if this is the first item
		if (index === 0 && type === "prev") {
			return filteredProducts.at(-1)?.id;
		}

		// if this is the first item
		if (index === totalProducts - 1 && type === "next") {
			return filteredProducts[0].id;
		}

		if (type === "prev") {
			return filteredProducts[index - 1].id;
		}

		return filteredProducts[index + 1].id;
	};

	return (
		<div>
			<div className="flex justify-between items-center h-[64px] mx-8">
				<HoveringButton to="/">
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Back</title>
						<path
							d="M12.5 16C12.367 16 12.235 15.947 12.136 15.843L7.287 10.701C7.102 10.513 7 10.264 7 9.99998C7 9.73598 7.102 9.48698 7.287 9.29898L12.136 4.15697C12.325 3.95597 12.642 3.94697 12.843 4.13597C13.044 4.32597 13.053 4.64197 12.864 4.84297L8 9.99998L8.01 10.01L12.864 15.156C13.053 15.357 13.044 15.673 12.843 15.863C12.746 15.955 12.623 16 12.5 16Z"
							fill="#838691"
						/>
					</svg>
					Back
				</HoveringButton>

				<div className="flex">
					<HoveringButton
						to={`/${getNavigateItemId("prev")}`}
						classNames="mr-1"
					>
						<svg
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Previous</title>
							<path
								d="M12.5 16C12.367 16 12.235 15.947 12.136 15.843L7.287 10.701C7.102 10.513 7 10.264 7 9.99998C7 9.73598 7.102 9.48698 7.287 9.29898L12.136 4.15697C12.325 3.95597 12.642 3.94697 12.843 4.13597C13.044 4.32597 13.053 4.64197 12.864 4.84297L8 9.99998L8.01 10.01L12.864 15.156C13.053 15.357 13.044 15.673 12.843 15.863C12.746 15.955 12.623 16 12.5 16Z"
								fill="#838691"
							/>
						</svg>
					</HoveringButton>
					<HoveringButton to={`/${getNavigateItemId("next")}`}>
						<svg
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Next</title>
							<path
								d="M7.49998 16C7.63298 16 7.76499 15.947 7.86399 15.843L12.713 10.701C12.898 10.513 13 10.264 13 9.99998C13 9.73598 12.898 9.48698 12.713 9.29898L7.86399 4.15697C7.67498 3.95597 7.35798 3.94697 7.15698 4.13597C6.95598 4.32597 6.94698 4.64197 7.13598 4.84297L12 9.99998L11.99 10.01L7.13598 15.156C6.94698 15.357 6.95598 15.673 7.15698 15.863C7.25398 15.955 7.37698 16 7.49998 16Z"
								fill="#838691"
							/>
						</svg>
					</HoveringButton>
				</div>
			</div>

			<div className={classes.container}>
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

				{isShowingJson && (
					<pre>{JSON.stringify(productOfInterest, undefined, 2)}</pre>
				)}
			</div>
		</div>
	);
};

export default ProductPage;
