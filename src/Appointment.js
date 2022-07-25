import React from "react";
import "./App.css";



import InitalSetupForMakingAppointments from "./InitialSetupForMakingAppointments";
import CreateRandomAppointmentsWhenAppStarts from "./CreateRandomAppointmentsWhenAppStarts";
import {CreateManualAppointmentAfterDentistAppHasStarted} from "./CreateManualAppointmentAfterDentistAppHasStarted";
import DeleteAppointment from "./DeleteAppointment";

export const Appointment = ({appointments}) =>  {
    // console.log('jojo')
    return(
        // <div>Home!</div>
        <>
            <div>How to call the functions from the winc assignment dentist without forms nor buttons: </div>
            <br/>
            {/* <CreateRandomAppointmentsWhenAppStarts/>    */}
            <CreateManualAppointmentAfterDentistAppHasStarted /> 
            {/* <DeleteAppointment/> */}
            <div>the useEffect hook inside each of the components above explains how the functions inside these components can be invoked.</div>
            
        </>

    )
}  
