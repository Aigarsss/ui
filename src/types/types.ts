export interface Device {
	guids: unknown[];
	icon: {
		id: string;
		resolutions: any[];
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
	triplets: any;
	uisp?: {
		bleServices: any;
		firmware: any;
		line: string;
		nameLegacy: string[];
	};
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
			// "radios": {
			// 	"6e": {
			// 		"gain": 6,
			// 		"maxPower": 29,
			// 		"maxSpeedMegabitsPerSecond": 11528
			// 	},
			// 	"na": {
			// 		"gain": 6,
			// 		"maxPower": 29,
			// 		"maxSpeedMegabitsPerSecond": 8648
			// 	},
			// 	"ng": {
			// 		"gain": 4,
			// 		"maxPower": 22,
			// 		"maxSpeedMegabitsPerSecond": 688
			// 	}
			// },
			// "systemIdHexadecimal": "a697",
			// "type": "uap"
		};
	};
	videos: any;
}
