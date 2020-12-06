export const leafletMapPosition = (loc) => {
  if (loc.position) {
    return [loc.position.lat, loc.position.lng];
  } else {
    console.error(
      'Incorrect input to leafletMapPosition function, required Dublin Bikes location object'
    );
    return null;
  }
};
