export type GymCreateDTO = {
	title: string;
	description: string | null;
	phone: string | null;
	latitude: number;
	longitude: number;
};

export type GymSearchDTO = {
	query: string;
	page: number;
};
