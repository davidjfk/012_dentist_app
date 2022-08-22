import React from "react";
// import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import "./Day.css";
// import {AppointmentInDay} from "../AppointmentInDay";
// import { useSelector } from "react-redux"; 

import {Day} from "./Day";
import {Container} from '../styles/Container.styled';
import {AssistantListStyled, FormControlArea, Intro, Section2} from '../assistant/AssistantList.styled';
import {StyledSelectbox} from '../styles/Selectbox.styled';
import listOfValidWorkingDayNumbersInNextMonth from '../../dataInDentistAppWhenDentistAppStarts/listOfValidWorkingDayNumbersInNextMonth';


// const log = console.log;

export const SelectDayNrToDisplay = ({appointments}) => {
    // log('comp SelectDayNrToDisplay:')
    // log(appointments)
    const [dataToRenderFromUseEffectPipeline, setDataToRenderFromUseEffectPipeline] = useState(appointments.filter(app => app.day === "01"));
    const [dayToFilterWith, setDayToFilterWith] = useState("01");
    // log(dataToRenderFromUseEffectPipeline)

    const handleDayChange = (event) => {    
        // log('fn handleDayChange:')
        let value = Array.from(
            event.target.selectedOptions, (option) => option.value
        ) 
        // log(typeof(value.toString()))  
        setDayToFilterWith(value);
    };
    
    

    const filterWithDayNr = (arrayOfWhichTheDayObjectsContainAppointments, dayToFilterWith) => {
        // log('inside fn filterWithDayNr')
        let appointmentsOnAFilteredDay = [];              

        let copyOfArrayOfWhichTheDayObjectsContainAppointments = [...arrayOfWhichTheDayObjectsContainAppointments];
        
        appointmentsOnAFilteredDay = copyOfArrayOfWhichTheDayObjectsContainAppointments.filter(
            (appointmentObject) => appointmentObject.day === dayToFilterWith);
        // log(appointmentsOnAFilteredDay)
        return appointmentsOnAFilteredDay;
    };


    useEffect(() => {
            // log('inside useEffect')
            // log(appointments)
            // log(dayToFilterWith)
            let pipelineData = filterWithDayNr(appointments, dayToFilterWith.toString());
            // log('again inside useEffect')
            // log(pipelineData)
            setDataToRenderFromUseEffectPipeline(pipelineData);
        }, 
        [dayToFilterWith, appointments]
    );

    // log('before the return: ')
    // log(dataToRenderFromUseEffectPipeline)

    return (
    <>
        <Container> 
            <AssistantListStyled>
                <Intro>Select working day in next month </Intro>
                <FormControlArea>
                    <Section2>
                        <div>
                        <StyledSelectbox 
                            value={dayToFilterWith}
                            onChange={(event) => handleDayChange(event)  }                
                        >                      
                            {/* <option value="" >day nr:</option> */}
                            <option value="" >hide all info</option>
                            
                            {listOfValidWorkingDayNumbersInNextMonth.map(item => {
                                return (<option key={item.value} value={item.value}>{item.text}</option>);
                            })}   
                        </StyledSelectbox>
                        </div>
                    </Section2>
            <ul className=" colorLegenda">
                <li class="orange">orange: assistant is ill</li>  
                <li class="purple">purple: client is ill</li>  
                <li class="red">red: dentist is ill</li>  
            </ul>  
                </FormControlArea>
            </AssistantListStyled>  
        </Container>

       <Day  appointments = {dataToRenderFromUseEffectPipeline}    />               
    </>
  )
}

export default SelectDayNrToDisplay;