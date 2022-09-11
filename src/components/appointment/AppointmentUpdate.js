import React from 'react';
import {useState } from 'react';
import {useDispatch, useSelector } from "react-redux";

import {enableUiControlsDuringAppointmentUpdate, hideComponentUpdateAppointmentReduxToolkit } from '../../redux/updateAppointmentSlice';

import dentalSkillsToAddToNewDentistCreatedViaUI from '../../dataInDentistAppWhenDentistAppStarts/dentalSkillsToAddToNewDentistCreatedViaUI';
import appointmentPriorityLevelsInSelectbox from '../../dataInDentistAppWhenDentistAppStarts/appointmentPriorityLevelsInSelectbox';
import listOfValidWorkingDayNumbersInNextMonth from '../../dataInDentistAppWhenDentistAppStarts/listOfValidWorkingDayNumbersInNextMonth';
import listOfValidWorkingHours from '../../dataInDentistAppWhenDentistAppStarts/listOfValidWorkingHours';

import {Container} from '../styles/Container.styled';
import {AppointmentAddStyled, Column, Form, Intro} from './AppointmentAdd.styled';
import {StyledButtonInsideAddOrUpdateComponent} from '../styles/ButtonInsideAddOrUpdateComponent.styled';
import {StyledSelectbox} from '../styles/Selectbox.styled';
import {generateAppointmentId, getSystemDatePlusTime, loadSelectboxWithListOf, log, sortArrayWithObjects, updateAppointment_Phase2of2_updateAppointmentRecursivelyUntilUpdateSucceeds} from '../../utils';

/*
    Compontent AppointmentUpdate has 3 differences compared to component AppointmentAdd:
    1. data in the form is loaded from  redux toolkit slice.
    2. 'systemDateTime' is added to the appointment, to show when the appointment was last updated.
    3. Naming stuff: e.g. button 'update appointment' instead of 'add appointment'.

    I do not merge the 2 components, because they each have a different responsibility.
*/

