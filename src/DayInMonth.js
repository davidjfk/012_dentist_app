import React from "react";
import {AppointmentInMonthDay} from "./AppointmentInMonthDay";


export const DayInMonth = ({ appointments }) => {
  const appointmentsJSX = appointments
    .sort((appointment1, appointment2) => appointment2.time - appointment1.time).reverse()  // works
    .map(({ time, day, client, dentistId, assistantId }, index) => (
    <AppointmentInMonthDay  
      day={day} 
      time={time}  
      client={client} 
      dentistId={dentistId} 
      assistantId={assistantId}   
      key={index} />
  ));
  // you are mapping all appointments on 1 day.

  return(
    // <div className="day" style={{backgroundColor : dentistIsSick ? 'red' : 'lightyellow'}}  >{appointmentsJSX}</div>
    // <div className="day" style={{backgroundColor : 'red' }}  >{appointmentsJSX}</div> // works

    <div className="day" >{appointmentsJSX}</div>
  );
  
};


