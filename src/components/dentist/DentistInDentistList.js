import React from 'react';
import { useState, useRef } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteAssistant } from "../../redux/assistantSlice";
import { toggleHealthStatusOfDentist } from "../../redux/dentistSlice";
import {Row, Column} from './DentistList.styled'
import { DentistInDentistListStyled } from './DentistInList.styled';
import { SkillsInListStyled } from './SkillsInList.styled';
import {StyledCheckbox} from '../styles/Checkbox.styled';
import { StyledFaTimes } from '../styles/FaTimes.styled'
import { FaTimes } from 'react-icons/fa'
const log = console.log;

const DentistInDentistList = ({item}) => {
  const dispatch = useDispatch();
  // const [personIsSick, setPersonIsSick] = useState(false);
  // let checkBoxStatus = useRef(false);

  let healthStatus = (item.isSick === "true") ? "sick" : "healthy";
  return (
    <Row>
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
                return (<div key={item.index} >{item}</div>);
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
    </Row>
  )
}

export default DentistInDentistList