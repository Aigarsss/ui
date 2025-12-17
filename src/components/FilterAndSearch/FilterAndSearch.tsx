import React from "react";

import { LayoutGrid, List } from "lucide-react";
import clsx from "clsx";
import Filter from "@/components/Filter";
import SearchSelect from "@/components/SearchSelect";
import Icon from "@/components/Icon";
import { useGetProducts } from "@/hooks/useGetProducts";
import {
	useAppliedLayout,
	useProductsStoreActions,
} from "@/stores/productsStore";

const FilterAndSearch = () => {
	const appliedLayout = useAppliedLayout();
	const { setAppliedLayout } = useProductsStoreActions();

	const { allDevices, filteredDevices } = useGetProducts();

	return (
		<div className="flex flex-col md:flex-row md:justify-between md:items-center md:h-[64px] mt-4 md:mt-0">
			<div className="flex flex-col md:flex-row md:items-center">
				<SearchSelect placeholder="Search" />

				<div className="text-gray-4 text-xs ml-4">
					Showing {filteredDevices.length} of {allDevices.length} devices
				</div>
			</div>

			<div className="flex items-center">
				<Icon onClick={() => setAppliedLayout("list")}>
					<List
						size={20}
						className={clsx({
							"text-blue-6": appliedLayout === "list",
							"text-neutral-8": appliedLayout !== "list",
						})}
					/>
				</Icon>
				<Icon onClick={() => setAppliedLayout("grid")}>
					<LayoutGrid
						size={20}
						className={clsx({
							"text-blue-6": appliedLayout === "grid",
							"text-neutral-8": appliedLayout !== "grid",
						})}
					/>
				</Icon>

				<Filter classNames="ml-2" />
			</div>
		</div>
	);
};

export default FilterAndSearch;
