import React from "react";
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Create150Appointments from "../../Create150Appointments";
import Appointment from "../appointment/Appointment";
import Assistant from "../assistant/Assistant";
import {Calendar} from "../monthView/Calendar";
import Client from "../client/Client";
import Dentist from "../dentist/Dentist";

import {SelectDayNrToDisplay} from "../dayView/SelectDayNrToDisplay";

import {AppStyled} from "./App.styled";
import {NavigationStyled} from "./Navigation.styled";
import {StyledNavLink} from "./NavLink.styled";
import {theme} from "../styles/appStyleTheme";

const App = ()  => {
  let uiControlBehaviorDuringAppointmentUpdate = useSelector((state) => state.updateAppointment)
  theme.pointerEvents = uiControlBehaviorDuringAppointmentUpdate.pointerEvents
  let appointmentsfromReduxToolkit = useSelector((state) => state.appointment)
  return(
    <>
     <ThemeProvider theme = {theme}>
     <AppStyled>
        <Create150Appointments/>
        <Router>
          <NavigationStyled>
              <ul className="navBar">  
                <StyledNavLink>
                  <Link exact to="/">Calendar view</Link>
                </StyledNavLink>
                <StyledNavLink>
                  <Link to="/day">Day view</Link>
                </StyledNavLink>
                <StyledNavLink>
                  <Link to="/appointment">Appointment</Link>
                </StyledNavLink> 
                <StyledNavLink>
                  <Link to="/assistant">Assistant</Link>
                </StyledNavLink>
                <StyledNavLink>
                  <Link to="/client">Client</Link>
                </StyledNavLink>
                <StyledNavLink>
                  <Link to="/dentist">Dentist</Link>
                </StyledNavLink>
              </ul>
              <Switch>
                <Route exact path="/client">  
                  <Client  />
                </Route>
                <Route path="/assistant">  
                  <Assistant  />
                </Route>
                <Route path="/dentist">  
                  <Dentist  />
                </Route>
                <Route path="/appointment">  
                  <Appointment  />
                </Route>
                <Route path="/day">
                  <SelectDayNrToDisplay appointments={appointmentsfromReduxToolkit.appointments} />
                </Route>
                <Route path="/">
                  <Calendar appointments={appointmentsfromReduxToolkit.appointments}  />
                </Route>
              </Switch>
          </NavigationStyled>
        </Router>
      </AppStyled>
    </ThemeProvider>
  </>
 );
};
export default App;
