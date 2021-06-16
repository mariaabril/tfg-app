import React, { useState } from 'react';
import DeckGL from '@deck.gl/react';
//import {Deck} from '@deck.gl/core';

import {StaticMap} from 'react-map-gl';//, NavigationControl } from 'react-map-gl';
import {GeoJsonLayer} from '@deck.gl/layers';
import IconClusterLayer from './icon-cluster-layer';
import IconMappingJson from './../../data/location-icon-mapping.json';
import './Map.css';
//import exclamation from './../../exclamation.png'
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibWFyaWFicmlsY3JldmkiLCJhIjoiY2ttbnV6c2xmMTB6bjJ3cnp4dWxubGF4bCJ9.GkqIHx503JnB4XujQxpNHA';

// Viewport settings  
const INITIAL_VIEW_STATE = {
  longitude: -3.70325,
  latitude: 40.4167,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

export const exceptionIds = [
  {id: 'RulePostedSpeedingId', color: '#ff8b00', label: 'Posted Speeding'}, // orange
  {id: 'RuleHarshCorneringId', color: 'blue', label: 'Harsh Cornering'},
  {id: 'RuleHarshBrakingId', color: '#ffc400', label: 'Harsh Braking'}, // yellow
  {id: 'RuleJackrabbitStartsId', color: 'red', label: 'Reverse Starting'},
  {id: 'RuleSeatbeltId', color: '#00875a', label: 'Seatbelt'} // green
];

function getToolTip(object) {
  if (object !== null && object.layer !== null && object.layer.id === 'vehicles')
  {
    const vehicle = object.object;
    if (vehicle !== null && vehicle !== undefined) {
      //console.log(vehicle);
      const retValue = {
        html: `<div>
              Vehicle ID: <b>${vehicle.id}</b> <br/>
              Mean distance: <b>${vehicle.distance} km </b> <br/>
              Mean speed: <b>${vehicle.speed} km/h</b> <br/>
              </div>`
        };
      return retValue;
    }
  }
  else if (object !== null && object.layer !== null && object.layer.id.startsWith('iconClusterLayer-')) {
    const exception = object.object && object.object.properties;
    if (exception) {
      if (exception.cluster)
      {
        //console.log(exception);
        const exceptions = object.layer.state.index
            .getLeaves(exception.cluster_id, 25)
            .map(f => f.properties);
        let html = `<div>`;
        exceptions.slice(0, 10).map(excep => {
          const exceptionLabel = exceptionIds.filter(exceptionData => {
            return exceptionData['id'] === excep.type_exception
            })[0].label;
          html = html + `
            Vehicle ID: <b>${excep.device_id}</b> <br/>
          Exception: <b>${exceptionLabel}</b> <br/>`
          });
        if (exceptions.length > 10) {
          html = html + `[...]`  
        }
        html = html + `</div>`;
        const retValue = {
          html: html
        };
        return retValue;
      }
      else if (exception)
      {
        const exceptionLabel = exceptionIds.filter(exceptionData => {
          return exceptionData['id'] === exception.type_exception
        })[0].label;
        const retValue = {
          html: `<div>
                Vehicle ID: <b>${exception.device_id}</b> <br/>
                Exception: <b>${exceptionLabel}</b> <br/>
                </div>`
          };
        return retValue;
      }
    }

  }
  return null;
}

function Map({data_veh, data_excep, filter_layers, width, height}) { 
  var layers = [];
  //console.log(filter_layers);
  if (filter_layers.indexOf('vehicles') >= 0) {
    layers.push(new GeoJsonLayer({
      id: 'vehicles',
      data: data_veh,
      stroked: false,
      filled: true,
      lineWidthMinPixels: 0.5,
      parameters: {
        depthTest: false
      },
      pickable: true,
      //getFillColor: [160, 160, 180, 200],
      getLineColor: f => {
        const hex = f.color;
        // convert to RGB
        return hex ? hex.match(/[0-9a-f]{2}/g).map(x => parseInt(x, 16)) : [0, 0, 0];
      }
    }));
  }
  filter_layers.map((layerName) => {
    if (layerName !== 'vehicles') {
      const filteredExceptions = data_excep.filter(exception => {
        return exception['type_exception'] === layerName
      });
      //console.log(filteredExceptions);
      if (filteredExceptions.length > 0) {
        //console.log(filteredExceptions);
        layers.push(new IconClusterLayer({
          id: 'iconClusterLayer-' + layerName,
          layerId: 'icon-' + layerName,
          data: filteredExceptions,
          iconMapping : IconMappingJson,
          iconAtlas : '/data/icon_atlas/location-icon-atlas-' + layerName + '.png',
          sizeScale: 60,
          getPosition: d => d.coordinates
        }));  
      }
    }
    return null;
  });

  //console.log('Render map');
  //console.log(data_excep);

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true} 
      layers={[layers]}
      pickingRadius={5}
      style={{position:"relative"}}
      height={height}
      getTooltip={getToolTip}
    >
      <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}/>
    </DeckGL>
  );
}
export default Map;

