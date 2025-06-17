export interface Device {
	guids: unknown[];
	icon: {
		id: string;
		resolutions: [number, number][];
	};
	id: string;
	images: {
		default: string;
		nopadding: string;
		topology: string;
	};
	line: {
		id: string;
		name: string;
	};
	product: {
		abbrev: string;
		name: string;
	};
	shortnames: string[];
	sku: string;
	sysid: string;
	sysids: string[];
	triplets: {
		[key: string]: string;
	};
	// uisp?: {
	// 	bleServices: any;
	// 	firmware: any;
	// 	line: string;
	// 	nameLegacy: string[];
	// };
	unifi?: {
		adoptability: "adoptable" | "???";
		network: {
			// "chipset": string,
			// "deviceCapabilities": string[],
			ethernetMaxSpeedMegabitsPerSecond: 10000;
			// "features": {
			// 	"atfDisabled": boolean,
			// 	"ax": boolean,
			// 	"bandsteer": boolean,
			// 	"be": boolean,
			// 	"gen": number
			// },
			// "minimumFirmwareRequired": string,
			// "model": string,
			numberOfPorts: number;
			radios: {
				[key: string]: {
					gain: number;
					maxPower: number;
					maxSpeedMegabitsPerSecond: number;
				};
			};
			// "systemIdHexadecimal": "a697",
			// "type": "uap"
		};
	};
	videos: {
		[key: string]: string;
	};
}
