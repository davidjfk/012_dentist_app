import React from 'react';
import { useState, useRef } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteAssistant } from "../../redux/assistantSlice";
import { deleteClient } from "../../redux/clientSlice";

import {setDateAndTimeOfUpdateOfAppointmentInReduxToolkit} from "../../redux/appointmentSlice";
import {saveAppointmentToReduxToolkit, toggleVisibilityOfComponentUpdateAppointment } from '../../redux/updateAppointmentSlice';
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
const deleteAllAppointmentsOfClient = (clientId, appointmentsfromReduxToolkit, deleteAppointmentInReduxToolkit, deleteDayTimeClient, 
  deleteDayTimeDentist, deleteDayTimeAssistant, dispatch) => {
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



const AppointmentInAppointmentList = ({appointments, item}) => {
  // const dispatch = useDispatch();
  // const [personIsSick, setPersonIsSick] = useState(false);
  // let checkBoxStatus = useRef(false);
  
  const [isShowingComponentUpdateAppointment, setIsShowingComponentUpdateAppointment] = useState(true);

  let appointmentLastUpdatedOnDateTime = (item.appointmentLastUpdatedOnDateTime === null) ? "Not happened yet." : item.appointmentLastUpdatedOnDateTime ;

  // let clientsfromReduxToolkit = useSelector((state) => state.client)
  let appointmentsfromReduxToolkit = useSelector((state) => state.appointment)


 
  // class Test extends React.Component {
  //   onClick(event) {
  //     deleteAllAppointmentsOfClient(item.clientId, appointmentsfromReduxToolkit, dispatch);
  //     dispatch(deleteClient(item.clientId)); 
  //   }
  // }


  let dispatch = useDispatch();


  const saveDataFromAppointmentToReduxToolkitBeforeAppointmentIsDeleted = (item) => {
    log(`inside fn saveTheAppointmentToUpdateToReduxToolkit: `)
    log(item);
    dispatch(saveAppointmentToReduxToolkit(item));
  }


  const toggleTheVisibilityOfComponentUpdateAppointment = () => {
    // log("inside fn toggleVisibilityOfComponentUpdateAppointment: ");
    setIsShowingComponentUpdateAppointment(current => !current);
    // log(`isShowingComponentUpdateAppointment: ${isShowingComponentUpdateAppointment} `)
    dispatch(toggleVisibilityOfComponentUpdateAppointment(isShowingComponentUpdateAppointment))
  }




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
              {/* use case: delete all appointments of a client. pitfall: do not use this code for dentist, assistant, nor appointment !!   */}
              <StyledButtonAroundSymbol>
                <StyledFaTimes>
                  {/* <FaTimes onClick={() => deleteAllAppointmentsOfClient(item.clientId)} /> */}
                  <FaTimes 
                    onClick={() => {
                      //2do: create fn updateAppointment.
                      saveDataFromAppointmentToReduxToolkitBeforeAppointmentIsDeleted(item);

                      // delete current appointment
                      deleteDentalAppointment(
                        appointmentsfromReduxToolkit, 
                        item.appointmentId, 
                        deleteAppointmentInReduxToolkit, 
                        deleteDayTimeClient, 
                        deleteDayTimeDentist, 
                        deleteDayTimeAssistant, 
                        dispatch
                    )

                      // create new appointment with data from the current appointment
                      // working here.

                      toggleTheVisibilityOfComponentUpdateAppointment();

                      //2do: add systemDateTime in comp UpdateAppointment.
                      let systemDateTime = getSystemDatePlusTime();
                      
                      // 2do: access appointmentId from redux-toolkit, because item.appointmentId (and the whole item object) 
                      //       has just been deleted. 
                      // let appointmentId = item.appointmentId;
                      // dispatch(setDateAndTimeOfUpdateOfAppointmentInReduxToolkit({appointmentId, systemDateTime}));
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
                        deleteDentalAppointment(appointmentsfromReduxToolkit,item.appointmentId, deleteAppointmentInReduxToolkit, deleteDayTimeClient, 
                          deleteDayTimeDentist, deleteDayTimeAssistant,  dispatch)  
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




