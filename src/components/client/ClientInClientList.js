import React from 'react';
import { useState, useRef } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteAssistant } from "../../redux/assistantSlice";
import { deleteClient } from "../../redux/clientSlice";
import { toggleHealthStatusOfClient } from "../../redux/clientSlice";
import {Row, Column} from './ClientList.styled'
import { ClientInClientListStyled } from './ClientInList.styled';
import {StyledCheckbox} from '../styles/Checkbox.styled';
import { StyledFaTimes } from '../styles/FaTimes.styled'
import { FaTimes } from 'react-icons/fa'
const log = console.log;

const ClientInClientList = ({item}) => {
  const dispatch = useDispatch();
  // const [personIsSick, setPersonIsSick] = useState(false);
  // let checkBoxStatus = useRef(false);

  let healthStatus = (item.isSick === "true") ? "sick" : "healthy";
  return (
    <Row>
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
            {/* <StyledFaTimes>
              <FaTimes onClick={() => dispatch(deleteAssistant(item.assistantId))} />
            </StyledFaTimes> */}
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
                  dispatch(toggleHealthStatusOfClient({clientId: item.clientId, isSick: e.target.checked ? "true": "false"}))
                  console.log(`end of the event: ${e.target.checked}`)
                  }
                }
              />
            </div>
            </ClientInClientListStyled>
        </Column>
        <Column>
          <ClientInClientListStyled>
              {/* use case: delete all appointments of a client. pitfall: do not use this code for dentist, assistant, nor appointment !!   */}
              <StyledFaTimes>
                <FaTimes onClick={() => dispatch(deleteClient(item.clientId))} />
              </StyledFaTimes>
            </ClientInClientListStyled>
        </Column>
        <Column>
          <ClientInClientListStyled>
              {/* use case: delete all appointments of a client. pitfall: do not use this code for dentist, assistant, nor appointment !!   */}
              <StyledFaTimes>
                <FaTimes onClick={() => dispatch(deleteClient(item.clientId))} />
              </StyledFaTimes>
            </ClientInClientListStyled>
        </Column>
    </Row>
  )
}

export default ClientInClientList;