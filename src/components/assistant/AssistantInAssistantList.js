import React from 'react';

import { useDispatch, useSelector } from "react-redux";

import { deleteAssistant } from "../../redux/assistantSlice";
import {deleteAppointmentInReduxToolkit} from "../../redux/appointmentSlice";
import {deleteDayTimeClient} from "../../redux/clientDayTimeSlice";
import {deleteDayTimeDentist} from "../../redux/dentistDayTimeSlice";
import {deleteDayTimeAssistant} from "../../redux/assistantDayTimeSlice";
import {setDateAndTimeOfDeletionOfAppointmentsOfAssistantInReduxToolkit, toggleHealthStatusOfAssistant } from "../../redux/assistantSlice";

import {deleteAllAppointmentsOfPerson, getSystemDatePlusTime} from '../../utils';

import {Row, Column} from './AssistantList.styled'
import { AssistantInAssistantListStyled } from './AssistantInList.styled';
import {StyledCheckbox} from '../styles/Checkbox.styled';
import { StyledFaTimes } from '../styles/FaTimes.styled'
import { FaTimes } from 'react-icons/fa';
import {StyledButtonAroundSymbol} from '../styles/ButtonAroundSymbol.styled';


const AssistantInAssistantList = ({item, index}) => {
  const dispatch = useDispatch();

  let healthStatus = (item.isSick === "true") ? "sick" : "healthy";
  let appointmentLastUpdatedOnDateTime = (item.appointmentsDeletedOnDateTime === "null") ? "Not happened yet." : item.appointmentsDeletedOnDateTime ;
  let appointmentsfromReduxToolkit = useSelector((state) => state.appointment.appointments);

  return (
    <Row>
        <Column>
          <AssistantInAssistantListStyled>
            {index}
          </AssistantInAssistantListStyled>
        </Column>
        <Column>
          <AssistantInAssistantListStyled>
            {item.assistantId}
          </AssistantInAssistantListStyled>
        </Column>
        <Column>
          <AssistantInAssistantListStyled>
            {item.firstName}
          </AssistantInAssistantListStyled>
        </Column>
        <Column>
          <AssistantInAssistantListStyled>
            {item.skillLevel}
            </AssistantInAssistantListStyled>
        </Column>
        <Column>
          <AssistantInAssistantListStyled>
            {healthStatus}
          </AssistantInAssistantListStyled>
        </Column>
        <Column>
          <AssistantInAssistantListStyled>
            <div>
              <StyledCheckbox
                type="checkbox"
                checked={((item.isSick === "true" ? true: false))}     
                /*
                  note to self: 
                  This checkbox belongs to a just-added-appointment by component AssistantAdd. 
                  So the initial state of this checkbox must reside in Redux-toolkit, just like the other values of an appoinment, that are all shown here in component AssistantInAssistantList as props. 
                  So do not try to maintain the checkbox state inside e.g. a useState nor useRef inside this component AssistantInAssistantList itself.
                */          
                onChange={(e) => {
                  dispatch(toggleHealthStatusOfAssistant({assistantId: item.assistantId, isSick: e.target.checked ? "true": "false"}))
                  }
                }
              />
            </div>

            </AssistantInAssistantListStyled>
        </Column>
        <Column>
          <AssistantInAssistantListStyled>
            {appointmentLastUpdatedOnDateTime}
          </AssistantInAssistantListStyled>
        </Column>
        <Column>
          <AssistantInAssistantListStyled>
              <StyledButtonAroundSymbol>
                <StyledFaTimes>
                  <FaTimes 
                    onClick={() => {
                      deleteAllAppointmentsOfPerson("assistantId", item.assistantId, appointmentsfromReduxToolkit, deleteAppointmentInReduxToolkit,   deleteDayTimeClient, 
                          deleteDayTimeDentist, deleteDayTimeAssistant,  dispatch);
                      let systemDateTime = getSystemDatePlusTime();
                      let assistantId = item.assistantId;
                      dispatch(setDateAndTimeOfDeletionOfAppointmentsOfAssistantInReduxToolkit({assistantId, systemDateTime}));
                    }} 
                  />
                </StyledFaTimes>
              </StyledButtonAroundSymbol>
            </AssistantInAssistantListStyled>
        </Column>
        <Column>
          <AssistantInAssistantListStyled>
              <StyledButtonAroundSymbol >      
                <StyledFaTimes>
                    <FaTimes 
                      onClick={() => {
                        deleteAllAppointmentsOfPerson("assistantid", item.assistantId, appointmentsfromReduxToolkit, deleteAppointmentInReduxToolkit, deleteDayTimeClient, 
                          deleteDayTimeDentist, deleteDayTimeAssistant,  dispatch);   
                        let assistantId = item.assistantId; 
                        console.log(`bye-bye assistant ${assistantId}, zwaai-zwaai.`);                      
                        dispatch(deleteAssistant({assistantId}))
                      }}  
                      />                                     
                </StyledFaTimes>       
              </StyledButtonAroundSymbol>
            </AssistantInAssistantListStyled>
        </Column>
    </Row>
  )
}

export default AssistantInAssistantList