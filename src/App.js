import React from "react";
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Create150Appointments from "./Create150Appointments";
// import {UseEffectHookCalls} from "./components/obsolete_fnCalls_winc_operations_witout_UI/UseEffectHookCalls";
import Appointment from "./components/appointment/Appointment";
import Assistant from "./components/assistant/Assistant";
import Client from "./components/client/Client";
import Dentist from "./components/dentist/Dentist";
import {Calendar} from "./components/monthView/Calendar";
import {SelectDayNrToDisplay} from "./components/dayView/SelectDayNrToDisplay";

import {log} from './utils';

import {theme} from "./appStyleTheme"
// import "./App.css";
import { AppStyled } from "./App.styled";
import {NavigationStyled} from "./Navigation.styled";


const App = ()  => {

  let uiControlBehaviorDuringAppointmentUpdate = useSelector((state) => state.updateAppointment)
  log('hierzoho')
  log(uiControlBehaviorDuringAppointmentUpdate)
  log(uiControlBehaviorDuringAppointmentUpdate.pointerEvents)
  log(uiControlBehaviorDuringAppointmentUpdate)

  theme.pointerEvents = "none"; // works
  theme.pointerEvents = uiControlBehaviorDuringAppointmentUpdate.pointerEvents


  let appointmentsfromReduxToolkit = useSelector((state) => state.appointment)
  return(
    <>
     <ThemeProvider theme = {theme}>
     <AppStyled>
        <Create150Appointments/>
        <Router>
          <NavigationStyled>
            <nav className="navBar">
              <ul>  
                <li>
                  <Link to="/">Calendar view</Link>
                </li>
                <li>
                  <Link to="/day">Day view</Link>
                </li>
                <li>
                  <Link to="/appointment">Appointment</Link>
                </li> 
                <li>
                  <Link to="/assistant">Assistant</Link>
                </li>
                <li>
                  <Link to="/client">Client</Link>
                </li>
                <li>
                  <Link to="/dentist">Dentist</Link>
                </li>
              </ul>
            </nav>
            <main>
              <Switch>
                <Route path="/client">  
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
            </main>
          </NavigationStyled>
        </Router>
        </AppStyled>
    </ThemeProvider>
  </>
 );
};
export default App;
