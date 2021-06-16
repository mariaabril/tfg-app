

export default function GetNumIds({vehicles}) {
  let lookup = new Set();
  const vehs = vehicles.features;
  vehs.map(vehicle => lookup.add(vehicle.id));
  //console.log(lookup);
  return lookup.size;
}
