import { useCallback, useEffect, useState } from "react";
import type { Device } from "@/types/types";

export const useInfiniteScroll = ({
	filteredDevices,
}: {
	filteredDevices: Device[];
}): {
	visibleItemsCount: number;
} => {
	const STEP = 100;
	const [visibleItemsCount, setVisibleItemsCount] = useState(STEP);

	const handleScroll = useCallback(() => {
		const bottomReached =
			Math.ceil(window.innerHeight + window.scrollY) >=
			document.documentElement.scrollHeight - 300;

		if (bottomReached && visibleItemsCount < filteredDevices.length) {
			setVisibleItemsCount((prevCount) => {
				return prevCount + STEP;
			});
		}
	}, [filteredDevices.length, visibleItemsCount]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [handleScroll]);

	return {
		visibleItemsCount,
	};
};
