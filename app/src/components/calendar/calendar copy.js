import React, { useState } from 'react';
import ReactCollapse from 'react-collapse';
import PropTypes from 'prop-types';
 

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import "./calendar.css";

const {Collapse, UnmountClosed} = ReactCollapse;

class CollapsableCalendar extends React.Component {
  static propTypes = {
    isOpened: PropTypes.bool
  };
  static defaultProps = {
    isOpened: false
  };
  constructor(props) {
    super(props);
    const {isOpened} = this.props;
    this.state = {isOpened, paragraphs: 0};
  }
  
  render() {
    const {isOpened, paragraphs} = this.state;
    return (
      <div>
        <div className="config">
          <label className="label">
            {this.props.date_str}
            <input
              className="input"
              type="checkbox"
              checked={isOpened}
              onChange={({target: {checked}}) => this.setState({isOpened: checked})} />
          </label>

        </div>

        <Collapse isOpened={isOpened}>
            <Calendar
              onChange={this.props.calendar_onChange}
              value={this.props.calendar_value}
            />
        </Collapse>
      </div>
    );
  }
}

export default CollapsableCalendar;