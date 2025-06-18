import type React from "react";
import { useEffect } from "react";
import { useRef, useState } from "react";
import classes from "./SearchSelect.module.scss";
import { useClickAway } from "react-use";
import { useProductContext } from "@/context/ProductContext";
import { Link } from "react-router";
import type { Device } from "@/types/types";

interface SearchSelectProps {
	placeholder?: string;
}

const SearchSelect: React.FC<SearchSelectProps> = ({ placeholder }) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [value, setValue] = useState("");
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const { filteredProducts } = useProductContext();
	const [searchResults, setSearchResults] = useState<Device[]>([]);

	useClickAway(ref, () => {
		setIsSearchOpen(false);
	});

	useEffect(() => {
		setSearchResults(
			filteredProducts.filter((item) =>
				item.product.name.toLowerCase().includes(value.toLowerCase()),
			),
		);
	}, [filteredProducts, value]);

	const highlightMatch = (text: string) => {
		if (!value) return text;

		const index = text.toLowerCase().indexOf(value.toLowerCase());
		if (index === -1) return text;

		return (
			<>
				{text.slice(0, index)}
				<span className="underline font-bold">
					{text.slice(index, index + value.length)}
				</span>
				{text.slice(index + value.length)}
			</>
		);
	};

	return (
		<div className={classes.container} ref={ref}>
			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<title>Search</title>
				<path
					d="M16.8529 16.1465L14.0059 13.3025C14.9369 12.2115 15.4999 10.7975 15.4999 9.25049C15.4999 5.79849 12.7019 3.00049 9.24988 3.00049C5.79788 3.00049 2.99988 5.79849 2.99988 9.25049C2.99988 12.7025 5.79788 15.5005 9.24988 15.5005C10.7949 15.5005 12.2079 14.9385 13.2989 14.0095L16.1469 16.8535C16.2449 16.9515 16.3719 16.9995 16.4999 16.9995C16.6279 16.9995 16.7559 16.9505 16.8539 16.8525C17.0489 16.6585 17.0489 16.3415 16.8529 16.1465ZM3.99988 9.25049C3.99988 6.35549 6.35488 4.00049 9.24988 4.00049C12.1449 4.00049 14.4999 6.35549 14.4999 9.25049C14.4999 12.1455 12.1449 14.5005 9.24988 14.5005C6.35488 14.5005 3.99988 12.1455 3.99988 9.25049Z"
					fill="#838691"
				/>
			</svg>
			<input
				type="text"
				name="search"
				id="search"
				autoComplete="off"
				placeholder={placeholder}
				value={value}
				className={classes.input}
				onClick={() => {
					setIsSearchOpen(true);
				}}
				onChange={(e) => {
					setValue(e.target.value);
				}}
			/>
			{value && (
				<button
					onClick={() => setValue("")}
					type="reset"
					className={classes.clear}
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Clear</title>
						<path
							d="M15.253 15.253C15.4485 15.0575 15.4485 14.7405 15.253 14.545L11.01 10.303L15.2529 6.06098C15.4484 5.86553 15.4483 5.54857 15.2527 5.35323V5.35323C15.0573 5.15811 14.7408 5.15822 14.5455 5.35348L10.303 9.596L6.0605 5.3535C5.86527 5.15827 5.54873 5.15827 5.3535 5.3535V5.3535C5.15827 5.54873 5.15827 5.86527 5.3535 6.0605L9.596 10.303L5.35348 14.5455C5.15822 14.7408 5.15811 15.0573 5.35323 15.2527V15.2527C5.54857 15.4483 5.86553 15.4484 6.06098 15.2529L10.303 11.01L14.545 15.253C14.7405 15.4485 15.0575 15.4485 15.253 15.253V15.253Z"
							fill="#838691"
						/>
					</svg>
				</button>
			)}
			{isSearchOpen && (
				<div className={classes.dropdown}>
					{searchResults.length === 0 && (
						<div className="text-sm text-text-2">
							No results found, try again
						</div>
					)}
					{searchResults.map((item) => {
						return (
							<Link
								to={`/${item.id}`}
								key={item.id}
								className="flex justify-betweent py-1.5 hover:bg-neutral-2"
							>
								<span className="text-text-2 text-sm whitespace-nowrap max-w-[200px] overflow-hidden overflow-ellipsis">
									{highlightMatch(item.product.name)}
								</span>
								<span className="flex flex-auto justify-end text-text-3 text-sm">
									{item.product.abbrev}
								</span>
							</Link>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default SearchSelect;
