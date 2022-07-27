import React from "react";
import { useSelector } from "react-redux";
import { selectObjectsByArrayObjectKey } from "./utils";
const log = console.log;

const format_time = time => (time < 10 ? `0${time}:00u` : `${time}:00u`);

export const AppointmentInDay = ({ time, day, client, dentist, assistant, dentistId, assistantId }) => {
  
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
  <li className="appointment" style={{backgroundColor : dentistIsSick ? 'red' : 'lightyellow'}}>
    <div className="time">{format_time(time)}</div>
    <div className="dayAsNumber">Day number: {day}</div>
    <div className="client">Client: {client}</div>
    <div className="dentist">Tandarts: {dentist}</div>
    <div className="assistant">Assistent: {assistant}</div>
  </li>
  )
};

