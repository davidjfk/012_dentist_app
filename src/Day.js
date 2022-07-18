import React from "react";
import "./Day.css";
import AppointmentInDay from "./AppointmentInDay";

export default ({ appointments }) => {
  // {console.log(typeof(appointments[0].time))}
  const appointmentsJSX = appointments
    .sort((appointment1, appointment2) => appointment2.time - appointment1.time).reverse()
    .map(
      ({ time, day, client, dentist, assistant }, index) => (
        <AppointmentInDay
          time={time}
          day={day}
          client={client}
          dentist={dentist}
          assistant={assistant}
          key={index}
        /> 
      )
    );
  return <ul className="dayview">{appointmentsJSX}</ul>;
}; 
