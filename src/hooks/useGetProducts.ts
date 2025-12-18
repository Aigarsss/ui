import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import z from "zod";
import { useAppliedFilters } from "@/stores/productsStore";
import type { Device } from "@/types/types";

export const useGetProducts = (): {
	allDevices: Device[];
	filteredDevices: Device[];
	isPending: boolean;
	queryError: Error | null;
} => {
	const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
	const appliedFilters = useAppliedFilters();

	const ApiResponseSchema = z.object({
		devices: z.array(
			z.object({
				id: z.string(),
				images: z.object({
					default: z.string(),
					nopadding: z.string(),
					topology: z.string(),
				}),
				line: z.object({
					id: z.string(),
					name: z.string(),
				}),
				product: z.object({
					abbrev: z.string(),
					name: z.string(),
				}),
				shortnames: z.array(z.string()),
				unifi: z
					.object({
						adoptability: z.string().optional(),
						network: z
							.object({
								ethernetMaxSpeedMegabitsPerSecond: z.number().optional(),
								numberOfPorts: z.number().optional(),
								radios: z.record(
									z.string(),
									z.object({
										gain: z.number().optional(),
										maxPower: z.number().optional(),
										maxSpeedMegabitsPerSecond: z.number().optional(),
									}),
								),
							})
							.optional(),
					})
					.optional(),
			}),
		),
		version: z.string(),
	});

	const { isPending, error, data, isFetching } = useQuery({
		queryKey: ["deviceData"],
		queryFn: async () => {
			const response = await fetch(
				"https://static.ui.com/fingerprint/ui/public.json",
			);
			const data = await response.json();

			return ApiResponseSchema.parse(data);
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
