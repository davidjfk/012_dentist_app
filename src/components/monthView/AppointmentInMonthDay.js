import React from "react";
import { useSelector } from "react-redux";
import { selectObjectsByArrayObjectKey } from "../../utils";

const log = console.log;

const format_time = time => (time < 10 ? `${time}:00u` : `${time}:00u`);

export const AppointmentInMonthDay = ({day, time, client, clientId, dentistId, assistantId }) => {
  
  let assistantsFromReduxToolkit  = useSelector((state) => state.assistant);
  let clientsFromReduxToolkit  = useSelector((state) => state.client);
  let dentistsFromReduxToolkit  = useSelector((state) => state.dentist);
  
  let assistantIsSick;
  let clientIsSick;
  let dentistIsSick;
  let colorToIndicateSickness;
  
  let getClient = client => client.clientId === clientId
  let clientFromreduxToolkit = selectObjectsByArrayObjectKey(clientsFromReduxToolkit.clients, getClient)
  clientIsSick = clientFromreduxToolkit[0]?.isSick;
  clientIsSick = (clientIsSick === "true" || clientIsSick === true);

  let getAssistant = assistant => assistant.assistantId === assistantId
  let assistantFromreduxToolkit = selectObjectsByArrayObjectKey(assistantsFromReduxToolkit.assistants, getAssistant)
  assistantIsSick = assistantFromreduxToolkit[0]?.isSick;
  assistantIsSick = (assistantIsSick === "true" || assistantIsSick === true);

  let getDentist = dentist => dentist.dentistId === dentistId
  let dentistFromreduxToolkit = selectObjectsByArrayObjectKey(dentistsFromReduxToolkit.dentists, getDentist)
  dentistIsSick = dentistFromreduxToolkit[0]?.isSick;
  dentistIsSick = (dentistIsSick === "true" || dentistIsSick === true);

  clientIsSick && (colorToIndicateSickness = "linear-gradient(45deg, #c632d1 50%, #c632d1 50%, #c632d1 100%)");
  assistantIsSick && (colorToIndicateSickness = "linear-gradient(45deg, #ffa500 50%, #ffa500 50%, #ffa500 100%)");
  dentistIsSick && (colorToIndicateSickness = "linear-gradient(45deg, #ff0000 50%, #ff0000 50%, #ff0000 100%)");
  
  (assistantIsSick && clientIsSick) && (colorToIndicateSickness = "linear-gradient(45deg, #ffa500 25%, #c632d1 25%, #c632d1 50%, #ffa500 50%, #ffa500 75%, #c632d1 75%, #c632d1 100%)");
  (assistantIsSick && dentistIsSick) && (colorToIndicateSickness = "linear-gradient(45deg, #ff0000 25%, #ffa500 25%, #ffa500 50%, #ff0000 50%, #ff0000 75%, #ffa500 75%, #ffa500 100%)");
  (clientIsSick && dentistIsSick) && (colorToIndicateSickness = "linear-gradient(45deg, #c632d1 25%, #ff0000 25%, #ff0000 50%, #c632d1 50%, #c632d1 75%, #ff0000 75%, #ff0000 100%)");
  
  (assistantIsSick && clientIsSick && dentistIsSick) && (colorToIndicateSickness = "linear-gradient(45deg, #ffa500 16.67%, #ff0000 16.67%, #ff0000 33.33%, #c632d1 33.33%, #c632d1 50%, #ffa500 50%, #ffa500 66.67%, #ff0000 66.67%, #ff0000 83.33%, #c632d1 83.33%, #c632d1 100%)");

  // if (assistantIsSick && dentistIsSick) {
  //   colorToIndicateSickness = "linear-gradient(45deg, #ff0000 25%, #ffa500 25%, #ffa500 50%, #ff0000 50%, #ff0000 75%, #ffa500 75%, #ffa500 100%)"
  // } else if (dentistIsSick) {
  //   colorToIndicateSickness = "linear-gradient(45deg, #ff0000 50%, #ff0000 50%, #ff0000 100%)";
  // } else if (assistantIsSick) {
  //   colorToIndicateSickness = "linear-gradient(45deg, #ffa500 50%, #ffa500 50%, #ffa500 100%)";
  // }

  return(
  <div className="appointment appointmentInMonth" style={{backgroundImage : colorToIndicateSickness}}  >
    <span>
      {/* <span className="dayAsNumber">day: {day} </span>     */}
      <span className="time">{format_time(time)}</span>
    </span>
    <span className="client"> client: {client} </span>
    <span className="dentist">dentist: {dentistId}</span> 
    <span className="assistant">assistant: {assistantId}</span> 
  </div>
  );
};



