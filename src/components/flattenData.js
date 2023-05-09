import memoize from "memoizee";

const flattenData = memoize((data) => {
  return data.map(([_, __, entry]) => {
    const { Planet = {}, Satellite = {} } = entry;

    return {
      time: Planet.time || Satellite.time,
      planetX: Planet.x || 0,
      planetY: Planet.y || 0,
      satelliteX: Satellite.x || 0,
      satelliteY: Satellite.y || 0,
    };
  });
});

export default flattenData;
