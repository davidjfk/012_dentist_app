import React from 'react';
import {useState } from 'react';
import {useDispatch, useSelector } from "react-redux";
import {addAppointment } from "../../redux/appointmentSlice";

import {hideComponentUpdateAppointmentReduxToolkit } from '../../redux/updateAppointmentSlice';

import dentalSkillsToAddToNewDentistCreatedViaUI from '../../dataInDentistAppWhenDentistAppStarts/dentalSkillsToAddToNewDentistCreatedViaUI';
import appointmentPriorityLevelsInSelectbox from '../../dataInDentistAppWhenDentistAppStarts/appointmentPriorityLevelsInSelectbox';
import listOfValidWorkingDayNumbersInNextMonth from '../../dataInDentistAppWhenDentistAppStarts/listOfValidWorkingDayNumbersInNextMonth';
import listOfValidWorkingHours from '../../dataInDentistAppWhenDentistAppStarts/listOfValidWorkingHours';

import {Container} from '../styles/Container.styled';
import {ClientAddStyled, Column, Form, Intro} from './ClientAdd.styled';
import {StyledButtonAroundText} from '../styles/ButtonAroundText.styled';
import {StyledSelectbox} from '../styles/Selectbox.styled';
import {createAppointment, generateAppointmentId, getSystemDatePlusTime, loadSelectboxWithListOf, selectObjectsByArrayObjectKey, sortArrayWithObjects, updateAppointment_Phase2of2_updateAppointmentRecursivelyUntilUpdateSucceeds} from '../../utils';

const log = console.log;

/*
    Compontent AppointmentUpdate has 3 differences compared to component AppointmentAdd:
    1. data in the form is loaded from  redux toolkit slice.
    2. 'systemDateTime' is added to the appointment, to show when the appointment was last updated.
    3. Naming stuff: e.g. button 'update appointment' instead of 'add appointment'.

    I do not merge the 2 components, because they each have a different responsibility.
*/


const UpdateAppointment = () => {
    log(`comp AppointmentUpdate: start: `)
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
    log(appointmentSavedInReduxToolkit);

    //2do: load initial data from redux-toolkit updateAppointmentSlice.
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
            log(`So the new appointmentId ${appointmentId} differs from the old appointmentId ${appointmentIdFromReduxToolkitSlice}.
            Reason:  Appointment has format clientId_day_time, and the appointment client and/or day and/or time have changed. 
            This is not a problem.`)
        }
        
        // q: delete this key from obj appointment?    
        let isNowUpdatingAppointment = true;
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
            isNowUpdatingAppointment,       
            clientsFromReduxToolkit, 
            dentistsFromReduxToolkit, 
            assistantsFromReduxToolkit, 
            clientDayTimesFromReduxToolkit, 
            dentistDayTimesFromReduxToolkit, 
            assistantDayTimesFromReduxToolkit, 
            hideComponentUpdateAppointmentReduxToolkit,
            dispatch
        )

           
        // Do not reset the form! So do not:  
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
        <ClientAddStyled>
            <Intro>Update Appointment</Intro>
            <Form>
                <Column>
                    <StyledSelectbox 
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                        name="clientId"
                    > 
                        <option value="" >clientId:</option>
                        {/* <option value="default" disabled hidden>
                            Add skill level
                        </option> */}
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
                        {/* <option value="default" disabled hidden>
                            Add skill level
                        </option> */}
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
                        {/* <option value="default" disabled hidden>
                            Add skill level
                        </option> */}
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
                        {/* <option value="default" disabled hidden>
                            Add skill level
                        </option> */}
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
                        {/* <option value="default" disabled hidden>
                            Add skill level
                        </option> */}
                        {selectboxWithListOfDentistsSorted.map(item => {
                            return (<option key={item.value} value={item.value}>{item.text}</option>);
                        })}
                    </StyledSelectbox>
                </Column>
                <Column>
                    <StyledSelectbox 
                        value={assistantId}
                        onChange={(e) => setAssistantId(e.target.value)}
                        name="assistantId"
                    > 
                        <option value="" >assistantId:</option>
                        {/* <option value="default" disabled hidden>
                            Add skill level
                        </option> */}
                        {selectboxWithListOfAssistantsSorted.map(item => {
                            return (<option key={item.value} value={item.value}>{item.text}</option>);
                        })}
                    </StyledSelectbox>
                </Column>
                <Column>
                    <StyledButtonAroundText onClick={onSubmit}>
                        Update appointment 
                    </StyledButtonAroundText>                  
                </Column>
            </Form>
        </ClientAddStyled>  
    </Container>
  )
}

export default UpdateAppointment; 