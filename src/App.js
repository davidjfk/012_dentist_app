import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import AddAppointment from "./AddAppointment";
import {Calendar} from "./Calendar";
import Day from "./Day";

import {generateRandomAppointments} from "./utils";

/*

  dentists (4), assistants (2) and clients (150) are added to the state of the app. each in a separate redux-toolkit-slice. 

  appointments is the (wannabe) "state" of the app and is rendered as props in the components 'Calender' and 'Day' below. 
  This "state" must be moved to a global state first (step 1), and then as a final step be rendered to the screen.
  The steps in between will handle the business logic. 

*/


// step1: use case 0: put 50 clients, 4 dentists, 2 assistants into global state.
// step1: use case 1: put 150 appointments into global state.

const appointments = generateRandomAppointments(150);
/* 
  problem: after each re-render the data in appointments will be reset with "generateRandomAppointments(150);". 
  solution: useEffect hook inside component initialSetupForMakingAppointments.js 
*/

// step3 : get global state from  redux-toolkit to render data in 'Calendar' and 'Day' components:



const App = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Add appointment</Link>
          </li>         
          <li>
            <Link to="/calendar">Calendar view</Link>
          </li>
          <li>
            <Link to="/day">Day view</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Switch>
          <Route path="/calendar">
            <Calendar appointments={appointments} />
          </Route>
          <Route path="/day">
            <Day appointments={appointments.filter(app => app.day === 1)} />
          </Route>
          <Route path="/">
            <AddAppointment />
          </Route>
        </Switch>
      </main>
    </div>
  </Router>
);
export default App;
