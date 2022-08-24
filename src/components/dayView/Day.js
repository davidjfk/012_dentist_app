import React from "react";
import "./Day.css";
import {AppointmentInDay} from "./AppointmentInDay";

const log = console.log;

export const Day = ({appointments} ) => {
  const appointmentsJSX = appointments
    .sort((appointment1, appointment2) => appointment2.time - appointment1.time).reverse()
    .map(
      ({ time, day, client, dentist, assistant, clientId, dentistId, assistantId, treatmentType }, index) => (
        <AppointmentInDay
          time={time}
          day={day}
          client={client}
          dentist={dentist}
          assistant={assistant}
          clientId={clientId}
          dentistId={dentistId} 
          assistantId={assistantId} 
          treatmentType={treatmentType}  
          key={index}
        /> 
      )
    );
  return (
    <ul className="dayview">{appointmentsJSX}</ul>
    );
}; 
 