const UpdateAppointment = () => {
    let clientsFromReduxToolkit  = useSelector((state) => state.client);
    let dentistsFromReduxToolkit  = useSelector((state) => state.dentist);
    let assistantsFromReduxToolkit  = useSelector((state) => state.assistant);

    let clientDayTimesFromReduxToolkit = useSelector((state) => state.clientDayTime);
    let dentistDayTimesFromReduxToolkit = useSelector((state) => state.dentistDayTime);
    let assistantDayTimesFromReduxToolkit = useSelector((state) => state.assistantDayTime);

    let {clients}  = useSelector((state) => state.client);
    let selectboxWithListOfClientIds = loadSelectboxWithListOf("clientId", clients);
    let selectboxWithListOfClientIdsSorted = sortArrayWithObjects("text", selectboxWithListOfClientIds);

    let {dentists}  = useSelector((state) => state.dentist);
    let selectboxWithListOfDentistIds = loadSelectboxWithListOf("dentistId", dentists);
    let selectboxWithListOfDentistsSorted = sortArrayWithObjects("text", selectboxWithListOfDentistIds);

    let {assistants}  = useSelector((state) => state.assistant);
    let selectboxWithListOfAssistantIds = loadSelectboxWithListOf("assistantId", assistants);
    let selectboxWithListOfAssistantsSorted = sortArrayWithObjects("text", selectboxWithListOfAssistantIds);

    let {appointmentSavedInReduxToolkit}  = useSelector((state) => state.updateAppointment);
    let [clientId, setClientId] = useState(appointmentSavedInReduxToolkit.clientId);
    let [treatmentType, setTreatmentType] = useState(appointmentSavedInReduxToolkit.treatmentType);
    let [appointmentPriority, setAppointmentPriority] = useState(appointmentSavedInReduxToolkit.appointmentPriority);
    let [day, setDay] = useState(appointmentSavedInReduxToolkit.day);
    let [time, setTime] = useState(appointmentSavedInReduxToolkit.time);
    let [dentistId, setDentistId] = useState(appointmentSavedInReduxToolkit.dentistId);
    let [assistantId, setAssistantId] = useState(appointmentSavedInReduxToolkit.assistantId);

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault()
    
        if (!clientId) {
            alert('Please select a clientId')
            return
        } 
        if (!treatmentType) {
            alert('Please select a treatment type')
            return
        } 
        if (!appointmentPriority) {
            alert('Please select a treatment type')
            return
        } 
        if (!day) {
            alert('Please select a day')
            return
        } 
        if (!time) {
            alert('Please select a time')
            return
        } 
        if (!dentistId) {
            alert('Please select a dentistId')
            return
        } 
        
        // alternative with same result: load appointmentId from redux-toolkit updateAppointmentSlice.
        const appointmentId = generateAppointmentId(clientId, day, time);
        let appointmentIdFromReduxToolkitSlice = appointmentSavedInReduxToolkit.appointmentId;
        if (appointmentId !== appointmentIdFromReduxToolkitSlice){
            log(`The new appointmentId ${appointmentId} after the update differs from the old appointmentId ${appointmentIdFromReduxToolkitSlice} before the update.
            Reason:  Appointment has format clientId_day_time, and in the appointment, the client and/or day and/or time have changed. 
            This is intended system behavior / not a problem.`)
        }
          
        let systemDateTime = getSystemDatePlusTime();
        let appointmentLastUpdatedOnDateTime = systemDateTime;
        
        updateAppointment_Phase2of2_updateAppointmentRecursivelyUntilUpdateSucceeds (
            clientId, 
            treatmentType,
            appointmentPriority,
            day, 
            time, 
            dentistId, 
            assistantId, 
            appointmentLastUpdatedOnDateTime,        
            clientsFromReduxToolkit, 
            dentistsFromReduxToolkit, 
            assistantsFromReduxToolkit, 
            clientDayTimesFromReduxToolkit, 
            dentistDayTimesFromReduxToolkit, 
            assistantDayTimesFromReduxToolkit, 
            hideComponentUpdateAppointmentReduxToolkit,
            enableUiControlsDuringAppointmentUpdate,
            dispatch
        )

        //backlog idea: save the update to a log, erasing the UIcontrol inputs below.   
        /*  
            pitfall: do not reset the update-form (with the commented out code below), because of following scenario: if a person (client and/or dentist and/or assistant) 
            already has appointment on certain day and time, then alertbox appears with warning. After clicking away the warning, the data in the update form must still be there, 
            so a change can be made (e.g. select other day and or time), so the new appointment complies with the business rules.
            But if you reset the form below, then the following (trouble) happens: after clicking away the alert with the warning, the appointment (that you are updating) has been deleted, 
            and the udpate-form is empty. 
        */  
        // setClientId('');
        // setTreatmentType('');
        // setAppointmentPriority('');
        // setDay('');
        // setTime('');
        // setDentistId('');
        // setAssistantId('');
    }

  return (
    <Container> 
        <AppointmentAddStyled>
            <Intro>Update Appointment</Intro>
            <Form>
                <Column>
                    <StyledSelectbox 
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                        name="clientId"
                    > 
                        <option value="" >clientId:</option>
                        {selectboxWithListOfClientIdsSorted.map(item => {
                            return (<option key={item.value} value={item.value}>{item.text}</option>);
                        })}
                    </StyledSelectbox>
                </Column>
                <Column>
                    <StyledSelectbox 
                        value={treatmentType}
                        onChange={(e) => setTreatmentType(e.target.value)}
                        name="treatmentType"
                    > 
                        <option value="" >treatmentType:</option>
                        {dentalSkillsToAddToNewDentistCreatedViaUI.map(item => {
                            return (<option key={item.value} value={item.value}>{item.text}</option>);
                        })}
                    </StyledSelectbox>
                </Column>
                <Column>
                    <StyledSelectbox 
                        value={appointmentPriority}
                        onChange={(e) => setAppointmentPriority(e.target.value)}
                        name="priorityLevel"
                    > 
                        <option value="" >priority:</option>
                        {appointmentPriorityLevelsInSelectbox.map(item => {
                            return (<option key={item.value} value={item.value}>{item.text}</option>);
                        })}
                    </StyledSelectbox>
                </Column>
                <Column>
                    <StyledSelectbox 
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        name="day"
                    > 
                        <option value="" >day:</option>
                        {listOfValidWorkingDayNumbersInNextMonth.map(item => {
                            return (<option key={item.value} value={item.value}>{item.text}</option>);
                        })}
                    </StyledSelectbox>
                </Column>
                <Column>
                    <StyledSelectbox 
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        name="time"
                    > 
                        <option value="" >time:</option>
                        {listOfValidWorkingHours.map(item => {
                            return (<option key={item.value} value={item.value}>{item.text}</option>);
                        })}
                    </StyledSelectbox>
                </Column>
                <Column>
                    <StyledSelectbox 
                        value={dentistId}
                        onChange={(e) => setDentistId(e.target.value)}
                        name="dentistId"
                    > 
                        <option value="" >dentistId:</option>
                        {selectboxWithListOfDentistsSorted.map(item => {
                            return (<option key={item.value} value={item.value}>{item.text}</option>);
                        })}
                    </StyledSelectbox>
                </Column>
                <Column>
                    <StyledSelectbox 
                        value={assistantId ? assistantId : "" }
                        onChange={(e) => setAssistantId(e.target.value)}
                        name="assistantId"
                    > 
                        <option value="" >assistantId:</option>
                        {selectboxWithListOfAssistantsSorted.map(item => {
                            return (<option key={item.value} value={item.value}>{item.text}</option>);
                        })}
                    </StyledSelectbox>
                </Column>
                <Column>
                    <StyledButtonInsideAddOrUpdateComponent onClick={onSubmit}>
                        Update appointment 
                    </StyledButtonInsideAddOrUpdateComponent>                  
                </Column>
            </Form>
        </AppointmentAddStyled>  
    </Container>
  )
}

export default UpdateAppointment; 