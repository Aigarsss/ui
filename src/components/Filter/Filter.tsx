import React, { useRef, useState } from "react";
import classes from "./Filter.module.scss";
import { useClickAway } from "react-use";
import { useProductContext } from "../../context/ProductContext";

const Filter = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const { availableLines } = useProductContext();

	useClickAway(ref, () => {
		setIsFilterOpen(false);
	});

	return (
		<div className={classes.container}>
			<button
				className={classes.trigger}
				type="button"
				onClick={() => setIsFilterOpen(true)}
			>
				Filter
			</button>
			{isFilterOpen && (
				<div ref={ref} className={classes.dropdown}>
					<div>Product line</div>

					<div>
						{availableLines.map((line) => {
							return <div key={line.id}>{line.id}</div>;
						})}
					</div>

					<button type="reset" onClick={() => console.log("reset")}>
						Reset
					</button>
				</div>
			)}
		</div>
	);
};

export default Filter;
