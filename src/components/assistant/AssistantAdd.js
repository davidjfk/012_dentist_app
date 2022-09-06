import React from 'react';
import {useState } from 'react';
import {useDispatch } from "react-redux";

import {addAssistant } from "../../redux/assistantSlice";

import skillLevelOptions from '../../dataInDentistAppWhenDentistAppStarts/skillLevelOptions';
import healthStatusOptions from '../../dataInDentistAppWhenDentistAppStarts/healthStatusOptions';

import {generateRandomPersonId} from '../../utils';

import {Container} from '../styles/Container.styled';
import {AssistantAddStyled, Column, Form, Intro} from './AssistantAdd.styled';
import {StyledButtonAroundText} from '../styles/ButtonAroundText.styled';
import {StyledInputfield} from '../styles/Inputfield.styled';
import {StyledSelectbox} from '../styles/Selectbox.styled';



const log = console.log;

const AddAssistant = () => {
    let [lastName, setLastName] = useState('')
    let [firstName, setFirstName] = useState('')
    let [phone, setPhone] = useState('')
    let [email, setEmail] = useState('')
    let [isSick, setIsSick] = useState('default')
    let [skillLevel, setSkillLevel] = useState("default")

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault()
    
        if (!lastName || !firstName) {
          alert('Please add a song lastName and firstName')
          return
        }   

        if (phone === 'default') {
            setPhone(phone = 'unknown') 
        } 

        if (email === 'default') {
            setEmail(email = 'unknown') 
        } 

        if (isSick === 'default') {
            setIsSick(isSick = 'unknown') 
        } 

        if (skillLevel === 'default') {
            setSkillLevel(skillLevel = 'unknown') 
        } 

        const assistantId = `${lastName}-${generateRandomPersonId()}`;
        let appointmentsDeletedOnDateTime = "null";
        dispatch(addAssistant({assistantId, email, firstName, isSick, lastName, phone, skillLevel, appointmentsDeletedOnDateTime}));   
        
        // now reset the form for the next use:
        // setLastName('')
        // setFirstName('')
        // setPhone('')
        // setEmail('')
        // setIsSick('')
        // setRating('')
    }

  return (
    <Container> 
        <AssistantAddStyled>
            <Intro>Add Assistant</Intro>
            <Form>
                <Column>
                    <StyledInputfield
                            type='text'
                            placeholder='Add surname'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}                              
                    />
                </Column>
                <Column>
                    <StyledInputfield
                            type='text'
                            placeholder='Add first name'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} 
                        />
                </Column>
                <Column>
                    <StyledInputfield
                            type='text'
                            placeholder='Add phone nr'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}                              
                    />
                </Column>
                <Column>
                    <StyledInputfield
                            type='text'
                            placeholder='Add email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                </Column>
                <Column>
                    <StyledSelectbox 
                        value={isSick}
                        onChange={(e) => setIsSick(e.target.value)}
                        name="isSick"
                    > 
                        <option value="default" disabled hidden>
                            Add health status
                        </option>
                       {healthStatusOptions.map(item => {
                            return (<option key={item.value} value={item.value}>{item.text}</option>);
                        })}                   
                    </StyledSelectbox>

                </Column>
                <Column>
                    <StyledSelectbox 
                        value={skillLevel}
                        onChange={(e) => setSkillLevel(e.target.value)}
                        name="skillLevel"
                    > 
                        <option value="" >skill level:</option>
                        {/* <option value="default" disabled hidden>
                            Add skill level
                        </option> */}
                        {skillLevelOptions.map(item => {
                            return (<option key={item.value} value={item.value}>{item.text}</option>);
                        })}
                    </StyledSelectbox>
                </Column>
                <Column>
                    <StyledButtonAroundText onClick={onSubmit}>
                        Add assistant 
                    </StyledButtonAroundText>                  
                </Column>
            </Form>
        </AssistantAddStyled>  
    </Container>
  )
}

export default AddAssistant 