import React from "react";

import {generateAppointmentId} from "../../utils";


import { DayNrInMonth } from "./DayNrInMonth";
import {AppointmentInMonthDay} from "./AppointmentInMonthDay";

import {DayInMonthStyled} from './DayInMonth.styled';

export const DayInMonth = ({ appointments , dayNrInMonth}) => {

  let appointmentsJSX = appointments
  .sort((appointment1, appointment2) => appointment2.time - appointment1.time).reverse()
  .map(({ time, day, client, dentist, assistant, clientId, dentistId, assistantId,  }, index) => (
  
  <AppointmentInMonthDay  
    day={day} 
    time={time}  
    client={client} 
    dentist={dentist}
    assistant={assistant}
    clientId={clientId}
    dentistId={dentistId} 
    assistantId={assistantId}   
    key={index} />
  ));
  
  appointmentsJSX.splice(0,0, <DayNrInMonth dayNrInMonth={dayNrInMonth} key={generateAppointmentId() }/>)
      
  return(
    <DayInMonthStyled>
      {appointmentsJSX}  
    </DayInMonthStyled>
  );
  
};


