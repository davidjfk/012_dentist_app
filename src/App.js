import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Create150Appointments from "./Create150Appointments";
import {UseEffectHookCalls} from "./UseEffectHookCalls";
import Appointment from "./components/appointment/Appointment";
import Assistant from "./components/assistant/Assistant";
import Client from "./components/client/Client";
import Dentist from "./components/dentist/Dentist";
import {Calendar} from "./components/monthView/Calendar";
import {SelectDayNrToDisplay} from "./components/dayView/SelectDayNrToDisplay";

import "./App.css";

const log = console.log;

const App = ()  => {

  let appointmentsfromReduxToolkit = useSelector((state) => state.appointment)
  // log(`component App: start:  nr of auto-generated appointments in redux-toolkit: ${appointmentsfromReduxToolkit.appointments.length}`)
  // log()
  return(
    <>
      <Create150Appointments/>
      <Router>
        <div>
          <nav>
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
              <li>
                <Link to="/useEffectHookCalls">useEffect-hook-calls</Link>
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
                {/* <Day appointments={appointmentsfromReduxToolkit.appointments.filter(app => app.day === "03")} /> */}
                {/* <Day appointments={appointmentsfromReduxToolkit.appointments} /> */}
                <SelectDayNrToDisplay appointments={appointmentsfromReduxToolkit.appointments} />
              </Route>
              <Route path="/useEffectHookCalls">
                <UseEffectHookCalls />
              </Route>
              <Route path="/">
                <Calendar appointments={appointmentsfromReduxToolkit.appointments}  />
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
  </>
 );
};
export default App;
