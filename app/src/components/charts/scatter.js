import React from 'react';
import Moment from 'moment';

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  MarkSeries,
  Hint
} from 'react-vis';

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
    
export default class ScatterGraph extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          value: null,
        };
        this.internaldata = {
            data: null,
            old_calendar_ranges: {
              startDate: new Date(),
              endDate: new Date()}
          };
      }

    _forgetValue = () => {
        this.setState({
        value: null
        });
    };

    _rememberValue = value => {
        this.setState({value});
    };

    render() {
        const cur_calendar_ranges = this.props.calendar_ranges;
        const old_calendar_ranges = this.internaldata.old_calendar_ranges;
        if (this.internaldata.data === null ||
            old_calendar_ranges.startDate.getTime() !== cur_calendar_ranges.startDate.getTime() ||
            old_calendar_ranges.endDate.getTime() !== cur_calendar_ranges.endDate.getTime()) {
          this.internaldata.old_calendar_ranges = cur_calendar_ranges;
          this.internaldata.data = filterDataFromDates(this.props.calendar_ranges.startDate, this.props.calendar_ranges.endDate);
          console.log(cur_calendar_ranges);
          console.log(old_calendar_ranges);
          console.log(this.internaldata.data);
        }

        const {value} = this.state;
        return (
        <XYPlot width={300} height={300} xType="ordinal">
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis tickLabelAngle={-45} />
            <YAxis />
            <MarkSeries
            onValueMouseOver={this._rememberValue}
            onValueMouseOut={this._forgetValue}
            data={this.internaldata.data}
            />
            {value ? <Hint value={value} /> : null}
        </XYPlot>
        );
    }
}