import React from 'react';
import ReactCollapse from 'react-collapse';
import PropTypes from 'prop-types';
 
import { DateRange } from 'react-date-range';
//import { addDays } from 'date-fns';

import 'react-calendar/dist/Calendar.css';

import "./calendar.css";

const {Collapse} = ReactCollapse;

function GetCalendarDate(all){
  const type = all['type']
  const date = all['date'][0][type];
  //console.log(date);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()];
  
  return month + ' ' + date.getDate() + ', ' + date.getFullYear()
};

class CollapsableCalendar extends React.Component {
  static propTypes = {
    isOpened: PropTypes.bool
  };
  static defaultProps = {
    isOpened: true
  };
  constructor(props) {
    super(props);
    const {isOpened} = this.props;
    this.state = {isOpened, paragraphs: 0};
  }

  render() {
    const {isOpened} = this.state;
    return (
      <div className="all_calendar">
        
        
        <div className="dateBoxes">
          <div className="dateBox" id="startDate">
            <p><GetCalendarDate date={this.props.calendar_ranges} type={'startDate'}/></p>
          </div>
          <div className="dateBox" id="endDate">
            <p><GetCalendarDate date={this.props.calendar_ranges} type={'endDate'}/></p>
          </div>
        </div>
        <Collapse isOpened={isOpened}>
          <DateRange
            editableDateInputs={true}
            onChange={ this.props.calendar_onChange }
            moveRangeOnFirstSelection={false}
            ranges={this.props.calendar_ranges}
          />
        </Collapse>
        <div className="config">
          <label className="label" >
            {this.props.date_str}
            <p><i class="far fa-calendar-alt"></i></p>
            <input
              className="input"
              type="checkbox"
              checked={isOpened}
              onChange={({target: {checked}}) => this.setState({isOpened: checked})} />
          </label>
        </div>
       
      </div>
      
    );
    
  }
}

export default CollapsableCalendar;
