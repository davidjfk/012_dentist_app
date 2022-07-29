import React from "react";
import "./Day.css";
import {AppointmentInDay} from "./AppointmentInDay";
// import { useSelector } from "react-redux"; 
const log = console.log;

export const Day = ({appointments} ) => {
  log(`comp Dayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy: start: `)
  log(appointments)

  // let appointmentsNew = useSelector((state) => state.appointment);
  // {console.log(typeof(appointmentsNew))}
  // appointments = appointments.filter(app => app.day === 02)
  // console.log(appointments)

  const appointmentsJSX = appointments
    .sort((appointment1, appointment2) => appointment2.time - appointment1.time).reverse()
    .map(
      ({ time, day, client, dentist, assistant, dentistId, assistantId, treatmentType }, index) => (
        <AppointmentInDay
          time={time}
          day={day}
          client={client}
          dentist={dentist}
          assistant={assistant}
          dentistId={dentistId} 
          assistantId={assistantId} 
          treatmentType={treatmentType}  
          key={index}
        /> 
      )
    );
  return <ul className="dayview">{appointmentsJSX}</ul>;
}; 
 