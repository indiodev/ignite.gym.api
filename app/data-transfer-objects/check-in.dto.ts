import type { Coordinate } from '@utils/get-distance-between-coordinates.util';

export type CheckInCreateDTO = {
	gym_id: string;
	user_id: string;
	user: Coordinate;
};

export type CheckInFindSameDate = {
	user_id: string;
	date: Date;
};
