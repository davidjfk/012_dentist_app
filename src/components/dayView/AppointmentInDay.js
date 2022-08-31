import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {deleteAppointmentInReduxToolkit} from "../../redux/appointmentSlice";
import {deleteDayTimeClient} from "../../redux/clientDayTimeSlice";
import {deleteDayTimeDentist} from "../../redux/dentistDayTimeSlice";
import {deleteDayTimeAssistant} from "../../redux/assistantDayTimeSlice";
import {deleteDentalAppointment, selectObjectsByArrayObjectKey } from "../../utils";

import {StyledButtonWithWordDelete} from '../styles/ButtonWithWordDelete';
import {StyledButtonWithWordUpdate} from '../styles/ButtonWithWordUpdate';
const log = console.log;

const format_time = time => (time < 10 ? `${time}:00u` : `${time}:00u`);



export const AppointmentInDay = ({appointmentId, time, day, client, clientId, dentist, dentistId, assistant, assistantId, treatmentType }) => {
  
  let dispatch = useDispatch();
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

  let appointmentsfromReduxToolkit = useSelector((state) => state.appointment)
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

  return(
  <li className="appointment" style={{backgroundImage : colorToIndicateSickness}}>
    <div className="time">{format_time(time)}</div>
    <div className="dayAsNumber">Day: {day}</div>
    <div className="client">Client: {client}</div>
    <div className="treatmentType">{treatmentType}</div>
    <StyledButtonWithWordDelete 
      onClick={() => { deleteDentalAppointment(
                          appointmentId, 
                          appointmentsfromReduxToolkit, 
                          deleteAppointmentInReduxToolkit, 
                          deleteDayTimeClient, 
                          deleteDayTimeDentist, 
                          deleteDayTimeAssistant,  
                          dispatch
                        );  
                      }}>
      delete appointment
    </StyledButtonWithWordDelete> 
    <StyledButtonWithWordUpdate>
      update appointment
    </StyledButtonWithWordUpdate>
    <div className="dentist">Dentist: {dentist}</div>
  
    <div className="assistant">Assistant: {assistant}</div>

  </li>
  )
};

