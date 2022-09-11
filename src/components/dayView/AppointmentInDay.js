import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {deleteAppointmentInReduxToolkit} from "../../redux/appointmentSlice";
import {deleteDayTimeClient} from "../../redux/clientDayTimeSlice";
import {deleteDayTimeDentist} from "../../redux/dentistDayTimeSlice";
import {deleteDayTimeAssistant} from "../../redux/assistantDayTimeSlice";
import {disableUiControlsDuringAppointmentUpdate, saveAppointmentToReduxToolkit, showComponentUpdateAppointmentReduxToolkit} from '../../redux/updateAppointmentSlice';

import {deleteDentalAppointment, formatTime, selectObjectsByArrayObjectKey, updateAppointment_Phase1of2_DisplayComponentUpdateAppointment } from "../../utils";

import {AppointmentInDayStyled, AssistantInDayViewStyled, ClientInDayViewStyled, DayNrInDayViewStyled, DentistInDayViewStyled, TimeInDayViewStyled, TreatmentTypeStyled } from "./DayView.styled";
import {StyledButtonInsideCalendarOrDayView} from '../styles/ButtonInsideCalendarOrDayView';

export const AppointmentInDay = ({appointmentId, time, day, client, clientId, dentist, dentistId, assistant, assistantId, treatmentType }) => {
  let dispatch = useDispatch();
  let appointmentsfromReduxToolkit = useSelector((state) => state.appointment.appointments)
  let assistantsFromReduxToolkit  = useSelector((state) => state.assistant.assistants);
  let clientsFromReduxToolkit  = useSelector((state) => state.client.clients);
  let dentistsFromReduxToolkit  = useSelector((state) => state.dentist.dentists);

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
  <AppointmentInDayStyled 
    style={{backgroundImage : colorToIndicateSickness}}>
    <TimeInDayViewStyled>{formatTime(time)}</TimeInDayViewStyled>
    <DayNrInDayViewStyled>Day: {day}</DayNrInDayViewStyled>
    <ClientInDayViewStyled>Client: {client}</ClientInDayViewStyled>
    <TreatmentTypeStyled>{treatmentType}</TreatmentTypeStyled>
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
    <DentistInDayViewStyled >Dentist: {dentist}</DentistInDayViewStyled>
    <AssistantInDayViewStyled>Assistant: {assistant}</AssistantInDayViewStyled>
  </AppointmentInDayStyled>
  )
};

