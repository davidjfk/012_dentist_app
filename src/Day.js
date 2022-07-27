import React from "react";
import "./Day.css";
import {AppointmentInDay} from "./AppointmentInDay";
// import { useSelector } from "react-redux"; 

export const Day = ({appointments} ) => {
  
  // let appointmentsNew = useSelector((state) => state.appointment);
  // {console.log(typeof(appointmentsNew))}
  // appointments = appointments.filter(app => app.day === 02)
  // console.log(appointments)

  const appointmentsJSX = appointments
    .sort((appointment1, appointment2) => appointment2.time - appointment1.time).reverse()
    .map(
      ({ time, day, client, dentist, assistant, dentistId, assistantId }, index) => (
        <AppointmentInDay
          time={time}
          day={day}
          client={client}
          dentist={dentist}
          assistant={assistant}
          dentistId={dentistId} 
          assistantId={assistantId}   
          key={index}
        /> 
      )
    );
  return <ul className="dayview">{appointmentsJSX}</ul>;
}; 
 