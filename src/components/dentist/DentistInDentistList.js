import React from 'react';

import { useDispatch, useSelector } from "react-redux";

import { deleteDentist } from "../../redux/dentistSlice";
import {deleteAppointmentInReduxToolkit} from "../../redux/appointmentSlice";
import {deleteDayTimeClient} from "../../redux/clientDayTimeSlice";
import {deleteDayTimeDentist} from "../../redux/dentistDayTimeSlice";
import {deleteDayTimeAssistant} from "../../redux/assistantDayTimeSlice";
import {setDateAndTimeOfDeletionOfAppointmentsOfDentistInReduxToolkit, toggleHealthStatusOfDentist } from "../../redux/dentistSlice";

import {deleteAllAppointmentsOfPerson, getSystemDatePlusTime} from '../../utils';

import {Row, Column} from './DentistList.styled'
import { DentistInDentistListStyled } from './DentistInList.styled';
import { SkillsInListStyled } from './SkillsInList.styled';
import {StyledCheckbox} from '../styles/Checkbox.styled';
import { StyledFaTimes } from '../styles/FaTimes.styled'
import { FaTimes } from 'react-icons/fa'
import {StyledButtonAroundSymbol} from '../styles/ButtonAroundSymbol.styled';
import "../../App.css";

const log = console.log;

const DentistInDentistList = ({dentists, item}) => {
  const dispatch = useDispatch();
  // const [personIsSick, setPersonIsSick] = useState(false);
  // let checkBoxStatus = useRef(false);
  let healthStatus = (item.isSick === "true") ? "sick" : "healthy";
  let appointmentLastUpdatedOnDateTime = (item.appointmentsDeletedOnDateTime === "null") ? "Not happened yet." : item.appointmentsDeletedOnDateTime ;
  let appointmentsfromReduxToolkit = useSelector((state) => state.appointment);


  return (
    <Row>
        <Column>
          <DentistInDentistListStyled>
          {/* <SkillsInListStyled> */}
            {dentists.indexOf(item) + 1 }
            {/* </SkillsInListStyled> */}
          </DentistInDentistListStyled>
        </Column>
        <Column>
          <DentistInDentistListStyled>
          {/* <SkillsInListStyled> */}
            {item.dentistId}
            {/* </SkillsInListStyled> */}
          </DentistInDentistListStyled>
        </Column>
        <Column>
          <DentistInDentistListStyled>
          {/* <SkillsInListStyled> */}
            {item.firstName}
            {/* </SkillsInListStyled> */}
          </DentistInDentistListStyled>
        </Column>
        <Column>
          {/* <DentistInDentistListStyled> */}
            <SkillsInListStyled>
              {item.treatmentTypes.map(item => {
                return (<div key={item} >{item}</div>);
              })}
            </SkillsInListStyled>
          {/* </DentistInDentistListStyled> */}
        </Column>        
        <Column>
          <DentistInDentistListStyled>
          {/* <SkillsInListStyled> */}
            {item.skillLevel}
            {/* </SkillsInListStyled> */}
            {/* <StyledFaTimes>
              <FaTimes onClick={() => dispatch(deleteAssistant(item.assistantId))} />
            </StyledFaTimes> */}
            </DentistInDentistListStyled>
        </Column>
        <Column>
          <DentistInDentistListStyled>
          {/* <SkillsInListStyled> */}
            {healthStatus}
            {/* </SkillsInListStyled> */}
          </DentistInDentistListStyled>
        </Column>
        <Column>
          <DentistInDentistListStyled>
            <div>
            {/* <SkillsInListStyled> */}
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
                  dispatch(toggleHealthStatusOfDentist({dentistId: item.dentistId, isSick: e.target.checked ? "true": "false"}))
                  console.log(`end of the event: ${e.target.checked}`)
                  }
                }
              />
              {/* </SkillsInListStyled> */}
            </div>

              {/* use case: delete all appointments of a client. pitfall: do not use this code for dentist, assistant, nor appointment !!  */}
              {/* <p>set To Sick, so all apointments will be deleted of client</p>
              {item.skillLevel} 
              <StyledFaTimes>
                <FaTimes onClick={() => dispatch(deleteAssistant(item.assistantId))} />
              </StyledFaTimes> */}

            </DentistInDentistListStyled>  
        </Column>

        <Column>
          <DentistInDentistListStyled>
            {appointmentLastUpdatedOnDateTime}
          </DentistInDentistListStyled>
        </Column>
        <Column>
          <DentistInDentistListStyled>
              {/* use case: delete all appointments of a client. pitfall: do not use this code for dentist, assistant, nor appointment !!   */}
              <StyledButtonAroundSymbol>
                <StyledFaTimes>
                  {/* <FaTimes onClick={() => deleteAllAppointmentsOfClient(item.clientId)} /> */}
                  <FaTimes 
                    onClick={() => {
                      deleteAllAppointmentsOfPerson("dentistId", item.dentistId, appointmentsfromReduxToolkit, deleteAppointmentInReduxToolkit,   deleteDayTimeClient, 
                          deleteDayTimeDentist, deleteDayTimeAssistant,  dispatch);
                      let systemDateTime = getSystemDatePlusTime();
                      let dentistId = item.dentistId;
                      dispatch(setDateAndTimeOfDeletionOfAppointmentsOfDentistInReduxToolkit({dentistId, systemDateTime}));
                    }} 
                  />
                </StyledFaTimes>
              </StyledButtonAroundSymbol>
            </DentistInDentistListStyled>
        </Column>
        <Column>
          <DentistInDentistListStyled>
              {/* use case: delete all appointments of a client. pitfall: do not use this code for dentist, assistant, nor appointment !!   */}
              <StyledButtonAroundSymbol>
                <StyledFaTimes>
                  <FaTimes 
                      onClick={() => {
                        deleteAllAppointmentsOfPerson("dentistId", item.dentistId, appointmentsfromReduxToolkit, deleteAppointmentInReduxToolkit, deleteDayTimeClient, 
                          deleteDayTimeDentist, deleteDayTimeAssistant,  dispatch);   
                        let dentistId = item.dentistId;                     
                        dispatch(deleteDentist({dentistId}))
                      }}                         
                    />                
                </StyledFaTimes>
              </StyledButtonAroundSymbol>
            </DentistInDentistListStyled>
        </Column>



        

    </Row>
  )
}

export default DentistInDentistList