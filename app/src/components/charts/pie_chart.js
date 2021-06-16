import React from 'react';

//import Sunburst from 'sunburst';
import {Sunburst, LabelSeries} from 'react-vis';

import exception_data from './data_charts/exceptions_chart.json';
import Moment from 'moment';

//console.log(exception_data['2021/02/01']) OK


//var dic_all = {} //"children": [dic_vehicles]

let dic_values = {} //rule:value
let dic_colors = {} //rule:color
const exception_list = ["all_vehicles", "Posted Speeding", "Harsh Cornering", "Harsh Braking", "Reverse Starting", "Seatbelt"]
const colors = ["#12939A","#42f59b", "#f5e342","#f58442","#9e42f5","0000"]
for (var i = 0; i < exception_list.length; i++) { 
  dic_values[exception_list[i]] = 0;
  dic_colors[exception_list[i]] = colors[i];
}


const EXTENDED_DISCRETE_COLOR_RANGE = [
    '#19CDD7',
    '#DDB27C',
    '#88572C',
    '#FF991F',
    '#F15C17',
    '#223F9A',
    '#DA70BF',
    '#125C77',
    '#4DC19C',
    '#776E57',
    '#12939A',
    '#17B8BE',
    '#F6D18A',
    '#B7885E',
    '#FFCB99',
    '#F89570',
    '#829AE3',
    '#E79FD5',
    '#1E96BE',
    '#89DAC1',
    '#B3AD9E'
  ]; 

const LABEL_STYLE = {
  fontSize: '8px',
  textAnchor: 'middle'
};

/**
 * Recursively work backwards from highlighted node to find path of valud nodes
 * @param {Object} node - the current node being considered
 * @returns {Array} an array of strings describing the key route to the current node
 */
function getKeyPath(node) {
  if (!node.parent) {
    return ['root'];
  }

  return [(node.data && node.data.name) || node.name].concat(
    getKeyPath(node.parent)
  );
}

/**
 * Recursively modify data depending on whether or not each cell has been selected by the hover/highlight
 * @param {Object} data - the current node being considered
 * @param {Object|Boolean} keyPath - a map of keys that are in the highlight path
 * if this is false then all nodes are marked as selected
 * @returns {Object} Updated tree structure
 */
function updateData(data, keyPath) {
  if (data.children) {
    data.children.map(child => updateData(child, keyPath));
  }
  // add a fill to all the uncolored cells
  if (!data.hex) {
    data.style = {
      fill: EXTENDED_DISCRETE_COLOR_RANGE[5]
    };
  }
  data.style = {
    ...data.style,
    fillOpacity: keyPath && !keyPath[data.name] ? 0.2 : 1
  };

  return data;
}

function filterDataFromDates(startDate, endDate)
{
  const startDateString = Moment(startDate).format('YYYY/MM/DD');
  const endDateString = Moment(endDate).format('YYYY/MM/DD');

  var children_vehicles = [] // [{"name": "RuleSeatbeltId", "hex": "#9e42f5", "value": 2324}....]
  var dic_vehicles = {} // "name": "000 vehicles", "children": children_vehicles
  var dic_all = {} //"children": [dic_vehicles]
 
  Object.entries(exception_data).forEach(([key, value]) => {
    if ((key >= startDateString) && (key <= endDateString)) { // entre las 2 fechas 
      for (var i = 0; i < value.length; i++) { 
        const rule_id = value[i][0]
        const value_rule = value[i][1]
        dic_values[rule_id] += value_rule
      }
    }
  });

  Object.entries(dic_values).forEach(([key, value]) => {
    var dic_excep = {} //{"name": "RuleSeatbeltId", "hex": "#9e42f5", "value": 2324}
    if (key == 'all_vehicles'){
      //pass
    } else{
      dic_excep['name'] = value + '\u000A' + key;
      dic_excep['hex'] = dic_colors[key];
      dic_excep['value'] = value;
    }
    children_vehicles.push(dic_excep);
  });
console.log(children_vehicles)
console.log(children_vehicles[1]['value'])
  dic_vehicles["name"] = children_vehicles[1]['value'] + children_vehicles[2]['value'] + children_vehicles[3]['value'] + children_vehicles[4]['value'] + children_vehicles[5]['value'] +  "\n INFRACCIONES";
  dic_vehicles["children"] = children_vehicles;
  dic_all['children'] = [dic_vehicles];

  //console.log('dic_all')
  //console.log(dic_all)

  return updateData(dic_all, false);
}

//const decoratedData = updateDicData(new Date(), new Date());

export default class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pathValue: false,
      data: null,
      finalValue: 'INFRACCIONES',
      clicked: false,
      old_calendar_ranges: {
        startDate: new Date(),
        endDate: new Date()}
      };
  }

  render() {
    const cur_calendar_ranges = this.props.calendar_ranges;
    const old_calendar_ranges = this.state.old_calendar_ranges;
    if (this.state.data === null ||
        old_calendar_ranges.startDate.getTime() !== cur_calendar_ranges.startDate.getTime() ||
        old_calendar_ranges.endDate.getTime() !== cur_calendar_ranges.endDate.getTime()) {
      this.state.old_calendar_ranges = cur_calendar_ranges;
      this.state.data = filterDataFromDates(this.props.calendar_ranges.startDate, this.props.calendar_ranges.endDate);
      //console.log(cur_calendar_ranges);
      //console.log(old_calendar_ranges);
      //console.log(this.state.data);
    }

    const {clicked, finalValue, pathValue, data} = this.state;
    return (
      <div className="basic-sunburst-example-wrapper">
        <div>
          {clicked ? 'click to unlock selection' : 'click to lock selection'}
        </div>
        <Sunburst
          animation
          className="basic-sunburst-example"
          hideRootNode
          onValueMouseOver={node => {
            if (clicked) {
              return;
            }
            const path = getKeyPath(node).reverse();
            const pathAsMap = path.reduce((res, row) => {
              res[row] = true;
              return res;
            }, {});
            this.setState({
              finalValue: path[path.length - 1],
              pathValue: path.join(' > '),
              data: updateData(data, pathAsMap)
            });
          }}
          onValueMouseOut={() =>
            clicked
              ? () => {}
              : this.setState({
                  pathValue: false,
                  finalValue: false,
                  data: updateData(data, false)
                })
          }
          onValueClick={() => this.setState({clicked: !clicked})}
          style={{
            stroke: '#ddd',
            strokeOpacity: 0.3,
            strokeWidth: '0.5'
          }}
          colorType="literal"
          getSize={d => d.value}
          getColor={d => d.hex}
          data={data}
          height={300}
          width={350}
        >
          {finalValue && (
            <LabelSeries
              data={[{x: 0, y: 0, label: finalValue, style: LABEL_STYLE}]}
            />
          )}
        </Sunburst>
      </div>
    );
  }
}