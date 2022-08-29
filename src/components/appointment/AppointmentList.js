import React from 'react'
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import skillLevelOptions from '../../dataInDentistAppWhenDentistAppStarts/skillLevelOptions';
import paymentMethodsToAddToNewClientCreatedViaUI from '../../dataInDentistAppWhenDentistAppStarts/paymentMethodsToAddToNewClientCreatedViaUI';
import dentalSkillsToAddToNewDentistCreatedViaUI from '../../dataInDentistAppWhenDentistAppStarts/dentalSkillsToAddToNewDentistCreatedViaUI';
import appointmentPriorityLevelsInSelectbox from '../../dataInDentistAppWhenDentistAppStarts/appointmentPriorityLevelsInSelectbox';
import healthStatusOptions from '../../dataInDentistAppWhenDentistAppStarts/healthStatusOptions';
import {Container} from '../styles/Container.styled'
import ClientInClientList from './AppointmentInAppointmentList.js'
import {ClientListAreaStyled, ClientListStyled, Column, FormControlArea, Headers, Intro, Section1, Section2, Section3} from './ClientList.styled'
import {StyledSelectbox} from '../styles/Selectbox.styled';



const log = console.log;

const AppointmentList = () => {
    const { appointments } = useSelector((state) => state.appointment);
    
    const [appointmentObjectKeyToSortArrayWithAppointments, setSongObjectKeyToSortArrayWithSongs] = useState('');
    const [dataToRenderFromUseEffectPipeline, setDataToRenderFromUseEffectPipeline] = useState([]);
    const [treatmentTypesToFilterWith, setTreatmentTypesToFilterWith] = useState([""]);
    const [priorityLevelToFilterWith, setPriorityLevelToFilterWith] = useState([""]);


    const sortAppointmentList = (appointments, JsxSelectBoxAttributeValue) => {
        if (!JsxSelectBoxAttributeValue) {
            return appointments;
        }  
        let JsxSelectBoxAttributeValueAsArray = JsxSelectBoxAttributeValue.split(' ');
        let personObjectKey = JsxSelectBoxAttributeValueAsArray[0];
        let isAscending = JsxSelectBoxAttributeValueAsArray[1] === "ascending" ? true : false;

        const appointmentObject = {
            appointmentId: 'appointmentId',
            clientId: 'clientId',
            lastName: 'lastName',
            firstName: 'firstName',
            dentistId: 'dentistId',
            phone: 'phone',
            email: 'email',
            priorityLevel: 'priorityLevel',
            birthYear: 'birthYear',
            treatmentType: 'treatmentType'
        };

        const sortProperty = appointmentObject[personObjectKey];  
        let sortedPersons;
        if (!isAscending && (sortProperty === "priorityLevel" || sortProperty === ""))  {
            sortedPersons = [...appointments].sort((person1, person2) => person2[sortProperty] - person1[sortProperty]);
            return sortedPersons;
            // numbers sort descending by default, so the !isAscending causes the priorityLevel to display in an ascending fashion. 
        } else if (isAscending && (sortProperty === "priorityLevel" || sortProperty === ""))  {
            sortedPersons = [...appointments].sort((person1, person2) => person2[sortProperty] - person1[sortProperty]);
            return sortedPersons.reverse();
        } else if (isAscending && (sortProperty === "appointmentId" || sortProperty === "dentistId" || sortProperty === "treatmentType")) {
            sortedPersons = [...appointments].sort((person1, person2) => person1[sortProperty].localeCompare(person2[sortProperty], 'en', { ignorePunctuation: true }));
            return sortedPersons;
            // I choose 'en' as  the unicodeLanguage.
            // unicode allows user to enter any kind of character.
        } else if (!isAscending && (sortProperty === "appointmentId" || sortProperty === "dentistId" || sortProperty === "treatmentType")) {
                sortedPersons = [...appointments].sort((person1, person2) => person1[sortProperty].localeCompare(person2[sortProperty], 'en', { ignorePunctuation: true }));
                return sortedPersons.reverse();
        } else {
            console.error(`component AppointmentInAppointmentList: not possible to sort with datatype ${typeof(sortProperty)}. Please investigate. `)
        }
    };
    



    const handleFilterTreatmentTypeChange = (event) => {    
        let value = Array.from(
            event.target.selectedOptions, (option) => option.value
        )   
        setTreatmentTypesToFilterWith(value);
    };
    
    const handleFilterPriorityLevelChange = (event) => {
        let value = Array.from(
            event.target.selectedOptions, (option) => option.value
        )   
        setPriorityLevelToFilterWith(value);
    };
    

    const filterByTreatmentTypes = (filteredData, treatmentTypesToFilterWith) => {
        let arrayFilteredOnAllCriteria = [];              
        if (treatmentTypesToFilterWith[0] === "" ) {
            return filteredData;
        }  else {
            let copyOfFilteredData = [...filteredData];
            let arrayFilteredOnOneCriterium;
            
            for (let filtercriterium of treatmentTypesToFilterWith) {
                arrayFilteredOnOneCriterium = copyOfFilteredData.filter(
                    (personObject) =>           
                    personObject.treatmentType.indexOf(filtercriterium) !== -1 
                );
                arrayFilteredOnAllCriteria.push(...arrayFilteredOnOneCriterium)
            }
            return arrayFilteredOnAllCriteria;
        } 
    };


    const filterByPriorityLevel = (filteredData, priorityLevelToFilterWith) => {
        let arrayFilteredOnAllCriteria = [];  
        if (priorityLevelToFilterWith[0] === "") {
        return filteredData;
        } else {
            let  copyOfFilteredData = [...filteredData];
            let arrayFilteredOnOneCriterium;
            for (let ratingcriterium of priorityLevelToFilterWith) {
                arrayFilteredOnOneCriterium = copyOfFilteredData.filter(
                    (personObject) =>           
                    parseInt(personObject.paymentMethod) === parseInt(ratingcriterium)
                );
                arrayFilteredOnAllCriteria.push(...arrayFilteredOnOneCriterium)
            }
            return arrayFilteredOnAllCriteria;
        }
    };


    useEffect(() => {
            let pipelineData = filterByPriorityLevel(appointments, priorityLevelToFilterWith);
            pipelineData = filterByTreatmentTypes(pipelineData, treatmentTypesToFilterWith);
            pipelineData = sortAppointmentList(pipelineData, appointmentObjectKeyToSortArrayWithAppointments);
            setDataToRenderFromUseEffectPipeline(pipelineData);
        }, 
        [appointmentObjectKeyToSortArrayWithAppointments, priorityLevelToFilterWith, treatmentTypesToFilterWith, appointments]
    );


    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
      setIsHovering(true);
    };
  
    const handleMouseOut = () => {
      setIsHovering(false);
    };


    return (
    <>
    <Container> 
        <ClientListStyled>
            <Intro>Appointments in upcoming month in Dentist company B.V.T. </Intro>
            <FormControlArea>
                <Section1>
                    <StyledSelectbox                  
                        onChange={(e) => setSongObjectKeyToSortArrayWithSongs(e.target.value) }                 
                    >                        
                        <option value="" >Sort by:</option>
                        <option value="" >do not sort</option>
                        <option value="appointmentId ascending" >appointment id a-z</option>
                        <option value="appointmentId descending" >appointment id z-a</option>
                        <option value="dentistId ascending" >dentist id a-z</option>
                        <option value="dentistId descending" >dentist id z-a</option>
                        <option value="treatmentType ascending" > treatment type a-z</option>
                        <option value="treatmentType descending" >treatment type z-a</option>
                        <option value="priorityLevel ascending" >priority level 1-5</option>
                        <option value="priorityLevel descending" >priority level 5-1</option>
                    </StyledSelectbox>
                </Section1>
                <Section2>
                    <div>
                    <StyledSelectbox 
                        multiple={true}
                        value={treatmentTypesToFilterWith}
                        onChange={(event) => handleFilterTreatmentTypeChange(event)  }                
                    >                      
                        <option value="" >treatment type:</option>
                        <option value="" >do not filter</option>
                        {dentalSkillsToAddToNewDentistCreatedViaUI.map(item => {
                            return (<option key={item.value} value={item.value}>{item.text}</option>);
                        })}   
                        </StyledSelectbox>
                    </div>
                </Section2>
                <Section3>
                    <div>
                    <StyledSelectbox 
                        multiple={true}
                        value={priorityLevelToFilterWith}
                        onChange={(e) => handleFilterPriorityLevelChange(e)  }     
                        onMouseOver={handleMouseOver} 
                        onMouseOut={handleMouseOut}                 
                    >    
                        <option value="" >priority level:</option>
                        <option value="" >do not filter</option>  
                        {appointmentPriorityLevelsInSelectbox.map(item => {
                            return (<option key={item.value} value={item.value}>{item.text}</option>);
                        })}
                    </StyledSelectbox>
                    {isHovering && <h3>Press Ctrl to select multiple skill levels</h3>}
                    </div>
                </Section3>
            </FormControlArea>
            <Headers>
                <Column>
                    <span>Nr</span>
                </Column>
                <Column>
                    <span>Appointment Id (clientId_day_time)</span>
                </Column>
                <Column>
                    <span>dentist Id</span>
                </Column>
                <Column>
                    <span>assistant Id</span>
                </Column>
                <Column>
                    <span>Priority</span>
                </Column>
                <Column>
                    <span>Treatment type</span>
                </Column>
                <Column>
                    <span>Appointment last updated on</span>
                </Column>
                <Column>
                    <span>update appointment</span>
                </Column>
                <Column>
                    <span>delete appointment</span>
                </Column>
            </Headers>
            <ClientListAreaStyled>
                { dataToRenderFromUseEffectPipeline.length !== 0 ? dataToRenderFromUseEffectPipeline.map((item, id) => (
                        <ClientInClientList key={id} item={item} appointments={appointments} />
                )): <>Please create appointments.</>}
            </ClientListAreaStyled>
        </ClientListStyled>  
    </Container>
    </>
  )
}

export default AppointmentList;