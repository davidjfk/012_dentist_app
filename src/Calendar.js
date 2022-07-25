import React from "react";
import "./Calendar.css";
import {DayInMonth} from "./DayInMonth";

const divideByDay = appointments => {
  // console.log('hier')
  // console.log(appointments)
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

export const Calendar = ( {appointments} ) => {

  // let {appointments} = foo;
  // console.log(appointments)
  // console.log(typeof(appointments[0].time))
  // console.log(appointments[0].time)
  const appointmentsByDay = divideByDay(appointments.appointments);


  
  /* appointmentsByDay is an obj with each key signifiying a day 
    number and its corresponding value being an array with appointments on that day.
{
  1: [appointment 1, appointment 2, etc.],
  2: [appointment 1, appointment 2, etc.],
      (...)
  20: [appointment 1, appointment 2, etc.]
}

  */


const daysInMonthJSXsorted = Object.entries(appointmentsByDay)
  //  

// console.log(daysInMonthJSXsorted[0][0])
  // .sort((appointmentsByDay1, appointmentsByDay2) => Object.keys(appointmentsByDay2) -Object.keys(appointmentsByDay1)) //.reverse()

let sortedStuff = (daysInMonthJSXsorted)
   .sort((daysInMonthJSXsorted1, daysInMonthJSXsorted2) => daysInMonthJSXsorted2[0] - daysInMonthJSXsorted1[0]).reverse()



   console.log(sortedStuff)
   console.log(sortedStuff[1][1])

   let result = sortedStuff.map(element => element[1])
   
   console.log(result)

   /*
    structure of the data at this point:
    (20) [Array(9), Array(8), Array(10), Array(8), Array(7), 
      Array(7), Array(10), Array(11), Array(8), Array(5), Array(10),
      Array(8), Array(3), Array(8), Array(6), Array(5), Array(5), 
      Array(8), Array(6), Array(8)]
    0: (9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    1: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    (...)
    19: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
   */

  const daysInMonthJSX = Object.values(result)
    // .sort((appointmentsByDay1, appointmentsByDay2) => appointmentsByDay2.day - appointmentsByDay1.day).reverse()
    .map((appointmentsInDay, index) => (

    /*
      2do: result is already an array, so skip Object.values 
      note-to-self: for each day in the month there is a separate array. Each appointment is an objecct inside a "day-array".
    */
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
