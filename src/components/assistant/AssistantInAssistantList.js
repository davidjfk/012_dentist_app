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
import "../../App.css";

const log = console.log;

const AssistantInAssistantList = ({assistants, item, index}) => {
  const dispatch = useDispatch();
  // const [personIsSick, setPersonIsSick] = useState(false);
  // let checkBoxStatus = useRef(false);
  let healthStatus = (item.isSick === "true") ? "sick" : "healthy";
  let appointmentLastUpdatedOnDateTime = (item.appointmentsDeletedOnDateTime === "null") ? "Not happened yet." : item.appointmentsDeletedOnDateTime ;
  let appointmentsfromReduxToolkit = useSelector((state) => state.appointment.appointments);

  return (
    <Row>
        <Column>
          <AssistantInAssistantListStyled>
            {/* {assistants.indexOf(item) + 1 } */}
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
            {/* <StyledFaTimes>
              <FaTimes onClick={() => dispatch(deleteAssistant(item.assistantId))} />
            </StyledFaTimes> */}
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
                  note to self: because of component AssistantAdd, the initial state of this checkbox -- this checkbox belongs to a just-added-appointment! --  
                  resides in Redux-toolkit, just like the other values of an appoinment, that are all shown here in component AssistantInAssistantList as props. 
                  So do not put this state inside e.g. a useState nor useRef inside this component AssistantInAssistantList itself.
                */
                // checked={personIsSick}          
                // checked={checkBoxStatus.current}               
                onChange={(e) => {
                  // setPersonIsSick(e.target.checked)
                  // checkBoxStatus.current = e.target.checked
                  console.log(`in the event: ${e.target.checked}`)
                  dispatch(toggleHealthStatusOfAssistant({assistantId: item.assistantId, isSick: e.target.checked ? "true": "false"}))
                  console.log(`end of the event: ${e.target.checked}`)
                  }
                }
              />
            </div>

              {/* use case: delete all appointments of a client. pitfall: do not use this code for dentist, assistant, nor appointment !!  */}
              {/* <p>set To Sick, so all apointments will be deleted of client</p>
              {item.skillLevel} 
              <StyledFaTimes>
                <FaTimes onClick={() => dispatch(deleteAssistant(item.assistantId))} />
              </StyledFaTimes> */}

            </AssistantInAssistantListStyled>
        </Column>




        <Column>
          <AssistantInAssistantListStyled>
            {appointmentLastUpdatedOnDateTime}
          </AssistantInAssistantListStyled>
        </Column>
        <Column>
          <AssistantInAssistantListStyled>
              {/* use case: delete all appointments of a client. pitfall: do not use this code for dentist, assistant, nor appointment !!   */}
              <StyledButtonAroundSymbol disabled={true}>
                <StyledFaTimes>
                  {/* <FaTimes onClick={() => deleteAllAppointmentsOfClient(item.clientId)} /> */}
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
              {/* use case: delete all appointments of a client. pitfall: do not use this code for dentist, assistant, nor appointment !!   */}
              <StyledButtonAroundSymbol >      
                <StyledFaTimes>
                    <FaTimes 
                      onClick={() => {
                        deleteAllAppointmentsOfPerson("assistantid", item.assistantId, appointmentsfromReduxToolkit, deleteAppointmentInReduxToolkit, deleteDayTimeClient, 
                          deleteDayTimeDentist, deleteDayTimeAssistant,  dispatch);   
                        let assistantId = item.assistantId;                     
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