import "./Main.css";
import Map from "../map/Map";
import vehicles from './../../data/vehicles.json';
import { DatesRangeInput } from 'semantic-ui-calendar-react'
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function GetVehiclesData(vehicles, date_calendar){
  var vehicles_array = [];
  var vehicles_dic = {};
  var items = vehicles.features;
  for (var item, i = 0; item = items[i++];) {
    var date_vehicle = item.date;
    if (date_vehicle==convertDate(date_calendar)) {
        vehicles_array.push(item);
        }
    }
    vehicles_dic['type'] = 'FeatureCollection';
    vehicles_dic['features'] = vehicles_array;
  return vehicles_dic; 
}

function GetNumIds({vehicles}) {
  var lookup = {};
  var items = vehicles.features;
  var result = [];

  for (var item, i = 0; item = items[i++];) {
  
    var id = item.id;

    if (!(id in lookup)) {
      lookup[id] = 1;
      result.push(id);
    }
  }
  return result.length;
}

function GetMeanSpeed({vehicles}) {
  var items = vehicles.features;
  var totalMeanSpeed = 0;
  var contador = 0;
  for (var item, i = 0; item = items[i++];) {
  
    var speed = item.speed;
    totalMeanSpeed += speed;
    contador += 1;
  }
  return totalMeanSpeed/contador;
}

function GetMeanDistance({vehicles}) {
  var items = vehicles.features;
  var totalMeanDistance = 0;
  var contador = 0;
  for (var item, i = 0; item = items[i++];) {
  
    var distance = item.distance;
    totalMeanDistance += distance;
    contador += 1;
  }
  return totalMeanDistance/contador; 
}

function convertDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat)
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
}

const Main = () => {
  const [value, onChange] = useState(new Date());
  return (
    <main>
      
      <div className="main__container">
        {/* <!-- MAIN TITLE STARTS HERE --> */}
        {/* <!-- MAIN TITLE ENDS HERE --> */}

        {/* <!-- MAIN CARDS STARTS HERE --> */}
        {/* <!-- MAIN CARDS ENDS HERE --> */}

        {/* <!-- CHARTS STARTS HERE --> */}
        <div className="calendar">
          <Calendar
            onChange={onChange}
            value={value}
            
          />
          <h2>hola</h2>
        </div>
        <div className="calendar">
          <div className="charts__left">
            <Map data={GetVehiclesData(vehicles,value)} width="50vw" height="100%" date={convertDate(value)}/>
          </div>

          <div className="charts__right">
            <div className="charts__right__cards">
              <div className="card1">
                <h2>Número de vehículos:</h2>
                <h2><GetNumIds vehicles={GetVehiclesData(vehicles,value)} /></h2>
              </div>

              <div className="card2">
                <h2>Distancia total recorrida</h2>
                <h2><GetMeanDistance vehicles={GetVehiclesData(vehicles,value)}/> km</h2>
              </div>

              <div className="card3">
                <h1>Velocidad media</h1>
                <h2><GetMeanSpeed vehicles={GetVehiclesData(vehicles,value)}/> km/h</h2>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- CHARTS ENDS HERE --> */}
      </div>
    </main>
  );
};

export default Main;
