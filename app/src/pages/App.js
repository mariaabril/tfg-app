//import logo from './../logo.svg';
import './App.css';
import React, { useState } from 'react';

//import Main from "../components/main/Main";
import Navbar from "../components/navbar/Navbar";
import Routes from "./../routes/routes"


function App() {
  const [date_range, setDateRange] = useState ([
    {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }
  ]);

  function handleCalendarChange(ranges) {
    setDateRange([ranges.selection]);
  }


  return (
    
    <div className="container">
      <Navbar calendar_onChange={handleCalendarChange} calendar_ranges={date_range}/>
      <Routes calendar_ranges={date_range[0]}/>
    </div>
  );
}

export default App;