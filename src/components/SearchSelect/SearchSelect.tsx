import type React from "react";
import { useEffect } from "react";
import { useRef, useState } from "react";
import classes from "./SearchSelect.module.scss";
import { useClickAway } from "react-use";
import { useProductContext } from "@/context/ProductContext";
import { Link } from "react-router";
import type { Device } from "@/types/types";
import { Search } from "lucide-react";

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
			<Search size={18} className="text-neutral-8" />
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
