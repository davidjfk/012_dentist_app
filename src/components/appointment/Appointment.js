import React from "react";
import AppointmentAdd from './AppointmentAdd.js';
import AppointmentUpdate from './AppointmentUpdate';
import AppointmentList from './AppointmentList.js';
import { useSelector } from "react-redux"; 

const log = console.log;

function Appointment() {
  // log(`comp Appointment: start`)
  const { isNowUpdatingAppointment } = useSelector((state) => state.updateAppointment);
  // log(isNowUpdatingAppointment);
  return (
    <>
    
      {/* <AppointmentAdd /> */}
      {isNowUpdatingAppointment ? 
          <>
            {/* <AppointmentAdd />  */}
            <AppointmentUpdate/>
            <AppointmentList/> 
        </>
        :
        <>
          <AppointmentAdd /> 
          {/* <AppointmentUpdate/> */}
          <AppointmentList/> 
        </>
      } 
      
    </>
  );
}
export default Appointment;