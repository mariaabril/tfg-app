import React, {Component} from 'react';
import {scaleLinear} from 'd3-scale';
import {XYPlot, XAxis, YAxis, HeatmapSeries, LabelSeries, Hint} from "react-vis";
import Moment from 'moment';

import myData from './data_charts/heatmap_chart.json';

const daysWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const hours = ['24','23','22','21','20','19','18','17','16','15','14','13','12','11','10','09','08','07','06','05','04','03','02','01','00'];  

const {min, max} = myData.reduce(
  (acc, row) => ({
    min: Math.min(acc.min, row.num_vehs),
    max: Math.max(acc.max, row.num_vehs)
  }),
  {min: Infinity, max: -Infinity}
);
//FALTAAAA

function filterDataFromDates(startDate, endDate) {
  var iterateDate = new Date(startDate)
  var myData = [];
  while(iterateDate <= endDate) {
    const datestring = Moment(iterateDate).format('DD/MM/YY');
    iterateDate.setDate(iterateDate.getDate() + 1);
    myData.push({x: datestring, y: 10});
  } 

  console.log(myData);
  return myData;
}

export default class LabeledHeatmap extends Component {
  state = {
    value: false
  };

  render () {
    const {value} = this.state;
    const exampleColorScale = scaleLinear()
    .domain([min, (min + max) / 2, max])
    .range(['orange', 'white', 'cyan']);

    return (
      <XYPlot
        xType="ordinal"
        xDomain={daysWeek}
        yType="ordinal"
        yDomain={hours}
        margin={50}
        width={500}
        height={700}
        >
      <XAxis orientation="top" />
      <YAxis />
      <HeatmapSeries
        colorType="literal"
        getColor={d => exampleColorScale(d.num_vehs)}
        style={{
          stroke: 'white',
          strokeWidth: '2px',
          rectStyle: {
            rx: 10,
            ry: 10
          }
        }}
        className="heatmap-series-example"
        data={myData}
        onValueMouseOver={v => this.setState({value: v})}
        onSeriesMouseOut={v => this.setState({value: false})}
        />
      <LabelSeries
        style={{pointerEvents: 'none'}}
        data={myData}
        labelAnchorX="middle"
        labelAnchorY="baseline"
        getLabel={d => `${d.num_vehs}`}
        />
      {value !== false && <Hint value={value} />}
      </XYPlot>
    );
  }
}