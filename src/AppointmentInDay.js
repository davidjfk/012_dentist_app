import React from "react";
import { useSelector } from "react-redux";
import { selectObjectsByArrayObjectKey } from "./utils";
const log = console.log;

const format_time = time => (time < 10 ? `${time}:00u` : `${time}:00u`);





export const AppointmentInDay = ({ time, day, client, dentist, assistant, dentistId, assistantId, treatmentType }) => {
  

 

  // let dentistsFromReduxToolkit  = useSelector((state) => state.dentist);
  // console.log(dentistId) 
  // let dentistIsSick;
  
  // // check if dentist is  ill:
  // console.log(`dentists from redux toolkit:`)
  // log(dentistsFromReduxToolkit.dentists)
  // let getDentist = dentist => dentist.dentistId === dentistId
  // let dentistFromreduxToolkit = selectObjectsByArrayObjectKey(dentistsFromReduxToolkit.dentists, getDentist)
  // dentistIsSick = dentistFromreduxToolkit[0].isSick;
  // dentistIsSick = (dentistIsSick === "true" || dentistIsSick === true);



  
  let dentistsFromReduxToolkit  = useSelector((state) => state.dentist);
  let assistantsFromReduxToolkit  = useSelector((state) => state.assistant);
  // console.log(dentistId) 
  // console.log(assistantId) 
  let dentistIsSick;
  let assistantIsSick;
  let colorToIndicateSickness;
  
  // check if assistant is  ill:
  // console.log(`assistants from redux toolkit:`)
  // log(dentistsFromReduxToolkit.dentists)
  let getAssistant = assistant => assistant.assistantId === assistantId
  let assistantFromreduxToolkit = selectObjectsByArrayObjectKey(assistantsFromReduxToolkit.assistants, getAssistant)
  assistantIsSick = assistantFromreduxToolkit[0].isSick;
  assistantIsSick = (assistantIsSick === "true" || assistantIsSick === true);


  // check if dentist is  ill:
  // console.log(`dentists from redux toolkit:`)
  // log(dentistsFromReduxToolkit.dentists)
  let getDentist = dentist => dentist.dentistId === dentistId
  let dentistFromreduxToolkit = selectObjectsByArrayObjectKey(dentistsFromReduxToolkit.dentists, getDentist)
  dentistIsSick = dentistFromreduxToolkit[0].isSick;
  dentistIsSick = (dentistIsSick === "true" || dentistIsSick === true);


  assistantIsSick && (colorToIndicateSickness = "linear-gradient(45deg, #ffa500 50%, #ffa500 50%, #ffa500 100%)");
  dentistIsSick && (colorToIndicateSickness = "linear-gradient(45deg, #ff0000 50%, #ff0000 50%, #ff0000 100%)");
  (assistantIsSick && dentistIsSick) && (colorToIndicateSickness = "linear-gradient(45deg, #ff0000 25%, #ffa500 25%, #ffa500 50%, #ff0000 50%, #ff0000 75%, #ffa500 75%, #ffa500 100%)");

  return(
  <li className="appointment" style={{backgroundImage : colorToIndicateSickness}}>
    <div className="time">{format_time(time)}</div>
    <div className="dayAsNumber">Day: {day}</div>
    <div className="client">Client: {client}</div>
    <div className="treatmentType">{treatmentType}</div>
    <div className="dentist">Dentist: {dentist}</div>
  
    <div className="assistant">Assistant: {assistant}</div>

  </li>
  )
};

