import React from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  LabelSeries,
  DiscreteColorLegend
} from "react-vis";

import myData from './data_charts/distance_barchart.json';
const orangeData = [{x: 'A', y: 20}, {x: 'B', y: 3}, {x: 'C', y: 10}];

const blueData = [{x: 'A', y: 12}, {x: 'B', y: 2}, {x: 'C', y: 11}];



export default class BarchartDist extends React.Component {
  state = {
    useCanvas: false
  };

  render() {
    const {useCanvas} = this.state;
    const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;
    return (
      <div>
        <XYPlot xType="ordinal" width={300} height={300} xDistance={100}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <BarSeries className="vertical-bar-series-example" data={myData} />        
        </XYPlot>
      </div>
    );
  }
}