import React from 'react'
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from 'react';

import skillLevelOptions from '../../dataInDentistAppWhenDentistAppStarts/skillLevelOptions';
import healthStatusOptions from '../../dataInDentistAppWhenDentistAppStarts/healthStatusOptions';

import DentistInDentistList from './DentistInDentistList.js'

import {Container} from '../styles/Container.styled'
import {DentistListAreaStyled, DentistListStyled, Column, FormControlArea, Headers, Intro, Section1, Section2, Section3} from './DentistList.styled'
import {StyledSelectbox} from '../styles/Selectbox.styled';


const DentistList = () => {
    const { dentists } = useSelector((state) => state.dentist);
    
    const [personObjectKeyToSortArrayWithPersons, setPersonObjectKeyToSortArrayWithPersons] = useState('');
    const [healthStatusToFilterWith, setHealthStatusToFilterWith] = useState([""]);
    const [skillLevelToFilterWith, setSkillLevelToFilterWith] = useState([""]);
    const [dataToRenderFromUseEffectPipeline, setDataToRenderFromUseEffectPipeline] = useState([]);
    const [isHovering, setIsHovering] = useState(false);


    const handleFilterHealthStatusChange = (event) => {    
        let value = Array.from(
            event.target.selectedOptions, (option) => option.value
        )   
        setHealthStatusToFilterWith(value);
    };
    
    const handleFilterSkillLevelChange = (event) => {
        let value = Array.from(
            event.target.selectedOptions, (option) => option.value
        )   
        setSkillLevelToFilterWith(value);
    };

    const sortAssistantList = (dentists, sortCriteriaFromSelectboxAsSpaceSeparatedString) => {
        if (!sortCriteriaFromSelectboxAsSpaceSeparatedString) {
            return dentists;
        }  
        let sortCriteriaFromSelectboxAsArray = sortCriteriaFromSelectboxAsSpaceSeparatedString.split(' ');
        let personObjectKey = sortCriteriaFromSelectboxAsArray[0];
        let isAscending = sortCriteriaFromSelectboxAsArray[1] === "ascending" ? true : false;

        const lookupTable = {
            dentistId: 'dentistId',
            firstName: 'firstName',
            isSick: 'isSick',
            skillLevel: 'skillLevel'
        };

        const sortProperty = lookupTable[personObjectKey];  
        let sortedPersons;
        if (!isAscending && (sortProperty === "skillLevel" || sortProperty === ""))  {
            sortedPersons = [...dentists].sort((person1, person2) => person1[sortProperty].localeCompare(person2[sortProperty], 'en', { ignorePunctuation: true }));
            return sortedPersons.reverse();
        } else if (isAscending && (sortProperty === "skillLevel" || sortProperty === ""))  {
            sortedPersons = [...dentists].sort((person1, person2) => person1[sortProperty].localeCompare(person2[sortProperty], 'en', { ignorePunctuation: true }));
            return sortedPersons;
        } else if (isAscending && (sortProperty === "dentistId" || sortProperty === "firstName" || sortProperty === "isSick")) {
            sortedPersons = [...dentists].sort((person1, person2) => person1[sortProperty].localeCompare(person2[sortProperty], 'en', { ignorePunctuation: true }));
            return sortedPersons;
        } else if (!isAscending && (sortProperty === "dentistId" || sortProperty === "firstName" || sortProperty === "isSick")) {
                sortedPersons = [...dentists].sort((person1, person2) => person1[sortProperty].localeCompare(person2[sortProperty], 'en', { ignorePunctuation: true }));
                return sortedPersons.reverse();
        } else {
            console.error(`component assistantList: not possible to sort with datatype ${typeof(sortProperty)}. Please investigate. `)
        }
    };
    

    

    const filterByHealthStatus = (filteredData, healthStatusToFilterWith) => {
        let arrayFilteredOnAllCriteria = [];              
        if (healthStatusToFilterWith[0] === "" ) {
            return filteredData;
        }  else {
            let copyOfFilteredData = [...filteredData];
            let arrayFilteredOnOneCriterium;
            
            for (let filtercriterium of healthStatusToFilterWith) {
                arrayFilteredOnOneCriterium = copyOfFilteredData.filter(
                    (personObject) =>           
                    personObject.isSick.indexOf(filtercriterium) !== -1 
                );
                arrayFilteredOnAllCriteria.push(...arrayFilteredOnOneCriterium)
            }
            return arrayFilteredOnAllCriteria;
        } 
    };

    const filterBySkillLevel = (filteredData, skillLevelToFilterWith) => {
        let arrayFilteredOnAllCriteria = [];  
        if (skillLevelToFilterWith[0] === "") {
        return filteredData;
        } else {
            let  copyOfFilteredData = [...filteredData];
            let arrayFilteredOnOneCriterium;
            for (let ratingcriterium of skillLevelToFilterWith) {
                arrayFilteredOnOneCriterium = copyOfFilteredData.filter(
                    (personObject) =>           
                    parseInt(personObject.skillLevel) === parseInt(ratingcriterium)
                );
                arrayFilteredOnAllCriteria.push(...arrayFilteredOnOneCriterium)
            }
            return arrayFilteredOnAllCriteria;
        }
    };

    useEffect(() => {
            let pipelineData = filterBySkillLevel(dentists, skillLevelToFilterWith);
            pipelineData = filterByHealthStatus(pipelineData, healthStatusToFilterWith);
            pipelineData = sortAssistantList(pipelineData, personObjectKeyToSortArrayWithPersons);
            setDataToRenderFromUseEffectPipeline(pipelineData);
        }, 
        [personObjectKeyToSortArrayWithPersons, skillLevelToFilterWith, healthStatusToFilterWith, dentists]
    );



    const handleMouseOver = () => {
      setIsHovering(true);
    };
  
    const handleMouseOut = () => {
      setIsHovering(false);
    };

    let counterOfDentistInList = useRef(0);
    function increment() {
        counterOfDentistInList.current +=1;
    }

    return (
    <>
    <Container> 
        <DentistListStyled>
            <Intro>Dentists in Dentist company B.V.T. </Intro>
            <FormControlArea>
                <Section1>
                    <StyledSelectbox                  
                        onChange={(e) => setPersonObjectKeyToSortArrayWithPersons(e.target.value) }                 
                    >                        
                        <option value="" >Sort by:</option>
                        <option value="" >do not sort</option>
                        <option value="dentistId ascending" >dentist id a-z</option>
                        <option value="dentistId descending" >dentist id z-a</option>
                        <option value="firstName ascending" >first name a-z</option>
                        <option value="firstName descending" >first name z-a</option>
                        <option value="isSick ascending" >health status a-z</option>
                        <option value="isSick descending" >health status z-a</option>
                        <option value="skillLevel ascending" >skill level 1-7</option>
                        <option value="skillLevel descending" >skill level 7-1</option>
                    </StyledSelectbox>
                </Section1>
                <Section2>
                    <div>
                    <StyledSelectbox 
                        multiple={true}
                        value={healthStatusToFilterWith}
                        onChange={(event) => handleFilterHealthStatusChange(event)  }                
                    >                      
                        <option value="" >health status:</option>
                        <option value="" >do not filter</option>
                        {healthStatusOptions.map(item => {
                            return (<option key={item.value} value={item.value}>{item.text}</option>);
                        })}   
                        </StyledSelectbox>
                    </div>
                </Section2>
                <Section3>
                    <div>
                    <StyledSelectbox 
                        multiple={true}
                        value={skillLevelToFilterWith}
                        onChange={(e) => handleFilterSkillLevelChange(e)  }     
                        onMouseOver={handleMouseOver} 
                        onMouseOut={handleMouseOut}                 
                    >    
                        <option value="" >skill level:</option>
                        <option value="" >do not filter</option>  
                        {skillLevelOptions.map(item => {
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
                    <span>Dentist Id</span>
                </Column>
                <Column>
                    <span>First name</span>
                </Column>
                <Column>
                    <span>Skills</span>
                </Column>
                <Column>
                    <span>Skill level</span>
                </Column>
                <Column>
                    <span>Health status</span>
                </Column>
                <Column>
                    <span>Show as sick in views (red background) </span>
                </Column>
                <Column>
                    <span>Appointments last deleted on</span>
                </Column>
                <Column>
                    <span>Delete all appointments</span>
                </Column>
                <Column>
                    <span>Delete dentist with all appointments</span>
                </Column>
            </Headers>
            <DentistListAreaStyled>
                { dataToRenderFromUseEffectPipeline.length !== 0 ? dataToRenderFromUseEffectPipeline.map((item, id) => {
                    increment()                                          
                    return ( 
                    <DentistInDentistList index={counterOfDentistInList.current} key={id} item={item} dentists={dentists} />
                    )})
                    : 
                    <>Please hire dentists.</>
                }
            </DentistListAreaStyled>
        </DentistListStyled>  
    </Container>
    <div disabled={true}>{counterOfDentistInList.current = 0}</div>
    </>
  )
}

export default DentistList;