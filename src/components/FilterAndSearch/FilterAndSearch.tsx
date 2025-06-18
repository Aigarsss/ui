import React from "react";
import { useProductContext } from "@/context/ProductContext";

import { LayoutGrid, List } from "lucide-react";
import clsx from "clsx";
import Filter from "@/components/Filter";
import SearchSelect from "@/components/SearchSelect";
import Icon from "@/components/Icon";

const FilterAndSearch = () => {
	const { filteredProducts, initialProducts, setLayoutType, layoutType } =
		useProductContext();

	return (
		<div className="flex flex-col md:flex-row md:justify-between md:items-center md:h-[64px] mt-4 md:mt-0">
			<div className="flex flex-col md:flex-row md:items-center">
				<SearchSelect placeholder="Search" />

				<div className="text-gray-4 text-xs ml-4">
					Showing {filteredProducts.length} of {initialProducts.length} devices
				</div>
			</div>

			<div className="flex">
				<Icon onClick={() => setLayoutType("list")}>
					<List
						size={20}
						className={clsx({
							"text-blue-6": layoutType === "list",
							"text-neutral-10": layoutType !== "list",
						})}
					/>
				</Icon>
				<Icon onClick={() => setLayoutType("grid")}>
					<LayoutGrid
						size={20}
						className={clsx({
							"text-blue-6": layoutType === "grid",
							"text-neutral-10": layoutType !== "grid",
						})}
					/>
				</Icon>

				<Filter />
			</div>
		</div>
	);
};

export default FilterAndSearch;
