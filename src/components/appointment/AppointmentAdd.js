import React from 'react';
import {useState, useRef } from 'react';
import {useDispatch, useSelector } from "react-redux";


import {addDayTimeDentistToReduxToolkit} from "../../redux/dentistDayTimeSlice";
import {addDayTimeClientToReduxToolkit} from "../../redux/clientDayTimeSlice";
import {addDayTimeAssistantToReduxToolkit} from "../../redux/assistantDayTimeSlice";
import {addAppointmentToReduxToolkit} from "../../redux/appointmentSlice";

import {emptyAddAppointmentForm,
        saveFromNotYetSubmittedAddAppointmentFormTheClientId,
        saveFromNotYetSubmittedAddAppointmentFormTheTreatmentType,
        saveFromNotYetSubmittedAddAppointmentFormTheAppointmentPriority,
        saveFromNotYetSubmittedAddAppointmentFormTheDay,
        saveFromNotYetSubmittedAddAppointmentFormTheTime,
        saveFromNotYetSubmittedAddAppointmentFormTheDentistId,
        saveFromNotYetSubmittedAddAppointmentFormTheAssistantId
} from '../../redux/dataFilledOutByUserOnFormToAddAppointment';



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

    let getDataToDisplayInFormToAddAppointment  = useSelector((state) => state.dataFilledOutByUserOnFormToAddAppointment);
    
    let clientId = useRef();
    clientId.current = getDataToDisplayInFormToAddAppointment.dataFilledOutByUserOnFormToAddAppointment.clientIdFromAddForm;
    
    let treatmentType = useRef();
    treatmentType.current = getDataToDisplayInFormToAddAppointment.dataFilledOutByUserOnFormToAddAppointment.treatmentTypeFromAddForm;

    let appointmentPriority = useRef();
    appointmentPriority.current = getDataToDisplayInFormToAddAppointment.dataFilledOutByUserOnFormToAddAppointment.appointmentPriorityFromAddForm;

    let day = useRef();
    day.current = getDataToDisplayInFormToAddAppointment.dataFilledOutByUserOnFormToAddAppointment.dayFromAddForm;

    let time = useRef();
    time.current = getDataToDisplayInFormToAddAppointment.dataFilledOutByUserOnFormToAddAppointment.timeFromAddForm;

    let dentistId = useRef();
    dentistId.current = getDataToDisplayInFormToAddAppointment.dataFilledOutByUserOnFormToAddAppointment.dentistIdFromAddForm;

    let assistantId = useRef();
    assistantId.current = getDataToDisplayInFormToAddAppointment?.dataFilledOutByUserOnFormToAddAppointment?.assistantIdFromAddForm;

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault()
    
        if (!clientId.current) {
            alert('Please select a clientId.')
            return
        } 
        if (!treatmentType.current) {
            alert('Please select a treatment type.')
            return
        } 
        if (!appointmentPriority.current) {
            alert('Please select appointment priority.')
            return
        } 
        if (!day.current) {
            alert('Please select a day.')
            return
        } 
        if (!time.current) {
            alert('Please select a time.')
            return
        } 
        if (!dentistId.current) {
            alert('Please select a dentistId.')
            return
        } 

    
        let appointmentLastUpdatedOnDateTime = null;

        createAppointment (
            clientId.current, 
            treatmentType.current,
            appointmentPriority.current,
            day.current, 
            time.current, 
            dentistId.current, 
            assistantId.current, 
            appointmentLastUpdatedOnDateTime,  
            addDayTimeClientToReduxToolkit,
            addDayTimeDentistToReduxToolkit,
            addDayTimeAssistantToReduxToolkit,
            addAppointmentToReduxToolkit,      
            clientsFromReduxToolkit, 
            dentistsFromReduxToolkit, 
            assistantsFromReduxToolkit, 
            clientDayTimesFromReduxToolkit, 
            dentistDayTimesFromReduxToolkit, 
            assistantDayTimesFromReduxToolkit, 
            dispatch
        )
        /*
            Scenario: as a dentist or assistant I want to be able to quickly make multiple appointments for the same client, because complex
            treatments usually require more than 1 appointment. This is why I do not reset this form with the following lines of code:
 
            setClientId('');
            setTreatmentType('');
            setAppointmentPriority('');
            setDay('');
            setTime('');
            setDentistId('');
            setAssistantId('');

            Instead an empty-form button can be used to quickly empty the add-appointment form. 
        */
    }

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
      setIsHovering(true);
    };
  
    const handleMouseOut = () => {
      setIsHovering(false);
    };

    return (
        <Container> 
            <AppointmentAddStyled>
                <Intro>Add Appointment</Intro>
                <Form>
                    <Column>
                        <StyledButtonInsideAddOrUpdateComponent  
                            onClick={(event) =>{event.preventDefault(); 
                            console.log('bla');
                            dispatch(emptyAddAppointmentForm());
                            }}>
                            reset form
                        </StyledButtonInsideAddOrUpdateComponent>              
                    </Column>
                    <Column>
                        <StyledSelectbox 
                            value= {clientId.current}
                            onChange={(e) => {dispatch(saveFromNotYetSubmittedAddAppointmentFormTheClientId(e.target.value))}}
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
                            value={treatmentType.current}
                            onChange={(e) =>{dispatch(saveFromNotYetSubmittedAddAppointmentFormTheTreatmentType(e.target.value))}}
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
                            value={appointmentPriority.current}
                            onChange={(e) =>{dispatch(saveFromNotYetSubmittedAddAppointmentFormTheAppointmentPriority(e.target.value))}}
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
                            value={day.current}
                            onChange={(e) =>{dispatch(saveFromNotYetSubmittedAddAppointmentFormTheDay(e.target.value))}}
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
                            value={time.current}
                            onChange={(e) =>{dispatch(saveFromNotYetSubmittedAddAppointmentFormTheTime(e.target.value))}}
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
                            value={dentistId.current}
                            onChange={(e) =>{dispatch(saveFromNotYetSubmittedAddAppointmentFormTheDentistId(e.target.value))}}
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
                            value={assistantId.current}
                            onChange={(e) =>{dispatch(saveFromNotYetSubmittedAddAppointmentFormTheAssistantId(e.target.value))}}
                            name="assistantId"
                        > 
                            <option value="" >assistantId:</option>
                            {selectboxWithListOfAssistantsSorted.map(item => {
                                return (<option key={item.value} value={item.value}>{item.text}</option>);
                            })}
                        </StyledSelectbox>
                    </Column>
                    <Column>
                        <StyledButtonInsideAddOrUpdateComponent 
                            onClick={onSubmit}
                            onMouseOver={handleMouseOver} 
                            onMouseOut={handleMouseOut}>  
                            Add appointment
                        </StyledButtonInsideAddOrUpdateComponent>                
                    </Column>
                </Form>
                {isHovering && <h5>After clicking 'Add appointment', data stays in Add-appointment-form, to be able to quickly make another appointment for the same client</h5>} 
            </AppointmentAddStyled>  
        </Container>
  )
}

export default AddAppointment; 