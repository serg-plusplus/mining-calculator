export const getArrayAverage = arr => arr[Math.floor(arr.length / 2)];

export const round = (val, decPlaces = 2) =>
  Number(`${Math.round(`${val}e${decPlaces}`)}e-${decPlaces}`) || 0;
