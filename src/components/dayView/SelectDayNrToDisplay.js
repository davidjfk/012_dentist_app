import React from "react";
import {useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"; 
import {saveLastSelectedDayInDayView } from '../../redux/saveLastSelectedDayInDayView';

import listOfValidWorkingDayNumbersInNextMonth from '../../dataInDentistAppWhenDentistAppStarts/listOfValidWorkingDayNumbersInNextMonth';

import {getDayOfTheWeek} from '../../utils';

import AppointmentUpdate from '../appointment/AppointmentUpdate';
import {Day} from "./Day"; 

import {DayWordBeneathSelectBoxStyled, LegendaTableStyled, OrangeStyled, PurpleStyled, RedStyled, SelectDayNrToDisplayStyled, FlexboxAreaStyled, Header, BoxAroundSelectBox} from "./DayView.styled";
import {StyledSelectbox} from '../styles/Selectbox.styled';



export const SelectDayNrToDisplay = ({appointments}) => {
    const dispatch = useDispatch();
    const { isNowUpdatingAppointment } = useSelector((state) => state.updateAppointment);
 
    const {day}  = useSelector((state) => state.saveLastSelectedDayInDayView);

    const [dataToRenderFromUseEffectPipeline, setDataToRenderFromUseEffectPipeline] = useState(appointments.filter(app => app.day === day));
    
    const handleDayChange = (event) => {    
        let value = Array.from(
            event.target.selectedOptions, (option) => option.value
        ) 
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
                                    <option value="" >hide all info</option>
                                    
                                    {listOfValidWorkingDayNumbersInNextMonth.map(item => {
                                        return (<option key={item.value} value={item.value}>{item.text}</option>);
                                    })}   
                                </StyledSelectbox>
                                <DayWordBeneathSelectBoxStyled>
                                {getDayOfTheWeek(day)}
                                </DayWordBeneathSelectBoxStyled>                                
                            </BoxAroundSelectBox> 
                            <LegendaTableStyled>
                                <tbody>
                                    <tr>
                                        <OrangeStyled>orange</OrangeStyled>
                                        <td>assistant is ill</td>
                                    </tr>
                                    <tr>
                                        <RedStyled>red</RedStyled>
                                        <td>dentist is ill</td>
                                    </tr>
                                    <tr>
                                        <PurpleStyled>purple</PurpleStyled>
                                        <td>client is ill</td>
                                    </tr>
                                </tbody>
                            </LegendaTableStyled>
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
                                <option value="" >hide all info</option>
                                
                                {listOfValidWorkingDayNumbersInNextMonth.map(item => {
                                    return (<option key={item.value} value={item.value}>{item.text}</option>);
                                })}   
                            </StyledSelectbox>
                            <DayWordBeneathSelectBoxStyled>
                                {getDayOfTheWeek(day)}
                            </DayWordBeneathSelectBoxStyled>
                        </BoxAroundSelectBox>
                        <LegendaTableStyled>
                            <tbody>
                                <tr>
                                    <OrangeStyled>orange</OrangeStyled>
                                    <td>assistant is ill</td>
                                </tr>
                                <tr>
                                    <RedStyled>red</RedStyled>
                                    <td>dentist is ill</td>
                                </tr>
                                <tr>
                                    <PurpleStyled>purple</PurpleStyled>
                                    <td>client is ill</td>
                                </tr>
                            </tbody>
                        </LegendaTableStyled>
                    </FlexboxAreaStyled>
                </SelectDayNrToDisplayStyled>  

            { dataToRenderFromUseEffectPipeline.length !== 0 ? <Day  appointments = {dataToRenderFromUseEffectPipeline} /> : <SelectDayNrToDisplayStyled>No appointments today.</SelectDayNrToDisplayStyled>}
        </>
        } 
    </>
  )
}

export default SelectDayNrToDisplay;