import React from "react";
import { useProductContext } from "../../context/ProductContext";
import Icon from "../Icon";
import Filter from "../Filter";
import SearchSelect from "../SearchSelect";
import { LayoutGrid, List } from "lucide-react";
import clsx from "clsx";

const FilterAndSearch = () => {
	const { filteredProducts, initialProducts, setLayoutType, layoutType } =
		useProductContext();

	return (
		<div className="flex justify-between items-center h-[64px]">
			<div className="flex items-center">
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
