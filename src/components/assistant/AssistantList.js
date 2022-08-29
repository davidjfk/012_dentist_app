import React from 'react'
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import skillLevelOptions from '../../dataInDentistAppWhenDentistAppStarts/skillLevelOptions';
import healthStatusOptions from '../../dataInDentistAppWhenDentistAppStarts/healthStatusOptions';
import {Container} from '../styles/Container.styled'
import AssistantInAssistantList from './AssistantInAssistantList.js'
import {AssistantListAreaStyled, AssistantListStyled, Column, FormControlArea, Headers, Intro, Section1, Section2, Section3} from './AssistantList.styled'
import {StyledSelectbox} from '../styles/Selectbox.styled';



const log = console.log;

const AssistantList = () => {
    const { assistants } = useSelector((state) => state.assistant);
    
    const [personObjectKeyToSortArrayWithPersons, setSongObjectKeyToSortArrayWithSongs] = useState('');
    const [dataToRenderFromUseEffectPipeline, setDataToRenderFromUseEffectPipeline] = useState([]);
    const [healthStatusToFilterWith, setHealthStatusToFilterWith] = useState([""]);
    const [skillLevelToFilterWith, setSkillLevelToFilterWith] = useState([""]);


    const sortAssistantList = (assistants, JsxSelectBoxAttributeValue) => {
        if (!JsxSelectBoxAttributeValue) {
            return assistants;
        }  
        let JsxSelectBoxAttributeValueAsArray = JsxSelectBoxAttributeValue.split(' ');
        let personObjectKey = JsxSelectBoxAttributeValueAsArray[0];
        let isAscending = JsxSelectBoxAttributeValueAsArray[1] === "ascending" ? true : false;

        const assistantObject = {
            assistantId: 'assistantId',
            lastName: 'lastName',
            firstName: 'firstName',
            phone: 'phone',
            email: 'email',
            isSick: 'isSick',
            skillLevel: 'skillLevel'
        };

        const sortProperty = assistantObject[personObjectKey];  
        let sortedPersons;
        if (!isAscending && (sortProperty === "skillLevel" || sortProperty === ""))  {
            sortedPersons = [...assistants].sort((person1, person2) => person2[sortProperty] - person1[sortProperty]);
            return sortedPersons;
            // numbers sort descending by default, so the !isAscending causes the skillLevel to display in an ascending fashion. 
        } else if (isAscending && (sortProperty === "skillLevel" || sortProperty === ""))  {
            sortedPersons = [...assistants].sort((person1, person2) => person2[sortProperty] - person1[sortProperty]);
            return sortedPersons.reverse();
        } else if (isAscending && (sortProperty === "assistantId" || sortProperty === "firstName" || sortProperty === "isSick")) {
            sortedPersons = [...assistants].sort((person1, person2) => person1[sortProperty].localeCompare(person2[sortProperty], 'en', { ignorePunctuation: true }));
            return sortedPersons;
            // I choose 'en' as  the unicodeLanguage.
            // unicode allows user to enter any kind of character.
        } else if (!isAscending && (sortProperty === "assistantId" || sortProperty === "firstName" || sortProperty === "isSick")) {
                sortedPersons = [...assistants].sort((person1, person2) => person1[sortProperty].localeCompare(person2[sortProperty], 'en', { ignorePunctuation: true }));
                return sortedPersons.reverse();
        } else {
            console.error(`component assistantList: not possible to sort with datatype ${typeof(sortProperty)}. Please investigate. `)
        }
    };
    



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
            let pipelineData = filterBySkillLevel(assistants, skillLevelToFilterWith);
            pipelineData = filterByHealthStatus(pipelineData, healthStatusToFilterWith);
            pipelineData = sortAssistantList(pipelineData, personObjectKeyToSortArrayWithPersons);
            setDataToRenderFromUseEffectPipeline(pipelineData);
        }, 
        [personObjectKeyToSortArrayWithPersons, skillLevelToFilterWith, healthStatusToFilterWith, assistants]
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
        <AssistantListStyled>
            <Intro>Assistants in Dentist company B.V.T. </Intro>
            <FormControlArea>
                <Section1>
                    <StyledSelectbox                  
                        onChange={(e) => setSongObjectKeyToSortArrayWithSongs(e.target.value) }                 
                    >                        
                        <option value="" >Sort by:</option>
                        <option value="" >do not sort</option>
                        <option value="assistantId ascending" >assistant id a-z</option>
                        <option value="assistantId descending" >assistant id z-a</option>
                        <option value="firstName ascending" >first name a-z</option>
                        <option value="firstName descending" >first name z-a</option>
                        <option value="isSick ascending" >health status a-z</option>
                        <option value="isSick descending" >health status z-a</option>
                        <option value="skillLevel ascending" >skill level 1-5</option>
                        <option value="skillLevel descending" >skill level 5-1</option>
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
                    {isHovering && <h3>Press Ctrl to select multiple skill levels</h3>}
                    </div>
                </Section3>
            </FormControlArea>
            <Headers>
                <Column>
                    <span>Nr</span>
                </Column>
                <Column>
                    <span>Assistant Id</span>
                </Column>
                <Column>
                    <span>First name</span>
                </Column>
                <Column>
                    <span>Skill level</span>
                </Column>
                <Column>
                    <span>Health status</span>
                </Column>
                <Column>
                    <span>Show as sick in views (orange background) </span>
                </Column>
            </Headers>
            <AssistantListAreaStyled>
                { dataToRenderFromUseEffectPipeline.length !== 0 ? dataToRenderFromUseEffectPipeline.map((item, id) => (
                        <AssistantInAssistantList key={id} item={item} assistants={assistants} />
                )): <>Please hire dental assistants.</>}
            </AssistantListAreaStyled>
        </AssistantListStyled>  
    </Container>
    </>
  )
}

export default AssistantList;