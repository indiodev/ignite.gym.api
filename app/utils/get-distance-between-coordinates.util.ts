export interface Coordinate {
	latitude: number;
	longitude: number;
}

export function getDistanceBetweenCoordinates(
	from: Coordinate,
	to: Coordinate,
): number {
	if (from.latitude === to.latitude && from.longitude === to.longitude)
		return 0;

	const fromRadian = (from.latitude * Math.PI) / 180;
	const toRadian = (to.latitude * Math.PI) / 180;

	const theta = from.longitude - to.longitude;
	const radTheta = (theta * Math.PI) / 180;

	let dist =
		Math.sin(fromRadian) * Math.sin(toRadian) +
		Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta);

	if (dist > 1) dist = 1;

	dist = Math.acos(dist);
	dist = (dist * 180) / Math.PI;
	dist = dist * 60 * 1.1515;
	dist = dist * 1.609344;

	return dist;
}
