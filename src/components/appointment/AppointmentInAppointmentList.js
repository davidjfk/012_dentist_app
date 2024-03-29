import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import {deleteAppointmentInReduxToolkit} from "../../redux/appointmentSlice";
import {deleteDayTimeClient} from "../../redux/clientDayTimeSlice";
import {deleteDayTimeDentist} from "../../redux/dentistDayTimeSlice";
import {deleteDayTimeAssistant} from "../../redux/assistantDayTimeSlice";
import {disableUiControlsDuringAppointmentUpdate, saveAppointmentToReduxToolkit, showComponentUpdateAppointmentReduxToolkit} from '../../redux/updateAppointmentSlice';

import {deleteDentalAppointment, updateAppointment_Phase1of2_DisplayComponentUpdateAppointment} from '../../utils';

import {Row, Column} from './AppointmentList.styled'
import { AppointmentInAppointmentListStyled } from './AppointmentInAppointmentList.styled';
import { StyledFaTimes } from '../styles/FaTimes.styled'
import { FaTimes } from 'react-icons/fa';
import { GrUpdate } from "react-icons/gr";
import {StyledButtonAroundSymbol} from '../styles/ButtonAroundSymbol.styled';

const AppointmentInAppointmentList = ({item, index}) => {
  let dispatch = useDispatch();
  let appointmentsfromReduxToolkit = useSelector((state) => state.appointment.appointments);
  let appointmentLastUpdatedOnDateTime = (item.appointmentLastUpdatedOnDateTime === null) ? "Not happened yet." : item.appointmentLastUpdatedOnDateTime ;

  return (
    <Row>
        <Column>
          <AppointmentInAppointmentListStyled>
            {index}
          </AppointmentInAppointmentListStyled>
        </Column>
        <Column>
          <AppointmentInAppointmentListStyled>
            {item.appointmentId}
          </AppointmentInAppointmentListStyled>
        </Column>
        <Column>
          <AppointmentInAppointmentListStyled>
            {item.dentistId}
          </AppointmentInAppointmentListStyled>
        </Column>
        <Column>
          <AppointmentInAppointmentListStyled>
            {item.assistantId}
          </AppointmentInAppointmentListStyled>
        </Column>
        <Column>
          <AppointmentInAppointmentListStyled>
            {item.appointmentPriority}
          </AppointmentInAppointmentListStyled>
        </Column>
        <Column>
          <AppointmentInAppointmentListStyled>
            {item.treatmentType}
          </AppointmentInAppointmentListStyled>
        </Column>
        <Column>
          <AppointmentInAppointmentListStyled>
            {appointmentLastUpdatedOnDateTime}
          </AppointmentInAppointmentListStyled>
        </Column>
        <Column>
          <AppointmentInAppointmentListStyled>
              <StyledButtonAroundSymbol>
                <StyledFaTimes >
                  <GrUpdate
                    onClick={() => {
                      updateAppointment_Phase1of2_DisplayComponentUpdateAppointment(
                        item,
                        item.appointmentId, 
                        showComponentUpdateAppointmentReduxToolkit, 
                        appointmentsfromReduxToolkit, 
                        deleteAppointmentInReduxToolkit, 
                        saveAppointmentToReduxToolkit, 
                        disableUiControlsDuringAppointmentUpdate,
                        deleteDayTimeClient, 
                        deleteDayTimeDentist, 
                        deleteDayTimeAssistant, 
                        dispatch
                      )
                    }} 
                  />
                </StyledFaTimes>
              </StyledButtonAroundSymbol>
            </AppointmentInAppointmentListStyled>
        </Column>
        <Column>
          <AppointmentInAppointmentListStyled>
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
            </AppointmentInAppointmentListStyled>
        </Column>
    </Row>
  )
}

export default AppointmentInAppointmentList;




