import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { Device } from "@/types/types";
import { useAppliedFilters } from "@/stores/productsStore";
import { useEffect, useState } from "react";

export const useGetProducts = (): {
	allDevices: Device[];
	filteredDevices: Device[];
	isPending: boolean;
	queryError: Error | null;
} => {
	const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
	const appliedFilters = useAppliedFilters();

	const { isPending, error, data, isFetching, isStale } = useQuery({
		queryKey: ["deviceData"],
		queryFn: async () => {
			const response = await fetch(
				"https://static.ui.com/fingerprint/ui/public.json",
			);
			return await response.json();
		},
		staleTime: 60 * 1000, // Data will be considered fresh for 1 minute.
		placeholderData: keepPreviousData,
	});

	useEffect(() => {
		if (data?.devices) {
			if (appliedFilters.length > 0) {
				setFilteredDevices(
					data?.devices?.filter((device: Device) => {
						return appliedFilters.includes(device.line.id);
					}),
				);
			} else {
				setFilteredDevices(data?.devices);
			}
		}
	}, [appliedFilters, data]);

	return {
		allDevices: data?.devices ?? [],
		filteredDevices,
		isPending,
		queryError: error,
	};
};
