import React from 'react';

import { useDispatch, useSelector } from "react-redux";
import { deleteClient } from "../../redux/clientSlice";
import {deleteAppointmentInReduxToolkit} from "../../redux/appointmentSlice";
import {deleteDayTimeClient} from "../../redux/clientDayTimeSlice";
import {deleteDayTimeDentist} from "../../redux/dentistDayTimeSlice";
import {deleteDayTimeAssistant} from "../../redux/assistantDayTimeSlice";
import {setDateAndTimeOfDeletionOfAppointmentsOfClientInReduxToolkit, toggleHealthStatusOfClient } from "../../redux/clientSlice";

import {deleteAllAppointmentsOfPerson, getSystemDatePlusTime} from '../../utils';

import {Row, Column} from './ClientList.styled'
import { ClientInClientListStyled } from './ClientInList.styled';
import {StyledCheckbox} from '../styles/Checkbox.styled';
import { StyledFaTimes } from '../styles/FaTimes.styled'
import { FaTimes } from 'react-icons/fa'
import {StyledButtonAroundSymbol} from '../styles/ButtonAroundSymbol.styled';


const ClientInClientList = ({item, index}) => {
  const dispatch = useDispatch();
  let healthStatus = (item.isSick === "true") ? "sick" : "healthy";
  let appointmentLastUpdatedOnDateTime = (item.appointmentsDeletedOnDateTime === "null") ? "Not happened yet." : item.appointmentsDeletedOnDateTime ;
  let appointmentsfromReduxToolkit = useSelector((state) => state.appointment.appointments)

  return (
    <Row>
        <Column>
          <ClientInClientListStyled>
            {index}
          </ClientInClientListStyled>
        </Column>
        <Column>
          <ClientInClientListStyled>
            {item.clientId}
          </ClientInClientListStyled>
        </Column>
        <Column>
          <ClientInClientListStyled>
            {item.firstName}
          </ClientInClientListStyled>
        </Column>
        <Column>
          <ClientInClientListStyled>
            {item.paymentMethod}
          </ClientInClientListStyled>
        </Column>
        <Column>
          <ClientInClientListStyled>
            {healthStatus}
          </ClientInClientListStyled>
        </Column>
        <Column>
          <ClientInClientListStyled>
            <div>
              <StyledCheckbox
                type="checkbox"
                checked={((item.isSick === "true" ? true: false))}                
                onChange={(e) => {
                  dispatch(toggleHealthStatusOfClient({clientId: item.clientId, isSick: e.target.checked ? "true": "false"}))
                  }
                }
              />
            </div>
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
                      deleteAllAppointmentsOfPerson("clientId", item.clientId, appointmentsfromReduxToolkit, deleteAppointmentInReduxToolkit,   deleteDayTimeClient, 
                          deleteDayTimeDentist, deleteDayTimeAssistant,  dispatch);
                      let systemDateTime = getSystemDatePlusTime();
                      let clientId = item.clientId;
                      dispatch(setDateAndTimeOfDeletionOfAppointmentsOfClientInReduxToolkit({clientId, systemDateTime}));
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
                        deleteAllAppointmentsOfPerson("clientId", item.clientId, appointmentsfromReduxToolkit, deleteAppointmentInReduxToolkit, deleteDayTimeClient, 
                          deleteDayTimeDentist, deleteDayTimeAssistant,  dispatch);   
                        let clientId = item.clientId;  
                        console.log(`bye-bye client ${clientId}, zwaai-zwaai.`);                    
                        dispatch(deleteClient({clientId}))
                      }}                         
                    />                
                </StyledFaTimes>
              </StyledButtonAroundSymbol>
            </ClientInClientListStyled>
        </Column>
    </Row>
  )
}

export default ClientInClientList;




