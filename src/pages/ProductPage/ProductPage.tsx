import { redirect, useParams } from "react-router";
import type * as React from "react";
import { useState } from "react";
import classes from "./ProductPage.module.scss";
import { getImageUrl } from "@/utils/getImageUrl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetProducts } from "@/hooks/useGetProducts";
import { useAppliedFilters } from "@/stores/productsStore";
import ProductTextLine from "@/components/ProductTextLine";
import HoveringButton from "@/components/HoveringButton";
import { getNavigateToItemId } from "@/utils/getNavigateToItemId";

const ProductPage = () => {
	const [isShowingJson, setIsShowingJson] = useState(false);
	const { productId } = useParams();
	const { filteredDevices } = useGetProducts();
	const appliedFilters = useAppliedFilters();

	const selectedDevice = filteredDevices.find(
		(product) => product.id === productId,
	);

	if (!selectedDevice) {
		redirect("/");
		return;
	}

	return (
		<>
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
						to={`/${getNavigateToItemId({ type: "prev", filteredDevices, currentProductId: selectedDevice.id })}`}
						classNames="mr-1"
					>
						<ChevronLeft size={20} className="text-neutral-8" />
					</HoveringButton>
					<HoveringButton
						to={`/${getNavigateToItemId({ type: "next", filteredDevices, currentProductId: selectedDevice.id })}`}
					>
						<ChevronRight size={20} className="text-neutral-8" />
					</HoveringButton>
				</div>
			</div>

			{/* Added key for react motion */}
			<div key={selectedDevice.id} className={classes.container}>
				<div className="flex flex-col md:flex-row mx-4 md:mx-0">
					<div className={classes.imageContainer}>
						<img
							src={getImageUrl(
								selectedDevice.id,
								selectedDevice?.images.default,
							)}
							alt=""
						/>
					</div>

					<div className={classes.descriptionContainer}>
						<div className="text-2xl font-semibold mb-1">
							{selectedDevice?.product.name}
						</div>
						<div className="text-text-3 mb-4">{selectedDevice?.line.name}</div>

						{[
							{
								text1: "Product line",
								text2: selectedDevice?.line.name,
							},
							{
								text1: "ID",
								text2: selectedDevice?.line.id,
							},
							{
								text1: "Short name",
								text2: selectedDevice?.shortnames.join(", "),
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

						{selectedDevice?.unifi?.network?.radios &&
							Object.keys(selectedDevice?.unifi.network.radios).length !==
								0 && (
								<>
									<ProductTextLine
										text1="Max power"
										text2={`${Math.max(...Object.values(selectedDevice?.unifi.network.radios).map((radio) => radio.maxPower ?? 0))} W`}
									/>
									<ProductTextLine
										text1="Speed"
										text2={`${Math.max(...Object.values(selectedDevice?.unifi.network.radios).map((radio) => radio.maxSpeedMegabitsPerSecond ?? 0))} Mbps`}
									/>
								</>
							)}

						{selectedDevice?.unifi?.network?.numberOfPorts && (
							<ProductTextLine
								text1="Number of ports"
								text2={selectedDevice?.unifi.network.numberOfPorts}
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
						{JSON.stringify(selectedDevice, undefined, 2)}
					</pre>
				)}
			</div>
		</>
	);
};

export default ProductPage;
