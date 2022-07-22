import React from "react";
import {AppointmentInMonthDay} from "./AppointmentInMonthDay";

export const DayInMonth = ({ appointments }) => {
  
  const appointmentsJSX = appointments
    .sort((appointment1, appointment2) => appointment2.time - appointment1.time).reverse()
    .map(({ time, day, client, assistant }, index) => (
    <AppointmentInMonthDay  day={day} time={time}  client={client} assistant={assistant} key={index} />
  ));
  // you are mapping all appointments on 1 day.
  return(
    <div className="day">{appointmentsJSX}</div>
  );
  
};




