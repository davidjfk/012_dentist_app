import React from "react";
import "./App.css";



// import InitalSetupForMakingAppointments from "./InitialSetupForMakingAppointments";
import CreateRandomAppointmentsWhenAppStarts from "./CreateRandomAppointmentsWhenAppStarts";
import {CreateAppointment} from "./CreateAppointment";
import DeleteAppointment from "./DeleteAppointment";
import UpdateAppointment from "./UpdateAppointment";
import AddDentist from "./AddDentist";

export const Appointment = ({appointments}) =>  {
    return(
        <>
            <div>How to call the functions from the winc assignment dentist without forms nor buttons: </div>
            <br/>
            
            <div>step 1: inside component App.js uncomment one component at a time. </div>
            <div>Each component contains a fn that must be implemented as part of the winc requirements.</div>    
            <div>Initially I call each fn without form nor buttons inside a useEffect hook with "[]" as a dependency. That is why only one component can be 
            active at a time.</div>
            In the bonus requirements forms and buttons will be added to call each function. When that happens:
            <ul>
            <ol>1. each component will move to a location that makes it easy to call the fn inside that component with a form and/or button(s).</ol>
            <ol>2. The code to create 150 appointments will move from component App.js into component createRandomAppointments. <br/>
                Do not uncomment this component CreateRandomAppointmentsWhenAppStarts  before then.</ol>
            {/* <CreateRandomAppointmentsWhenAppStarts /> */}
            <ol>3. Inside component App.js the following line must be removed: </ol>
            {/* {(appointmentsfromReduxToolkit.appointments.length > 149 ) &&   */}
                reason: events emitted from forms will replace the use of useEffect hooks with [] as dependencies to invoke the winc-requirement-functions.
            </ul>
            
            {/* <CreateAppointment />  */}
            {/* <DeleteAppointment/> */}
            {/* <UpdateAppointment/> */}
            <AddDentist />
            <div>the useEffect hook inside each of the components above explains how the functions inside these components can be invoked.</div>
            
        </>

    )
}  
