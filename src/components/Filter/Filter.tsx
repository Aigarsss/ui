import React, { useRef, useState } from "react";
import classes from "./Filter.module.scss";
import { useClickAway } from "react-use";
import { useProductContext } from "@/context/ProductContext";

import clsx from "clsx";
import CheckBox from "@/components/CheckBox";

const Filter = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const { availableLines, selectedFilters, setSelectedFilters } =
		useProductContext();

	useClickAway(ref, () => {
		setIsFilterOpen(false);
	});

	return (
		<div className={classes.container}>
			<button
				className={clsx(classes.trigger, {
					[classes.active]: isFilterOpen,
				})}
				type="button"
				onClick={() => setIsFilterOpen(true)}
			>
				Filter{" "}
				{selectedFilters.length > 0 && (
					<span className="bg-neutral-3 text-xs rounded-full py-1 px-2">
						{selectedFilters.length}
					</span>
				)}
			</button>
			{isFilterOpen && (
				<div ref={ref} className={classes.dropdown}>
					<div className="text-text-1 font-bold text-sm">Product line</div>

					<div className="grid gap-2 my-4">
						{availableLines.map((line) => {
							return (
								<CheckBox
									key={line.id}
									id={line.id}
									checked={selectedFilters.includes(line.id)}
									label={line.name}
									customOnChange={(val) => {
										if (val) {
											setSelectedFilters((prevState) => {
												return [...prevState, line.id];
											});
										} else {
											setSelectedFilters(
												selectedFilters.filter((item) => item !== line.id),
											);
										}
									}}
								/>
							);
						})}
					</div>

					<button
						className={clsx("flex ", {
							"text-red-6 cursor-pointer": selectedFilters.length > 0,
							"text-red-3 cursor-not-allowed": selectedFilters.length === 0,
						})}
						type="reset"
						disabled={selectedFilters.length === 0}
						onClick={() => {
							setSelectedFilters([]);
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
