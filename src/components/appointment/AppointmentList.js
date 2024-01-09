import React from 'react'
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from 'react';
import dentalSkillsToAddToNewDentistCreatedViaUI from '../../dataInDentistAppWhenDentistAppStarts/dentalSkillsToAddToNewDentistCreatedViaUI';
import appointmentPriorityLevelsInSelectbox from '../../dataInDentistAppWhenDentistAppStarts/appointmentPriorityLevelsInSelectbox';

import AppointmentInAppointmentList from './AppointmentInAppointmentList.js'

import {Container} from '../styles/Container.styled'
import {AppointmentListAreaStyled, AppointmentListStyled, Column, FormControlArea, Headers, Intro, Section1, Section2, Section3} from './AppointmentList.styled'
import {StyledSelectbox} from '../styles/Selectbox.styled';


const AppointmentList = () => {
    const { appointments } = useSelector((state) => state.appointment);
    
    const [appointmentObjectKeyToSortArrayWithAppointments, setAppointmentObjectKeyToSortArrayWithAppointments] = useState('');
    const [treatmentTypesToFilterWith, setTreatmentTypesToFilterWith] = useState([""]);
    const [priorityLevelToFilterWith, setPriorityLevelToFilterWith] = useState([""]);
    const [dataToRenderFromUseEffectPipeline, setDataToRenderFromUseEffectPipeline] = useState([]);
    const [isHovering, setIsHovering] = useState(false);

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


    const sortAppointmentList = (appointments, sortCriteriaFromSelectboxAsSpaceSeparatedString) => {
        if (!sortCriteriaFromSelectboxAsSpaceSeparatedString) {
            return appointments;
        }  
        let sortCriteriaFromSelectboxAsArray = sortCriteriaFromSelectboxAsSpaceSeparatedString.split(' ');
        let personObjectKey = sortCriteriaFromSelectboxAsArray[0];
        let isAscending = sortCriteriaFromSelectboxAsArray[1] === "ascending" ? true : false;

        const lookupTable = {
            appointmentId: 'appointmentId',
            dentistId: 'dentistId',
            priorityLevel: 'appointmentPriority',
            treatmentType: 'treatmentType'
        };

        const sortProperty = lookupTable[personObjectKey];  
        let sortedAppointments;
        if (!isAscending && (sortProperty === "appointmentPriority" || sortProperty === ""))  {
            sortedAppointments = [...appointments].sort((person1, person2) => person1[sortProperty].localeCompare(person2[sortProperty], 'en', { ignorePunctuation: true }));
            return sortedAppointments.reverse();
        } else if (isAscending && (sortProperty === "appointmentPriority" || sortProperty === ""))  {
            sortedAppointments = [...appointments].sort((person1, person2) => person1[sortProperty].localeCompare(person2[sortProperty], 'en', { ignorePunctuation: true }));
            return sortedAppointments;
        } else if (isAscending && (sortProperty === "appointmentId" || sortProperty === "dentistId" || sortProperty === "treatmentType")) {
            sortedAppointments = [...appointments].sort((person1, person2) => person1[sortProperty].localeCompare(person2[sortProperty], 'en', { ignorePunctuation: true }));
            return sortedAppointments;
            // I choose 'en' as  the unicodeLanguage.
            // unicode allows user to enter any kind of character.
        } else if (!isAscending && (sortProperty === "appointmentId" || sortProperty === "dentistId" || sortProperty === "treatmentType")) {
                sortedAppointments = [...appointments].sort((person1, person2) => person1[sortProperty].localeCompare(person2[sortProperty], 'en', { ignorePunctuation: true }));
                return sortedAppointments.reverse();
        } else {
            console.error(`component AppointmentInAppointmentList: not possible to sort with datatype ${typeof(sortProperty)}. Please investigate. `)
        }
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
                    parseInt(personObject.appointmentPriority) === parseInt(ratingcriterium)
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



    const handleMouseOver = () => {
      setIsHovering(true);
    };
  
    const handleMouseOut = () => {
      setIsHovering(false);
    };

    let counterOfAppointmentsInList = useRef(0);
    function increment() {
        counterOfAppointmentsInList.current +=1;
    }

    return (
    <>
    <Container> 
        <AppointmentListStyled>
            <Intro>Appointments in upcoming month in Dentist company B.V.T. </Intro>
            <FormControlArea>
                <Section1>
                    <StyledSelectbox                  
                        onChange={(e) => setAppointmentObjectKeyToSortArrayWithAppointments(e.target.value) }                 
                    >                        
                        <option value="" >Sort by:</option>
                        <option value="" >do not sort</option>
                        <option value="appointmentId ascending" >appointment id a-z</option>
                        <option value="appointmentId descending" >appointment id z-a</option>
                        <option value="dentistId ascending" >dentist id a-z</option>
                        <option value="dentistId descending" >dentist id z-a</option>
                        <option value="treatmentType ascending" > treatment type a-z</option>
                        <option value="treatmentType descending" >treatment type z-a</option>
                        <option value="priorityLevel ascending" >priority level 1-4</option>
                        <option value="priorityLevel descending" >priority level 4-1</option>
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
                    {isHovering && <h3>Press Ctrl or Shift to select multiple skill levels</h3>}
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
            <AppointmentListAreaStyled>
                { dataToRenderFromUseEffectPipeline.length !== 0 ? dataToRenderFromUseEffectPipeline.map((item, id) => {
                        increment()                                          
                        return ( 
                        <AppointmentInAppointmentList index={counterOfAppointmentsInList.current} key={id} item={item} appointments={appointments} />
                       )})
                       : 
                        <>Please create appointments.</>
                }
            </AppointmentListAreaStyled>
        </AppointmentListStyled>  
    </Container>
    <div disabled={true}>{counterOfAppointmentsInList.current = 0}</div>
    </>
  )
}

export default AppointmentList;