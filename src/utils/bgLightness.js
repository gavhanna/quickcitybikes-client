// Used to get the "lightness" of the background colour,
// in order to determine if the text should be black or white.

const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const isBackgroundLight = (bgColor) => {
  const rgbColor = hexToRgb(bgColor);
  // console.log(rgbColor);

  const brightness = Math.round(
    (parseInt(rgbColor.r) * 299 +
      parseInt(rgbColor.g) * 587 +
      parseInt(rgbColor.b) * 114) /
      1000
  );
  // const textColour = brightness > 125 ? 'dark' : 'light';
  return brightness > 125;
};
