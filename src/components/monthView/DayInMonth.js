import React from "react";
import { DayNrInMonth } from "./DayNrInMonth";
import {AppointmentInMonthDay} from "./AppointmentInMonthDay";

import {log} from "../../utils";

// import "./Calendar.css";
import {DayInMonthStyled} from './DayInMonth.styled';

// className="day" in calendar.css --> is working. 

export const DayInMonth = ({ appointments , dayNrInMonth}) => {

  let appointmentsJSX = appointments
  .sort((appointment1, appointment2) => appointment2.time - appointment1.time).reverse()  // works
  .map(({ time, day, client, clientId, dentistId, assistantId,  }, index) => (
    // React throws error, because each child in a list should have a unique "key" prop. 2do: analyse this.
  
  
  <AppointmentInMonthDay  
    day={day} 
    time={time}  
    client={client} 
    clientId={clientId}
    dentistId={dentistId} 
    assistantId={assistantId}   
    key={index} />
    
  ));
  

  appointmentsJSX.splice(0,0, <DayNrInMonth dayNrInMonth={dayNrInMonth} key={dayNrInMonth }/>)
  // you are mapping all appointments on 1 day.
      
  return(
    // <div className="day" style={{backgroundColor : dentistIsSick ? 'red' : 'lightyellow'}}  >{appointmentsJSX}</div>
    // <div className="day" style={{backgroundColor : 'red' }}  >{appointmentsJSX}</div> // works
    <DayInMonthStyled>
      {appointmentsJSX}  
    </DayInMonthStyled>
  );
  
};


