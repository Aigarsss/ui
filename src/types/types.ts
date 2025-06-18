export interface Device {
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
	unifi?: {
		adoptability?: string;
		network?: {
			ethernetMaxSpeedMegabitsPerSecond?: number;
			numberOfPorts?: number;
			radios?: {
				[key: string]: {
					gain?: number;
					maxPower?: number;
					maxSpeedMegabitsPerSecond?: number;
				};
			};
		};
	};
}
