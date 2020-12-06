// This function takes in latitude and longitude of two location and
// returns the distance between them as the crow flies (in km)
export const calcCrow = (pos1, pos2) => {
    const R = 6371; // km
    const dLat = toRad(pos2[0] - pos1[0]);
    const dLon = toRad(pos2[1] - pos1[1]);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
            Math.sin(dLon / 2) *
            Math.cos(pos1[0]) *
            Math.cos(pos2[0]);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
};

// Converts numeric degrees to radians
function toRad(Value) {
    return (Value * Math.PI) / 180;
}
