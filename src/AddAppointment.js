import React from "react";
import "./App.css";



import InitalSetupForMakingAppointments from "./InitialSetupForMakingAppointments";
import CreateRandomAppointmentsWhenAppStarts from "./CreateRandomAppointmentsWhenAppStarts";
import CreateManualAppointmentAfterDentistAppHasStarted from "./CreateManualAppointmentAfterDentistAppHasStarted";

export default ({appointments}) =>  {
    // console.log('jojo')
    return(
        // <div>Home!</div>
        <>
            <div>bla</div>
            {/* <CreateManualAppointmentAfterDentistAppHasStarted/> */}
            {/* <CreateRandomAppointmentsWhenAppStarts/>    */}
            <CreateManualAppointmentAfterDentistAppHasStarted />
        </>

    )
}  
