import React, { useRef, useState } from "react";
import classes from "./Filter.module.scss";
import { useClickAway } from "react-use";

import clsx from "clsx";
import CheckBox from "@/components/CheckBox";
import {
	useAppliedFilters,
	useProductsStoreActions,
} from "@/stores/productsStore";
import { useGetProducts } from "@/hooks/useGetProducts";

const Filter = ({ classNames }: { classNames?: string }) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	const { allDevices } = useGetProducts();
	const appliedFilters = useAppliedFilters();
	const { setAppliedFilters } = useProductsStoreActions();

	const availableFilters = allDevices
		.filter(
			(obj, index, self) =>
				index ===
				self.findIndex(
					(item) =>
						item.line?.id === obj.line?.id &&
						item.line?.name === obj.line?.name,
				),
		)
		.map((item) => item.line)
		.sort((a, b) => (a.id > b.id ? 1 : -1));

	useClickAway(ref, () => {
		setIsFilterOpen(false);
	});

	return (
		<div className={clsx(classes.container, classNames)}>
			<button
				className={clsx(classes.trigger, {
					[classes.active]: isFilterOpen,
				})}
				type="button"
				onClick={() => setIsFilterOpen(true)}
			>
				Filter
				{appliedFilters.length > 0 && (
					<span className="bg-neutral-3 text-xs rounded-full py-1 px-2">
						{appliedFilters.length}
					</span>
				)}
			</button>
			{isFilterOpen && (
				<div ref={ref} className={classes.dropdown}>
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
										if (val) {
											setAppliedFilters([...appliedFilters, line.id]);
										} else {
											setAppliedFilters(
												appliedFilters.filter((item) => item !== line.id),
											);
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
