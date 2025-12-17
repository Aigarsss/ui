import { Device } from "@/types/types";

export const getNavigateToItemId = ({
	type,
	filteredDevices,
	currentProductId,
}: {
	type: "prev" | "next";
	filteredDevices: Device[];
	currentProductId: string;
}): string | undefined => {
	const totalProducts = filteredDevices.length;
	const index = filteredDevices.findIndex((obj) => obj.id === currentProductId);

	// Probably not going to happen, but still
	if (index === -1) {
		return currentProductId;
	}

	// if this is the first item
	if (index === 0 && type === "prev") {
		return filteredDevices.at(-1)?.id;
	}

	// if this is the first item
	if (index === totalProducts - 1 && type === "next") {
		return filteredDevices[0].id;
	}

	if (type === "prev") {
		return filteredDevices[index - 1].id;
	}

	return filteredDevices[index + 1].id;
};
