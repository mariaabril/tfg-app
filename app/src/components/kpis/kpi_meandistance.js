
export default function GetMeanDistance({vehicles}) {
  const vehs = vehicles.features;
  if (vehs.length === 0) {
    return 0;
  } else {
    let contador = 0;
    var totalDistance = 0;
    vehs.map(vehicle => {
      totalDistance += vehicle.distance;
      contador += 1;
    });

    console.log("totalDistance=" + totalDistance + "  contador=" + contador);
    return Math.round(totalDistance/contador);
  }
}
  