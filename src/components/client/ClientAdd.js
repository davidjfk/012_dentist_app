import React from 'react';
import {useState } from 'react';
import {useDispatch } from "react-redux";
import {addClient } from "../../redux/clientSlice";
import skillLevelOptions from '../../dataInDentistAppWhenDentistAppStarts/skillLevelOptions';
import paymentMethodsToAddToNewClientCreatedViaUI from '../../dataInDentistAppWhenDentistAppStarts/paymentMethodsToAddToNewClientCreatedViaUI';
import healthStatusOptions from '../../dataInDentistAppWhenDentistAppStarts/healthStatusOptions';
import {Container} from '../styles/Container.styled';
import {ClientAddStyled, Column, Form, Intro} from './ClientAdd.styled';
import {StyledButtonAroundText} from '../styles/ButtonAroundText.styled';
import {StyledInputfield} from '../styles/Inputfield.styled';
import {StyledSelectbox} from '../styles/Selectbox.styled';

import {generateRandomPersonId} from '../../utils';

const log = console.log;

const AddClient = () => {
    let [lastName, setLastName] = useState('')
    let [firstName, setFirstName] = useState('')
    let [phone, setPhone] = useState('')
    let [email, setEmail] = useState('')
    let [isSick, setIsSick] = useState('default')
    // let [skillLevel, setSkillLevel] = useState("default")
    let [paymentMethod, setPaymentMethod] = useState("default")
    let [birthYear, setBirthYear] = useState('');

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

        if (paymentMethod === 'default') {
            setPaymentMethod(paymentMethod = 'unknown') 
        } 

        if (birthYear === '') {
            setBirthYear(birthYear = 'unknown') 
        } 

        const clientId = `${lastName}-${generateRandomPersonId()}`;
        const appointmentsLastDeletedOnDateTime = "null";

        dispatch(addClient({clientId, lastName, firstName, phone, email, isSick, paymentMethod, birthYear, appointmentsLastDeletedOnDateTime }));   
        
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
        <ClientAddStyled>
            <Intro>Add Client</Intro>
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
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        name="paymentMethod"
                    > 
                        <option value="" >payment method:</option>
                        {/* <option value="default" disabled hidden>
                            Add skill level
                        </option> */}
                        {paymentMethodsToAddToNewClientCreatedViaUI.map(item => {
                            return (<option key={item.value} value={item.value}>{item.text}</option>);
                        })}
                    </StyledSelectbox>
                </Column>
                <Column>
                    <StyledInputfield
                            type='text'
                            placeholder='Add birthYear (e.g. 2001)'
                            value={birthYear}
                            onChange={(e) => setBirthYear(e.target.value)}                              
                    />
                </Column>
                <Column>
                    <StyledButtonAroundText onClick={onSubmit}>
                        Add client 
                    </StyledButtonAroundText>                  
                </Column>
            </Form>
        </ClientAddStyled>  
    </Container>
  )
}

export default AddClient 