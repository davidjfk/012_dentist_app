import React from "react";
import {useDispatch, useSelector } from "react-redux";
import {deleteAppointmentInReduxToolkit} from "../../redux/appointmentSlice";
import {deleteDayTimeClient} from "../../redux/clientDayTimeSlice";
import {deleteDayTimeDentist} from "../../redux/dentistDayTimeSlice";
import {deleteDayTimeAssistant} from "../../redux/assistantDayTimeSlice";
import {disableUiControlsDuringAppointmentUpdate, saveAppointmentToReduxToolkit, showComponentUpdateAppointmentReduxToolkit} from '../../redux/updateAppointmentSlice';

import {deleteDentalAppointment, formatTime, generateAppointmentId, selectObjectsByArrayObjectKey, updateAppointment_Phase1of2_DisplayComponentUpdateAppointment } from "../../utils";

import {AppointmentInMonthDayStyled, AssistantInMonthDayAppointmentStyled, ClientInMonthDayAppointment, DentistInMonthDayAppointment, TimeInMonthViewStyled  } from './AppointmentInMonthDay.styled';
import {StyledButtonInsideCalendarOrDayView} from '../styles/ButtonInsideCalendarOrDayView';

export const AppointmentInMonthDay = ({day, time, client, clientId, dentistId, assistantId }) => {
  let dispatch = useDispatch();
  let appointmentsfromReduxToolkit = useSelector((state) => state.appointment.appointments)
  let assistantsFromReduxToolkit  = useSelector((state) => state.assistant.assistants);
  let clientsFromReduxToolkit  = useSelector((state) => state.client.clients);
  let dentistsFromReduxToolkit  = useSelector((state) => state.dentist.dentists);
  
  let appointmentId = generateAppointmentId(clientId, day, time);

  let getAppointmentObject = item => item.appointmentId === appointmentId ;
  let appointment = selectObjectsByArrayObjectKey(appointmentsfromReduxToolkit, getAppointmentObject);
  appointment = appointment[0]

  let assistantIsSick;
  let clientIsSick;
  let dentistIsSick;
  let colorToIndicateSickness;

  let getClient = client => client.clientId === clientId
  let clientFromreduxToolkit = selectObjectsByArrayObjectKey(clientsFromReduxToolkit, getClient)
  clientIsSick = clientFromreduxToolkit[0]?.isSick;
  clientIsSick = (clientIsSick === "true" || clientIsSick === true);

  let getAssistant = assistant => assistant.assistantId === assistantId
  let assistantFromreduxToolkit = selectObjectsByArrayObjectKey(assistantsFromReduxToolkit, getAssistant)
  assistantIsSick = assistantFromreduxToolkit[0]?.isSick;
  assistantIsSick = (assistantIsSick === "true" || assistantIsSick === true);

  let getDentist = dentist => dentist.dentistId === dentistId
  let dentistFromreduxToolkit = selectObjectsByArrayObjectKey(dentistsFromReduxToolkit, getDentist)
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
    <AppointmentInMonthDayStyled style={{backgroundImage : colorToIndicateSickness}}>
        <TimeInMonthViewStyled>{formatTime(time)}</TimeInMonthViewStyled>
        <StyledButtonInsideCalendarOrDayView 
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
        </StyledButtonInsideCalendarOrDayView> 
        <StyledButtonInsideCalendarOrDayView
          onClick={() => { updateAppointment_Phase1of2_DisplayComponentUpdateAppointment(
                              appointment,
                              appointmentId, 
                              showComponentUpdateAppointmentReduxToolkit, 
                              appointmentsfromReduxToolkit, 
                              deleteAppointmentInReduxToolkit, 
                              saveAppointmentToReduxToolkit,
                              disableUiControlsDuringAppointmentUpdate,
                              deleteDayTimeClient, 
                              deleteDayTimeDentist, 
                              deleteDayTimeAssistant,  
                              dispatch
                            );  
                          }}>
          update appointment
        </StyledButtonInsideCalendarOrDayView>
        <ClientInMonthDayAppointment> client: {client} </ClientInMonthDayAppointment>
        <DentistInMonthDayAppointment>dentist: {dentistId}</DentistInMonthDayAppointment> 
        <AssistantInMonthDayAppointmentStyled>assistant: {assistantId}</AssistantInMonthDayAppointmentStyled> 
      
  </AppointmentInMonthDayStyled>
  );
};



