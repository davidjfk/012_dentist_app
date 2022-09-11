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

const DentistInDentistList = ({item, index}) => {
  const dispatch = useDispatch();
  let healthStatus = (item.isSick === "true") ? "sick" : "healthy";
  let appointmentLastUpdatedOnDateTime = (item.appointmentsDeletedOnDateTime === "null") ? "Not happened yet." : item.appointmentsDeletedOnDateTime ;
  let appointmentsfromReduxToolkit = useSelector((state) => state.appointment.appointments);

  return (
    <Row>
        <Column>
          <DentistInDentistListStyled>
            {index}
          </DentistInDentistListStyled>
        </Column>
        <Column>
          <DentistInDentistListStyled>
            {item.dentistId}
          </DentistInDentistListStyled>
        </Column>
        <Column>
          <DentistInDentistListStyled>
            {item.firstName}
          </DentistInDentistListStyled>
        </Column>
        <Column>
            <SkillsInListStyled>
              {item.treatmentTypes.map(item => {
                return (<div key={item} >{item}</div>);
              })}
            </SkillsInListStyled>
        </Column>        
        <Column>
          <DentistInDentistListStyled>
            {item.skillLevel}
            </DentistInDentistListStyled>
        </Column>
        <Column>
          <DentistInDentistListStyled>
            {healthStatus}
          </DentistInDentistListStyled>
        </Column>
        <Column>
          <DentistInDentistListStyled>
              <StyledCheckbox
                type="checkbox"
                checked={((item.isSick === "true" ? true: false))}                
                onChange={(e) => {
                  dispatch(toggleHealthStatusOfDentist({dentistId: item.dentistId, isSick: e.target.checked ? "true": "false"}))
                  }
                }
              />
            </DentistInDentistListStyled>  
        </Column>
        <Column>
          <DentistInDentistListStyled>
            {appointmentLastUpdatedOnDateTime}
          </DentistInDentistListStyled>
        </Column>
        <Column>
          <DentistInDentistListStyled>
              <StyledButtonAroundSymbol>
                <StyledFaTimes>
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
              <StyledButtonAroundSymbol>
                <StyledFaTimes>
                  <FaTimes 
                      onClick={() => {
                        deleteAllAppointmentsOfPerson("dentistId", item.dentistId, appointmentsfromReduxToolkit, deleteAppointmentInReduxToolkit, deleteDayTimeClient, 
                          deleteDayTimeDentist, deleteDayTimeAssistant,  dispatch);   
                        let dentistId = item.dentistId;  
                        console.log(`bye-bye dentist ${dentistId}, zwaai-zwaai.`);                   
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