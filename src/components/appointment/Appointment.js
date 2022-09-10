import React from "react";
import AppointmentAdd from './AppointmentAdd.js';
import AppointmentUpdate from './AppointmentUpdate';
import AppointmentList from './AppointmentList.js';
import { useSelector } from "react-redux"; 


function Appointment() {
  const { isNowUpdatingAppointment } = useSelector((state) => state.updateAppointment);
  return (
    <>
      {isNowUpdatingAppointment ? 
          <>
            <AppointmentUpdate/>
            <AppointmentList/> 
        </>
        :
        <>
          <AppointmentAdd /> 
          <AppointmentList/> 
        </>
      } 
      
    </>
  );
}
export default Appointment;