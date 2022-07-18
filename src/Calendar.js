import React from "react";
import "./Calendar.css";
import {DayInMonth} from "./DayInMonth";

const divideByDay = appointments => {
  const appointmentsByDay = {};
  appointments.forEach(appointment => {
    const day = appointment.day;
    if (!appointmentsByDay.hasOwnProperty(day)) {
      appointmentsByDay[day] = []; 
    }
    appointmentsByDay[day].push(appointment);
  });
  return appointmentsByDay;
};

export const Calendar = ({ appointments }) => {
  const appointmentsByDay = divideByDay(appointments);
  /* appointmentsByDay is an obj with each key signifiying a day 
    number and its corresponding value being an array with appointments on that day.
{
  1: [appointment 1, appointment 2, etc.],
  2: [appointment 1, appointment 2, etc.],
      (...)
  20: [appointment 1, appointment 2, etc.]
}

  */

  const daysInMonthJSX = Object.values(
    appointmentsByDay
  ).map((appointmentsInDay, index) => (
    /* 
      about: " .map((appointmentsInDay, day, index) => ( "
      in a vanilla-js map fn, index is the second argument. So I skip day={day}.
      Furthermore, 'day' does not have access to the  scope of  divideByDay above. So I skip day={day} 

    */ 

    <DayInMonth appointments={appointmentsInDay} key={index} />
  ));
  // you are mapping all days of the month.
  return (
    <div className="calendarview">
      <div className="header">
        <div>Maandag</div>
        <div>Dinsdag</div>
        <div>Woensdag</div>
        <div>Donderdag</div>
        <div>Vrijdag</div>
      </div>
      <div className="table">{daysInMonthJSX}</div>
    </div>
  );
};
