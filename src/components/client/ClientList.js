import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";

import paymentMethodsToAddToNewClientCreatedViaUI from '../../dataInDentistAppWhenDentistAppStarts/paymentMethodsToAddToNewClientCreatedViaUI';
import healthStatusOptions from '../../dataInDentistAppWhenDentistAppStarts/healthStatusOptions';

import {Container} from '../styles/Container.styled'
import ClientInClientList from './ClientInClientList.js'
import {ClientListAreaStyled, ClientListStyled, Column, FormControlArea, Headers, Intro, Section1, Section2, Section3} from './ClientList.styled'
import {StyledSelectbox} from '../styles/Selectbox.styled';


const ClientList = () => {
    const { clients } = useSelector((state) => state.client);
    
    const [personObjectKeyToSortArrayWithPersons, setPersonObjectKeyToSortArrayWithPersons] = useState('');
    const [healthStatusToFilterWith, setHealthStatusToFilterWith] = useState([""]);
    const [paymentMethodToFilterWith, setSkillLevelToFilterWith] = useState([""]);
    const [dataToRenderFromUseEffectPipeline, setDataToRenderFromUseEffectPipeline] = useState([]);
    const [isHovering, setIsHovering] = useState(false);

    const handleFilterHealthStatusChange = (event) => {    
        let value = Array.from(
            event.target.selectedOptions, (option) => option.value
        )   
        setHealthStatusToFilterWith(value);
    };
    
    const handleFilterPaymentMethodlChange = (event) => {
        let value = Array.from(
            event.target.selectedOptions, (option) => option.value
        )   
        setSkillLevelToFilterWith(value);
    };


    const sortAssistantList = (clients, sortCriteriaFromSelectboxAsSpaceSeparatedString) => {
        if (!sortCriteriaFromSelectboxAsSpaceSeparatedString) {
            return clients;
        }  
        let sortCriteriaFromSelectboxAsArray = sortCriteriaFromSelectboxAsSpaceSeparatedString.split(' ');
        let personObjectKey = sortCriteriaFromSelectboxAsArray[0];
        let isAscending = sortCriteriaFromSelectboxAsArray[1] === "ascending" ? true : false;

        const lookupTable = {
            clientId: 'clientId',
            firstName: 'firstName',
            isSick: 'isSick',
            paymentMethod: 'paymentMethod'
        };

        const sortProperty = lookupTable[personObjectKey];  
        let sortedPersons;
        if (!isAscending && (sortProperty === "paymentMethod" || sortProperty === ""))  {
            sortedPersons = [...clients].sort((person1, person2) => person1[sortProperty].localeCompare(person2[sortProperty], 'en', { ignorePunctuation: true }));
            return sortedPersons.reverse();
            // I choose 'en' as  the unicodeLanguage.
            // unicode allows user to enter any kind of character.
        } else if (isAscending && (sortProperty === "paymentMethod" || sortProperty === ""))  {
            sortedPersons = [...clients].sort((person1, person2) => person1[sortProperty].localeCompare(person2[sortProperty], 'en', { ignorePunctuation: true }));
            return sortedPersons;
        } else if (isAscending && (sortProperty === "clientId" || sortProperty === "firstName" || sortProperty === "isSick")) {
            sortedPersons = [...clients].sort((person1, person2) => person1[sortProperty].localeCompare(person2[sortProperty], 'en', { ignorePunctuation: true }));
            return sortedPersons;
        } else if (!isAscending && (sortProperty === "clientId" || sortProperty === "firstName" || sortProperty === "isSick")) {
                sortedPersons = [...clients].sort((person1, person2) => person1[sortProperty].localeCompare(person2[sortProperty], 'en', { ignorePunctuation: true }));
                return sortedPersons.reverse();
        } else {
            console.error(`component clientList: not possible to sort with datatype ${typeof(sortProperty)}. Please investigate. `)
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

    const filterByPaymentMethod = (filteredData, paymentMethodToFilterWith) => {
        let arrayFilteredOnAllCriteria = [];  
        if (paymentMethodToFilterWith[0] === "") {
        return filteredData;
        } else {
            let  copyOfFilteredData = [...filteredData];
            let arrayFilteredOnOneCriterium;
            for (let ratingcriterium of paymentMethodToFilterWith) {
                arrayFilteredOnOneCriterium = copyOfFilteredData.filter(
                    (personObject) =>           
                    personObject.paymentMethod === ratingcriterium
                );
                arrayFilteredOnAllCriteria.push(...arrayFilteredOnOneCriterium)
            }
            return arrayFilteredOnAllCriteria;
        }
    };

    useEffect(() => {
            let pipelineData = filterByPaymentMethod(clients, paymentMethodToFilterWith);
            pipelineData = filterByHealthStatus(pipelineData, healthStatusToFilterWith);
            pipelineData = sortAssistantList(pipelineData, personObjectKeyToSortArrayWithPersons);
            setDataToRenderFromUseEffectPipeline(pipelineData);
        }, 
        [personObjectKeyToSortArrayWithPersons, paymentMethodToFilterWith, healthStatusToFilterWith, clients]
    );


    const handleMouseOver = () => {
      setIsHovering(true);
    };
  
    const handleMouseOut = () => {
      setIsHovering(false);
    };

    let counterOfClientInList = useRef(0);
    function increment() {
        counterOfClientInList.current +=1;
    }

    return (
    <>
    <Container> 
        <ClientListStyled>
            <Intro>Clients in Dentist company B.V.T. </Intro>
            <FormControlArea>
                <Section1>
                    <StyledSelectbox                  
                        onChange={(e) => setPersonObjectKeyToSortArrayWithPersons(e.target.value) }                 
                    >                        
                        <option value="" >Sort by:</option>
                        <option value="" >do not sort</option>
                        <option value="clientId ascending" >client id a-z</option>
                        <option value="clientId descending" >client id z-a</option>
                        <option value="firstName ascending" >first name a-z</option>
                        <option value="firstName descending" >first name z-a</option>
                        <option value="isSick ascending" >health status a-z</option>
                        <option value="isSick descending" >health status z-a</option>
                        <option value="paymentMethod ascending" >payment method a-z</option>
                        <option value="paymentMethod descending" > payment method z-a</option>
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
                        value={paymentMethodToFilterWith}
                        onChange={(e) => handleFilterPaymentMethodlChange(e)  }     
                        onMouseOver={handleMouseOver} 
                        onMouseOut={handleMouseOut}                 
                    >    
                        <option value="" >payment method:</option>
                        <option value="" >do not filter</option>  
                        {paymentMethodsToAddToNewClientCreatedViaUI.map(item => {
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
                    <span>Client Id</span>
                </Column>
                <Column>
                    <span>First name</span>
                </Column>
                <Column>
                    <span>Payment method</span>
                </Column>
                <Column>
                    <span>Health status</span>
                </Column>
                <Column>
                    <span>Show as sick in views (purple background)</span>
                </Column>
                <Column>
                    <span>Appointments last deleted on</span>
                </Column>
                <Column>
                    <span>Delete all appointments</span>
                </Column>
                <Column>
                    <span>Delete client with all appointments</span>
                </Column>
            </Headers>
            <ClientListAreaStyled>
                { dataToRenderFromUseEffectPipeline.length !== 0 ? dataToRenderFromUseEffectPipeline.map((item, id) => {
                    increment()                                          
                    return ( 
                    <ClientInClientList index={counterOfClientInList.current} key={id} item={item} clients={clients} />
                    )})
                    : 
                    <>Please attract clients.</>
                }
            </ClientListAreaStyled>
        </ClientListStyled>  
    </Container>
    <div disabled={true}>{counterOfClientInList.current = 0}</div>
    </>
  )
}

export default ClientList;