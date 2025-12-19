import clsx from "clsx";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import CheckBox from "@/components/CheckBox";
import { useGetProducts } from "@/hooks/useGetProducts";
import {
	useAppliedFilters,
	useProductsStoreActions,
} from "@/stores/productsStore";
import classes from "./Filter.module.scss";

const Filter = ({ classNames }: { classNames?: string }) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	const { allDevices } = useGetProducts();
	const appliedFilters = useAppliedFilters();
	const { setAppliedFilters } = useProductsStoreActions();

	const lineMap = new Map();

	allDevices.forEach((item) => {
		const line = item.line;

		if (line?.id && !lineMap.has(line.id)) {
			lineMap.set(line.id, line);
		}
	});

	const availableFilters = Array.from(lineMap.values()).sort((a, b) =>
		a.id.localeCompare(b.id),
	);

	useClickAway(ref, () => {
		setIsFilterOpen(false);
	});

	return (
		<div ref={ref} className={clsx(classes.container, classNames)}>
			<button
				className={clsx(classes.trigger, {
					[classes.active]: isFilterOpen,
				})}
				type="button"
				onClick={() => setIsFilterOpen(!isFilterOpen)}
			>
				Filter
				{appliedFilters.length > 0 && (
					<span className="bg-neutral-3 text-xs rounded-full py-1 px-2">
						{appliedFilters.length}
					</span>
				)}
			</button>
			{isFilterOpen && (
				<div className={classes.dropdown}>
					<div className="text-text-1 font-bold text-sm">Product line</div>

					<div className="grid gap-2 my-4">
						{availableFilters.map((line) => {
							return (
								<CheckBox
									key={line.id}
									id={line.id}
									checked={appliedFilters.includes(line.id)}
									label={line.name}
									customOnChange={(val) => {
										const appliedFiltersSet = new Set(appliedFilters);

										if (val) {
											setAppliedFilters([...appliedFiltersSet.add(line.id)]);
										} else {
											appliedFiltersSet.delete(line.id);
											setAppliedFilters([...appliedFiltersSet]);
										}
									}}
								/>
							);
						})}
					</div>

					<button
						className={clsx("flex ", {
							"text-red-6 cursor-pointer": appliedFilters.length > 0,
							"text-red-3 cursor-not-allowed": appliedFilters.length === 0,
						})}
						type="reset"
						disabled={appliedFilters.length === 0}
						onClick={() => {
							setAppliedFilters([]);
							setIsFilterOpen(false);
						}}
					>
						Reset
					</button>
				</div>
			)}
		</div>
	);
};

export default Filter;
