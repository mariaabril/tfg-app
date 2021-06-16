import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import logo from './camion-de-transporte.png'
import 'react-calendar/dist/Calendar.css';
import CollapsableCalendar from '../calendar/calendar';

const Navbar = (params) => {

  //console.log(params);

  return (
  <nav className="navbar">
    <div className="navbar__left"> 
      <img id="logo_camion" src={logo} alt="logo"/>
      <NavLink
        exact
        activeClassName="navbar__link--active"
        className="navbar__link"
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        id="page2"
        activeClassName="navbar__link--active"
        className="navbar__link"
        to="/Charts"
      >
        Charts
      </NavLink>
      

    </div>

    <div className="navbar__middle">
        <CollapsableCalendar
                  isOpened={false}
                  calendar_onChange={params.calendar_onChange}
                  calendar_ranges={params.calendar_ranges}
                /> 
        </div>
        
    <div className="navbar__right">
        <a href="#!">           
          <i
            className="fa fa-user-o fa-2x text-lightblue"
            aria-hidden="true"
          ></i>
        </a>
      </div>
  </nav>
  );
};

export default Navbar;