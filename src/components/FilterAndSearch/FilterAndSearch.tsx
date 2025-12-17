import Filter from "@/components/Filter";
import LayoutSwitcher from "@/components/LayoutSwitcher";
import SearchSelect from "@/components/SearchSelect";
import { useGetProducts } from "@/hooks/useGetProducts";

const FilterAndSearch = () => {

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
				<LayoutSwitcher />

				<Filter classNames="ml-2" />
			</div>
		</div>
	);
};

export default FilterAndSearch;
