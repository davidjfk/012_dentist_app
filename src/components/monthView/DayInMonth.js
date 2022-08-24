import React from "react";
import {AppointmentInMonthDay} from "./AppointmentInMonthDay";
import { DayNrInMonth } from "./DayNrInMonth";

const log = console.log;

export const DayInMonth = ({ appointments , dayNrInMonth}) => {
  // log(`DayInMonth: `)
  // log(appointments)
  // log(dayNrInMonth)

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
  
  //2do: switch back on.
  appointmentsJSX.splice(0,0, <DayNrInMonth dayNrInMonth={dayNrInMonth} key={dayNrInMonth }/>)



  // you are mapping all appointments on 1 day.

      
  return(
    // <div className="day" style={{backgroundColor : dentistIsSick ? 'red' : 'lightyellow'}}  >{appointmentsJSX}</div>
    // <div className="day" style={{backgroundColor : 'red' }}  >{appointmentsJSX}</div> // works
    <>
     
    <div className="day" >{appointmentsJSX} </div>
    </>
  );
  
};


