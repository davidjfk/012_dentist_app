import React from 'react';
import { useState, useRef } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteAssistant } from "../../redux/assistantSlice";
import { deleteClient } from "../../redux/clientSlice";

import {setDateAndTimeOfDeletionOfClientsAppointmentsInReduxToolkit, toggleHealthStatusOfClient } from "../../redux/clientSlice";
import {Row, Column} from './ClientList.styled'
import { ClientInClientListStyled } from './ClientInList.styled';
import {StyledCheckbox} from '../styles/Checkbox.styled';
import { StyledFaTimes } from '../styles/FaTimes.styled'
import { FaTimes } from 'react-icons/fa'
import {StyledButtonAroundSymbol} from '../styles/ButtonAroundSymbol.styled';



//start
// imports for fn: deleteAllAppointments:
// import React from "react";
import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import {deleteAppointmentInReduxToolkit} from "../../redux/appointmentSlice";
import {deleteDayTimeClient} from "../../redux/clientDayTimeSlice";
import {deleteDayTimeDentist} from "../../redux/dentistDayTimeSlice";
import {deleteDayTimeAssistant} from "../../redux/assistantDayTimeSlice";
import {deleteDentalAppointment, getSystemDatePlusTime, selectObjectsByArrayObjectKey} from '../../utils';
import "../../App.css";

// end

const log = console.log;


//2do: move fn to folder utils and make more generic, so this fn can be used to delete appointments of each dentist and assistant (one per fn call) as well. 
const deleteAllAppointmentsOfClient = (
  clientId, 
  appointmentsfromReduxToolkit, 
  deleteAppointmentInReduxToolkit, 
  deleteDayTimeClient, 
  deleteDayTimeDentist, 
  deleteDayTimeAssistant, 
  dispatch) => {
  log(`clientId: ${clientId}`)
  let getAppointment = appointment => appointment.clientId === clientId
  let appointmentsToDelete = selectObjectsByArrayObjectKey(appointmentsfromReduxToolkit.appointments, getAppointment)
  log(`appointmentsToDelete: ${appointmentsToDelete}`)
  log(appointmentsToDelete)
  let appointmentsToDeleteCopy = [...appointmentsToDelete];
  appointmentsToDeleteCopy.forEach(appointmentToDelete => {
      let appointmentId = appointmentToDelete.appointmentId;
      if (appointmentsToDelete.length !== 0){
          deleteDentalAppointment(
              appointmentsfromReduxToolkit, 
              appointmentId,
              deleteAppointmentInReduxToolkit,
              deleteDayTimeClient, 
              deleteDayTimeDentist, 
              deleteDayTimeAssistant, 
              dispatch)  
      }
  })            
} 

const ClientInClientList = ({clients, item}) => {
  // const dispatch = useDispatch();
  // const [personIsSick, setPersonIsSick] = useState(false);
  // let checkBoxStatus = useRef(false);


  let healthStatus = (item.isSick === "true") ? "sick" : "healthy";
  let appointmentLastUpdatedOnDateTime = (item.appointmentsDeletedOnDateTime === "null") ? "Not happened yet." : item.appointmentsDeletedOnDateTime ;

  // let clientsfromReduxToolkit = useSelector((state) => state.client)
  let appointmentsfromReduxToolkit = useSelector((state) => state.appointment)
  let dispatch = useDispatch();

 
  // class Test extends React.Component {
  //   onClick(event) {
  //     deleteAllAppointmentsOfClient(item.clientId, appointmentsfromReduxToolkit, dispatch);
  //     dispatch(deleteClient(item.clientId)); 
  //   }
  // }

  return (
    <Row>
        <Column>
          <ClientInClientListStyled>
            {clients.indexOf(item) + 1 }
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
                /*
                  note to self: because of component AssistantAdd, this checkbox belongs to a just-added-appointment! So the initial state of this checkbox   
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
            {appointmentLastUpdatedOnDateTime}
          </ClientInClientListStyled>
        </Column>


        <Column>
          <ClientInClientListStyled>
              {/* use case: delete all appointments of a client. pitfall: do not use this code for dentist, assistant, nor appointment !!   */}
              <StyledButtonAroundSymbol>
                <StyledFaTimes>
                  {/* <FaTimes onClick={() => deleteAllAppointmentsOfClient(item.clientId)} /> */}
                  <FaTimes 
                    onClick={() => {
                      deleteAllAppointmentsOfClient(item.clientId, appointmentsfromReduxToolkit, deleteAppointmentInReduxToolkit,   deleteDayTimeClient, 
                          deleteDayTimeDentist, deleteDayTimeAssistant,  dispatch);
                      let systemDateTime = getSystemDatePlusTime();
                      let clientId = item.clientId;
                      dispatch(setDateAndTimeOfDeletionOfClientsAppointmentsInReduxToolkit({clientId, systemDateTime}));
                    }} 
                  />
                </StyledFaTimes>
              </StyledButtonAroundSymbol>
            </ClientInClientListStyled>
        </Column>
        <Column>
          <ClientInClientListStyled>
              {/* use case: delete all appointments of a client. pitfall: do not use this code for dentist, assistant, nor appointment !!   */}
              <StyledButtonAroundSymbol>
                <StyledFaTimes>
                  <FaTimes 
                      onClick={() => {
                        deleteAllAppointmentsOfClient(item.clientId, appointmentsfromReduxToolkit, deleteAppointmentInReduxToolkit, deleteDayTimeClient, 
                          deleteDayTimeDentist, deleteDayTimeAssistant,  dispatch);   
                        let clientId = item.clientId;                     
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




