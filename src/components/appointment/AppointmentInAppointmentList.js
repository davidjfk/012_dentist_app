import React from 'react';
import { useState} from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {deleteAppointmentInReduxToolkit} from "../../redux/appointmentSlice";
import {deleteDayTimeClient} from "../../redux/clientDayTimeSlice";
import {deleteDayTimeDentist} from "../../redux/dentistDayTimeSlice";
import {deleteDayTimeAssistant} from "../../redux/assistantDayTimeSlice";
import {saveAppointmentToReduxToolkit, showComponentUpdateAppointmentReduxToolkit} from '../../redux/updateAppointmentSlice';

import {deleteDentalAppointment, updateAppointment_Phase1of2_DisplayComponentUpdateAppointment} from '../../utils';

import {Row, Column} from './ClientList.styled'
import { ClientInClientListStyled } from './ClientInList.styled';
import { StyledFaTimes } from '../styles/FaTimes.styled'
import { FaTimes } from 'react-icons/fa'
import {StyledButtonAroundSymbol} from '../styles/ButtonAroundSymbol.styled';
import "../../App.css";

const log = console.log;

const AppointmentInAppointmentList = ({appointments, item}) => {
  let dispatch = useDispatch();
  let appointmentsfromReduxToolkit = useSelector((state) => state.appointment)
  
  let appointmentLastUpdatedOnDateTime = (item.appointmentLastUpdatedOnDateTime === null) ? "Not happened yet." : item.appointmentLastUpdatedOnDateTime ;
  
  



  // const updateAppointment_Phase1of2_DisplayComponentUpdateAppointment = (
  //   appointment,
  //   appointmentId, 
  //   appointmentsfromReduxToolkit, 
  //   deleteAppointmentInReduxToolkit, 
  //   deleteDayTimeClient, 
  //   deleteDayTimeDentist, 
  //   deleteDayTimeAssistant, 
  //   dispatch
  // ) => {
  //   const saveDataFromAppointmentToReduxToolkitBeforeAppointmentIsDeleted = (item) => {
  //     log(`inside fn saveDataFromAppointmentToReduxToolkitBeforeAppointmentIsDeleted: `)
  //     log(item);
  //     dispatch(saveAppointmentToReduxToolkit(item));
  //   }
  //   saveDataFromAppointmentToReduxToolkitBeforeAppointmentIsDeleted(appointment);
                      
  //   deleteDentalAppointment(
  //     appointmentId, 
  //     appointmentsfromReduxToolkit, 
  //     deleteAppointmentInReduxToolkit, 
  //     deleteDayTimeClient, 
  //     deleteDayTimeDentist, 
  //     deleteDayTimeAssistant, 
  //     dispatch
  //   );
  //   const toggleTheVisibilityOfComponentUpdateAppointment = () => {
  //     dispatch(showComponentUpdateAppointment())
  //   }
  //   toggleTheVisibilityOfComponentUpdateAppointment();
  // }

  return (
    <Row>
        <Column>
          <ClientInClientListStyled>
            {appointments.indexOf(item) + 1 }
          </ClientInClientListStyled>
        </Column>
        <Column>
          <ClientInClientListStyled>
            {item.appointmentId}
          </ClientInClientListStyled>
        </Column>
        <Column>
          <ClientInClientListStyled>
            {item.dentistId}
          </ClientInClientListStyled>
        </Column>
        <Column>
          <ClientInClientListStyled>
            {item.assistantId}
          </ClientInClientListStyled>
        </Column>
        <Column>
          <ClientInClientListStyled>
            {item.appointmentPriority}
          </ClientInClientListStyled>
        </Column>
        <Column>
          <ClientInClientListStyled>
            {item.treatmentType}
          </ClientInClientListStyled>
        </Column>
        <Column>
          <ClientInClientListStyled>
            {appointmentLastUpdatedOnDateTime}
          </ClientInClientListStyled>
        </Column>
        <Column>
          <ClientInClientListStyled>
              <StyledButtonAroundSymbol>
                <StyledFaTimes>
                  <FaTimes 
                    onClick={() => {
                      updateAppointment_Phase1of2_DisplayComponentUpdateAppointment(
                        item,
                        item.appointmentId, 
                        showComponentUpdateAppointmentReduxToolkit, 
                        appointmentsfromReduxToolkit, 
                        deleteAppointmentInReduxToolkit, 
                        saveAppointmentToReduxToolkit, 
                        deleteDayTimeClient, 
                        deleteDayTimeDentist, 
                        deleteDayTimeAssistant, 
                        dispatch
                      )
                      // saveDataFromAppointmentToReduxToolkitBeforeAppointmentIsDeleted(item);
                      
                      // deleteDentalAppointment(
                      //   item.appointmentId, 
                      //   appointmentsfromReduxToolkit, 
                      //   deleteAppointmentInReduxToolkit, 
                      //   deleteDayTimeClient, 
                      //   deleteDayTimeDentist, 
                      //   deleteDayTimeAssistant, 
                      //   dispatch
                      // );
                      // toggleTheVisibilityOfComponentUpdateAppointment();
                    }} 

                  />
                </StyledFaTimes>
              </StyledButtonAroundSymbol>
            </ClientInClientListStyled>
        </Column>
        <Column>
          <ClientInClientListStyled>
              <StyledButtonAroundSymbol>
                <StyledFaTimes>
                  <FaTimes 
                      onClick={() => {
                        deleteDentalAppointment(
                          item.appointmentId, 
                          appointmentsfromReduxToolkit, 
                          deleteAppointmentInReduxToolkit, 
                          deleteDayTimeClient, 
                          deleteDayTimeDentist, 
                          deleteDayTimeAssistant,  
                          dispatch
                        );  
                      }}                         
                    />                
                </StyledFaTimes>
              </StyledButtonAroundSymbol>
            </ClientInClientListStyled>
        </Column>
    </Row>
  )
}

export default AppointmentInAppointmentList;




