import React from 'react';
import {useState } from 'react';
import {useDispatch, useSelector } from "react-redux";

import dentalSkillsToAddToNewDentistCreatedViaUI from '../../dataInDentistAppWhenDentistAppStarts/dentalSkillsToAddToNewDentistCreatedViaUI';
import appointmentPriorityLevelsInSelectbox from '../../dataInDentistAppWhenDentistAppStarts/appointmentPriorityLevelsInSelectbox';
import listOfValidWorkingDayNumbersInNextMonth from '../../dataInDentistAppWhenDentistAppStarts/listOfValidWorkingDayNumbersInNextMonth';
import listOfValidWorkingHours from '../../dataInDentistAppWhenDentistAppStarts/listOfValidWorkingHours';


import {createAppointment, loadSelectboxWithListOf, sortArrayWithObjects} from '../../utils';

import {Container} from '../styles/Container.styled';
import {AppointmentAddStyled, Column, Form, Intro} from './AppointmentAdd.styled';
import {StyledButtonInsideAddOrUpdateComponent} from '../styles/ButtonInsideAddOrUpdateComponent.styled';
import {StyledSelectbox} from '../styles/Selectbox.styled';

const AddAppointment = () => {
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

    let [clientId, setClientId] = useState("");
    let [treatmentType, setTreatmentType] = useState("");
    let [appointmentPriority, setAppointmentPriority] = useState("");
    let [day, setDay] = useState("");
    let [time, setTime] = useState("");
    let [dentistId, setDentistId] = useState("");
    let [assistantId, setAssistantId] = useState("");
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

    
        let appointmentLastUpdatedOnDateTime = null;

        createAppointment (
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
            dispatch
        )

        setClientId('');
        setTreatmentType('');
        setAppointmentPriority('');
        setDay('');
        setTime('');
        setDentistId('');
        setAssistantId('');
    }

  return (
    <Container> 
        <AppointmentAddStyled>
            <Intro>Add Appointment</Intro>
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
                        value={assistantId}
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
                        Add appointment
                    </StyledButtonInsideAddOrUpdateComponent>                  
                </Column>
            </Form>
        </AppointmentAddStyled>  
    </Container>
  )
}

export default AddAppointment; 