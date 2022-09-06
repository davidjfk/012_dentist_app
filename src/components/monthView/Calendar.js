import React from "react";
import { useSelector } from "react-redux"; 
import AppointmentUpdate from '../appointment/AppointmentUpdate';
import {DayInMonth} from "./DayInMonth";

import {CalendarMonthStyled, ColorLegendaStyled, HeaderInMonthStyled, MonthViewStyled, OrangeStyled, PurpleStyled, RedStyled,  TableInMonthStyled} from './MonthView.styled';
// import "./Calendar.css";

const log = console.log;

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
  const { isNowUpdatingAppointment } = useSelector((state) => state.updateAppointment);
  // log(appointments)

  const appointmentsByDay = divideByDay(appointments);
  
  // log(`output of fn appointmentsByDay: `)
  // log(appointmentsByDay)

  // pitfall: days have not been sorted yet !! 

  /* appointmentsByDay is an obj with each key signifiying a working day in next month (e.g. day 2) 
    number and its corresponding value being an array with appointments on that day.
    The keys are sorted ascending from 1 to 26 (the weekend days do not have a nr)
{
  1: [appointment 1, appointment 2, etc.],
  2: [appointment 1, appointment 2, etc.],
      (...)
  20: [appointment 1, appointment 2, etc.]
}

  */


let daysInMonthJSXUnsorted = Object.entries(appointmentsByDay)
// log(`daysInMonthJSX Unsorted:`)
// log(daysInMonthJSXUnsorted)


// log(`appointments per day sorted, with day nr::`)
let daysInMonthJSXSorted = [...daysInMonthJSXUnsorted]
   .sort((daysInMonthJSXsorted1, daysInMonthJSXsorted2) => daysInMonthJSXsorted2[0] - daysInMonthJSXsorted1[0]).reverse()
// log(daysInMonthJSXSorted)

/*
  data structure:
  Array(20)
0: (2) ['01', Array(10)]   --> '01' is the dayNr
1: (2) ['02', Array(11)]
2: (2) ['03', Array(5)]
3: (2) ['04', Array(8)]
4: (2) ['05', Array(4)]
5: (2) ['08', Array(10)]
6: (2) ['09', Array(5)]
7: (2) ['10', Array(6)]
8: (2) ['11', Array(10)]
9: (2) ['12', Array(7)]
10: (2) ['15', Array(9)]
11: (2) ['16', Array(9)]
12: (2) ['17', Array(8)]
13: (2) ['18', Array(5)]
14: (2) ['19', Array(7)]
15: (2) ['22', Array(5)]
16: (2) ['23', Array(6)]
17: (2) ['24', Array(8)]
18: (2) ['25', Array(8)]
19: (2) ['26', Array(9)]

*/

// log(`appointments per day sorted, but without day nr:`)
let daysInMonthJSXSortedWithoutDayNr = daysInMonthJSXSorted.map(element => element[1])  // status: variable not being used at the moment.

   /*
    structure of the data at this point:
    Array(20)
    0: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]          --> no dayNr in the array.
    1: (11) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    2: (5) [{…}, {…}, {…}, {…}, {…}]
    3: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    4: (4) [{…}, {…}, {…}, {…}]
    5: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    6: (5) [{…}, {…}, {…}, {…}, {…}]
    7: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
    8: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    9: (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
    10: (9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    11: (9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    12: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    13: (5) [{…}, {…}, {…}, {…}, {…}]
    14: (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
    15: (5) [{…}, {…}, {…}, {…}, {…}]
    16: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
    17: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    18: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    19: (9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
   */

  let daysInMonthJSX = Object.values(daysInMonthJSXSorted)
    // .sort((appointmentsByDay1, appointmentsByDay2) => appointmentsByDay2.day - appointmentsByDay1.day).reverse()
    .map((appointmentsInDay, index) => (
  
    /*
      2do: result is already an array, so skip Object.values 
      note-to-self: for each day in the month there is a separate array. Each appointment is an object inside a "day-array".
    */
    /* 
      about: " .map((appointmentsInDay, day, index) => ( "
      in a vanilla-js map fn, index is the second argument. So I skip day={day}.
      Furthermore, 'day' does not have access to the  scope of  divideByDay above. So I skip day={day} 
    */ 
  
      // day={appointmentsInDay[index].day} 
      
    <DayInMonth appointments={appointmentsInDay[1]} dayNrInMonth={appointmentsInDay[0]} key={index}  />
    
  ));


  // you are mapping all days of the month.
  return (
    <>
        {isNowUpdatingAppointment ? 

        <>
          <AppointmentUpdate/>
          <ColorLegendaStyled>
            <OrangeStyled>orange = assistant is ill</OrangeStyled>  
            <PurpleStyled className="purple">purple = client is ill</PurpleStyled>  
            <RedStyled className="red">red = dentist is ill</RedStyled>  
          </ColorLegendaStyled>
          <MonthViewStyled>
            <HeaderInMonthStyled>
              <div>Monday</div>
              <div>Tuesday</div>
              <div>Wednesday</div>
              <div>Thursday</div>
              <div>Friday</div>
            </HeaderInMonthStyled>
            { daysInMonthJSX.length !== 0 ? <TableInMonthStyled>{daysInMonthJSX}</TableInMonthStyled> : <>No appointments upcoming month.</>}
            {/* <div className="table">{daysInMonthJSX}</div> */}
            {/* <div>{appointmentsInDay[0]}</div> */}
          </MonthViewStyled>
        </>
        :
        <>
          <ColorLegendaStyled>
            <OrangeStyled>orange = assistant is ill</OrangeStyled>  
            <PurpleStyled className="purple">purple = client is ill</PurpleStyled>  
            <RedStyled className="red">red = dentist is ill</RedStyled>  
          </ColorLegendaStyled>
          <MonthViewStyled>
            <HeaderInMonthStyled>
              <div>Monday</div>
              <div>Tuesday</div>
              <div>Wednesday</div>
              <div>Thursday</div>
              <div>Friday</div>
            </HeaderInMonthStyled>
            { daysInMonthJSX.length !== 0 ? <TableInMonthStyled>{daysInMonthJSX}</TableInMonthStyled> : <>No appointments upcoming month.</>}
            {/* <div className="table">{daysInMonthJSX}</div> */}
            {/* <div>{appointmentsInDay[0]}</div> */}
          </MonthViewStyled>
            
        </>
        } 
        
    </>
  )
};
