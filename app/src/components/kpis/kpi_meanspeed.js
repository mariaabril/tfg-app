
export default function GetMeanSpeed({vehicles}) {
  const vehs = vehicles.features;
  if (vehs.length === 0) {
    return 0;
  } else {
    let contador = 0;
    var totalSpeed = 0;
    vehs.map(vehicle => {
      totalSpeed += vehicle.speed;
      contador += 1;
    });
    console.log("totalSpeed=" + totalSpeed + "  contador=" + contador);
    return Math.round(totalSpeed/contador);
  }
}