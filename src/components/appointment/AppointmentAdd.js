import React from 'react';
import {useState } from 'react';
import {useDispatch, useSelector } from "react-redux";
import {addAppointment } from "../../redux/appointmentSlice";
import dentalSkillsToAddToNewDentistCreatedViaUI from '../../dataInDentistAppWhenDentistAppStarts/dentalSkillsToAddToNewDentistCreatedViaUI';
import appointmentPriorityLevelsInSelectbox from '../../dataInDentistAppWhenDentistAppStarts/appointmentPriorityLevelsInSelectbox';
import listOfValidWorkingDayNumbersInNextMonth from '../../dataInDentistAppWhenDentistAppStarts/listOfValidWorkingDayNumbersInNextMonth';
import listOfValidWorkingHours from '../../dataInDentistAppWhenDentistAppStarts/listOfValidWorkingHours';

import {Container} from '../styles/Container.styled';
import {ClientAddStyled, Column, Form, Intro} from './ClientAdd.styled';
import {StyledButtonAroundText} from '../styles/ButtonAroundText.styled';
import {StyledSelectbox} from '../styles/Selectbox.styled';
import {createAppointment, generateAppointmentId, loadSelectboxWithListOf, selectObjectsByArrayObjectKey, sortArrayWithObjects} from '../../utils';

const log = console.log;

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


        // skip this part until (...)
        let UIMade="UIMade_temp_remove_this_after_the_test";
        const appointmentId = generateAppointmentId(clientId, day, time);

        let getClient = client => client.clientId === clientId
        let clientForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(clients, getClient)
        // variable client inside obj appointment is derived data from  the object client.
        let client = (`${(clientForWhomAnAppointmentIsBeingMade[0].firstName)} ${(clientForWhomAnAppointmentIsBeingMade[0].lastName)}`)

        let getDentist = dentist => dentist.dentistId === dentistId
        let dentistForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(dentists, getDentist)
        // variable dentist inside obj appointment is derived data from  the object dentist.
        let dentist = (`${(dentistForWhomAnAppointmentIsBeingMade[0].firstName)} ${(dentistForWhomAnAppointmentIsBeingMade[0].lastName)}`)

        
        if (assistantId !== "") {
        let getAssistant = assistant => assistant.assistantId === assistantId
        let assistantForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(assistants, getAssistant)
        // variable assistant inside obj appointment is derived data from  the object assistant.
        let assistant = (`${(assistantForWhomAnAppointmentIsBeingMade[0].firstName)} ${(assistantForWhomAnAppointmentIsBeingMade[0].lastName)}`)
        }
        /*
           (...) skip until here. Reason: instead of doing a dispatch, call fn createAppointment. This fn validates the business rules. Then as its final step it will do a dispatch. This dispatch looks exactly like the 
           dispatch below.
        */

        // dispatch(addAppointment({
        //     UIMade, 
        //     appointmentId, 
        //     appointmentLastUpdatedOnDateTime, 
        //     appointmentPriority, 
        //     assistant, 
        //     assistantId, 
        //     client, 
        //     clientId, 
        //     day, 
        //     dentist, 
        //     dentistId, 
        //     isNowUpdatingAppointment, 
        //     time, 
        //     treatmentType 
        // }));   
        
        let isNowUpdatingAppointment = false;
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
            isNowUpdatingAppointment,       
            clientsFromReduxToolkit, 
            dentistsFromReduxToolkit, 
            assistantsFromReduxToolkit, 
            clientDayTimesFromReduxToolkit, 
            dentistDayTimesFromReduxToolkit, 
            assistantDayTimesFromReduxToolkit, 
            dispatch
        )

        // now reset the form for the next use:
        // setClientId('');
        // setTreatmentType('');
        // setAppointmentPriority('');
        // setDay('');
        // setTime('');
        // setDentistId('');
        setAssistantId('');
    }

  return (
    <Container> 
        <ClientAddStyled>
            <Intro>Add Appointment</Intro>
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
                        Add appointment 
                    </StyledButtonAroundText>                  
                </Column>
            </Form>
        </ClientAddStyled>  
    </Container>
  )
}

export default AddAppointment; 