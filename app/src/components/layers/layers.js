import React from 'react';
import chroma from 'chroma-js';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {exceptionIds} from './../map/Map';

const animatedComponents = makeAnimated();
export let layerOptions = [
    { value: 'vehicles', label: 'Vehículos', color:'black' }
    //{ value: 'exceptions', label: 'Infracciones' }
  ]

exceptionIds.map((exception) => layerOptions.push({value: exception.id, label: exception.label, color: exception.color}));

const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma('pink'); // color de fondo cuando vas a seleccionar en el menu
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor:
          !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },
    };
  },
  multiValue: (styles, { data }) => { // color cuando esta seleccionado 
    const color = chroma(data.color);
    //console.log('color')
    //console.log(color)
    //console.log('data mariaa')
    //console.log(data)
    return {
      
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({ // ni idea 
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
};

function LayerSelector({onChange_layer_selection}) {
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={layerOptions}
      isMulti
      options={layerOptions}
      onChange={onChange_layer_selection}
      styles={colourStyles}
    />
  );
  
}

export default LayerSelector;
