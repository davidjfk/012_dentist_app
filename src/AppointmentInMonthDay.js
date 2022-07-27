import React from "react";
import { useSelector } from "react-redux";
import { dentistListSlice } from "./redux/dentistSlice";
import { selectObjectsByArrayObjectKey } from "./utils";

const log = console.log;

const format_time = time => (time < 10 ? `${time}:00u` : `${time}:00u`);

export const AppointmentInMonthDay = ({day, time, client, dentistId, assistantId }) => {
  
  let dentistsFromReduxToolkit  = useSelector((state) => state.dentist);
  console.log(dentistId) 
  let dentistIsSick;
  
  // check if dentist is  ill:
  console.log(`dentists from redux toolkit:`)
  log(dentistsFromReduxToolkit.dentists)
  let getDentist = dentist => dentist.dentistId === dentistId
  let dentistFromreduxToolkit = selectObjectsByArrayObjectKey(dentistsFromReduxToolkit.dentists, getDentist)
  dentistIsSick = dentistFromreduxToolkit[0].isSick;
  dentistIsSick = (dentistIsSick === "true" || dentistIsSick === true);


  return(
  <div className="appointment" style={{backgroundColor : dentistIsSick ? 'red' : 'lightyellow'}}  >
    <span className="dayAsNumber">{day} </span>    
    <span className="time">{format_time(time)}</span>
    <span className="client">{client} </span>
    <span className="dentist">{dentistId}</span> 
    <span className="assistant">{assistantId}</span> 
  </div>
  );
};



