import React from "react";
import {useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"; 

import listOfValidWorkingDayNumbersInNextMonth from '../../dataInDentistAppWhenDentistAppStarts/listOfValidWorkingDayNumbersInNextMonth';

import {saveLastSelectedDayInDayView } from '../../redux/saveLastSelectedDayInDayView';

import AppointmentUpdate from '../appointment/AppointmentUpdate';
import {Day} from "./Day"; 

import {log} from "../../utils";

import {ColorOrange, ColorPurple, ColorRed, SelectDayNrToDisplayStyled, FlexboxAreaStyled, Header, BoxAroundSelectBox, LegendaStyled } from "./DayView.styled";
// import {Container} from '../styles/Container.styled';
import {StyledSelectbox} from '../styles/Selectbox.styled';



export const SelectDayNrToDisplay = ({appointments}) => {
    log(`SelectDayNrToDisplay: start: `)
    const dispatch = useDispatch();
    const { isNowUpdatingAppointment } = useSelector((state) => state.updateAppointment);

    // const [dayToFilterWith, setDayToFilterWith] = useState('01'); 
    const {day}  = useSelector((state) => state.saveLastSelectedDayInDayView);
    log(`day from redux-toolkit: ${day}`);
    log(day)
    log(typeof(day))

    const [dataToRenderFromUseEffectPipeline, setDataToRenderFromUseEffectPipeline] = useState(appointments.filter(app => app.day === day));
    

    const handleDayChange = (event) => {    
        let value = Array.from(
            event.target.selectedOptions, (option) => option.value
        ) 
        // setDayToFilterWith(value);
        dispatch(saveLastSelectedDayInDayView(value));
    };
    

    const filterWithDayNr = (arrayOfWhichTheDayObjectsContainAppointments, dayToFilterWith) => {
        let appointmentsOnAFilteredDay = [];              
        let copyOfArrayOfWhichTheDayObjectsContainAppointments = [...arrayOfWhichTheDayObjectsContainAppointments];
        
        appointmentsOnAFilteredDay = copyOfArrayOfWhichTheDayObjectsContainAppointments.filter(
        (appointmentObject) => appointmentObject.day === dayToFilterWith);
        return appointmentsOnAFilteredDay;
    };


    useEffect(() => {
            let pipelineData = filterWithDayNr(appointments, day);
            setDataToRenderFromUseEffectPipeline(pipelineData);
        }, 
        [day, appointments]
    );

    return (
    <>
        <>
            {isNowUpdatingAppointment ? 
            <>
                    <SelectDayNrToDisplayStyled>
                            <Header>Select working day in next month </Header>
                            <FlexboxAreaStyled>
                                <BoxAroundSelectBox>
                                    <StyledSelectbox 
                                        value={day}
                                        onChange={(event) => handleDayChange(event)  }                
                                    >                      
                                        {/* <option value="" >day nr:</option> */}
                                        <option value="" >hide all info</option>
                                        
                                        {listOfValidWorkingDayNumbersInNextMonth.map(item => {
                                            return (<option key={item.value} value={item.value}>{item.text}</option>);
                                        })}   
                                    </StyledSelectbox>
                                </BoxAroundSelectBox> 
                                <LegendaStyled>
                                        <ColorOrange>orange: assistant is ill</ColorOrange>  
                                        <ColorPurple>purple: client is ill</ColorPurple>  
                                        <ColorRed>red: dentist is ill</ColorRed>   
                                </LegendaStyled>
                            </FlexboxAreaStyled> 
                    </SelectDayNrToDisplayStyled>  
                <AppointmentUpdate/>

                { dataToRenderFromUseEffectPipeline.length !== 0 ? <Day  appointments = {dataToRenderFromUseEffectPipeline} /> : <SelectDayNrToDisplayStyled>No appointments today.</SelectDayNrToDisplayStyled>}
            </>
            :
            <>
                    <SelectDayNrToDisplayStyled>
                        <Header>Select working day in next month </Header>
                        <FlexboxAreaStyled>
                            <BoxAroundSelectBox>
                                <StyledSelectbox 
                                    value={day}
                                    onChange={(event) => handleDayChange(event)  }                
                                >                      
                                    {/* <option value="" >day nr:</option> */}
                                    <option value="" >hide all info</option>
                                    
                                    {listOfValidWorkingDayNumbersInNextMonth.map(item => {
                                        return (<option key={item.value} value={item.value}>{item.text}</option>);
                                    })}   
                                </StyledSelectbox>
                            </BoxAroundSelectBox>
                            <LegendaStyled>
                                    <ColorOrange>orange: assistant is ill</ColorOrange>  
                                    <ColorPurple>purple: client is ill</ColorPurple>  
                                    <ColorRed>red: dentist is ill</ColorRed>  
                            </LegendaStyled> 
                        </FlexboxAreaStyled>
                    </SelectDayNrToDisplayStyled>  

                { dataToRenderFromUseEffectPipeline.length !== 0 ? <Day  appointments = {dataToRenderFromUseEffectPipeline} /> : <SelectDayNrToDisplayStyled>No appointments today.</SelectDayNrToDisplayStyled>}
            </>
            } 
        
        </>



    </>
  )
}

export default SelectDayNrToDisplay;