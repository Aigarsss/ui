import { Link, redirect, useParams } from "react-router";
import type * as React from "react";
import { type ReactNode, useState } from "react";
import classes from "./ProductPage.module.scss";
import clsx from "clsx";
import { getImageUrl } from "@/utils/getImageUrl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetProducts } from "@/hooks/useGetProducts";
import { useAppliedFilters } from "@/stores/productsStore";

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

interface ProductTextLineProps {
	text1: string | undefined;
	text2: string | number | undefined;
}

const ProductTextLine: React.FC<ProductTextLineProps> = ({ text1, text2 }) => {
	return (
		<div className="flex justify-between py-2">
			<span className="text-text-1 text-sm">{text1}</span>
			<span className="text-text-3 text-sm max-w-[100px] text-end">
				{text2}
			</span>
		</div>
	);
};

const ProductPage = () => {
	const [isShowingJson, setIsShowingJson] = useState(false);
	const { productId } = useParams();
	const { filteredDevices } = useGetProducts();
	const appliedFilters = useAppliedFilters();

	const productOfInterest = filteredDevices.find(
		(product) => product.id === productId,
	);

	const getNavigateItemId = (type: "prev" | "next"): string | undefined => {
		const totalProducts = filteredDevices.length;
		const index = filteredDevices.findIndex((obj) => obj.id === productId);

		// Probably not going to happen, but still
		if (index === -1) {
			return productId;
		}

		// if this is the first item
		if (index === 0 && type === "prev") {
			return filteredDevices.at(-1)?.id;
		}

		// if this is the first item
		if (index === totalProducts - 1 && type === "next") {
			return filteredDevices[0].id;
		}

		if (type === "prev") {
			return filteredDevices[index - 1].id;
		}

		return filteredDevices[index + 1].id;
	};

	if (!productOfInterest) {
		redirect("/");
		return;
	}

	return (
		<div>
			<div className="flex justify-between items-center h-[64px] mx-8">
				<HoveringButton to="/">
					<ChevronLeft size={20} className="text-neutral-8" />
					Back
				</HoveringButton>

				<div className="flex items-center">
					{appliedFilters.length > 0 && (
						<span className="text-blue-7 text-sm mr-2">Filter applied*</span>
					)}

					<HoveringButton
						to={`/${getNavigateItemId("prev")}`}
						classNames="mr-1"
					>
						<ChevronLeft size={20} className="text-neutral-8" />
					</HoveringButton>
					<HoveringButton to={`/${getNavigateItemId("next")}`}>
						<ChevronRight size={20} className="text-neutral-8" />
					</HoveringButton>
				</div>
			</div>

			{/* Added key for react motion */}
			<div key={productOfInterest.id} className={classes.container}>
				<div className="flex flex-col md:flex-row mx-4 md:mx-0">
					<div className={classes.imageContainer}>
						<img
							src={getImageUrl(
								productOfInterest.id,
								productOfInterest?.images.default,
							)}
							alt=""
						/>
					</div>

					<div className={classes.descriptionContainer}>
						<div className="text-2xl font-semibold mb-1">
							{productOfInterest?.product.name}
						</div>
						<div className="text-text-3 mb-4">
							{productOfInterest?.line.name}
						</div>

						{[
							{
								text1: "Product line",
								text2: productOfInterest?.line.name,
							},
							{
								text1: "ID",
								text2: productOfInterest?.line.id,
							},
							{
								text1: "Short name",
								text2: productOfInterest?.shortnames.join(", "),
							},
						].map((item) => {
							return (
								<ProductTextLine
									key={item.text1}
									text1={item.text1}
									text2={item.text2}
								/>
							);
						})}

						{productOfInterest?.unifi?.network?.radios &&
							Object.keys(productOfInterest?.unifi.network.radios).length !==
								0 && (
								<>
									<ProductTextLine
										text1="Max power"
										text2={`${Math.max(...Object.values(productOfInterest?.unifi.network.radios).map((radio) => radio.maxPower ?? 0))} W`}
									/>
									<ProductTextLine
										text1="Speed"
										text2={`${Math.max(...Object.values(productOfInterest?.unifi.network.radios).map((radio) => radio.maxSpeedMegabitsPerSecond ?? 0))} Mbps`}
									/>
								</>
							)}

						{productOfInterest?.unifi?.network?.numberOfPorts && (
							<ProductTextLine
								text1="Number of ports"
								text2={productOfInterest?.unifi.network.numberOfPorts}
							/>
						)}

						<div className="mt-4">
							<button
								type="button"
								onClick={() => setIsShowingJson(!isShowingJson)}
								className="py-2 text-sm text-blue-6 hover:text-blue-7 cursor-pointer"
							>
								{isShowingJson
									? "Hide JSON details"
									: "See all details as JSON"}
							</button>
						</div>
					</div>
				</div>

				{isShowingJson && (
					<pre className="bg-neutral-3 text-sm mt-8 p-4">
						{JSON.stringify(productOfInterest, undefined, 2)}
					</pre>
				)}
			</div>
		</div>
	);
};

export default ProductPage;
