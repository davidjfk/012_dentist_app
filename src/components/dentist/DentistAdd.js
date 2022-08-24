import React from 'react';
import {useState } from 'react';
import {useDispatch } from "react-redux";
import {addDentist } from "../../redux/dentistSlice";
import skillLevelOptions from '../../dataInDentistAppWhenDentistAppStarts/skillLevelOptions';
import dentalSkillsToAddToNewDentistCreatedViaUI from '../../dataInDentistAppWhenDentistAppStarts/dentalSkillsToAddToNewDentistCreatedViaUI';
import healthStatusOptions from '../../dataInDentistAppWhenDentistAppStarts/healthStatusOptions';
import {Container} from '../styles/Container.styled';
import {DentistAddStyled, Column, Form, Intro} from './DentistAdd.styled';
import {StyledButtonAroundText} from '../styles/ButtonAroundText.styled';
import {StyledInputfield} from '../styles/Inputfield.styled';
import {StyledSelectbox} from '../styles/Selectbox.styled';

import {generateRandomPersonId} from '../../utils';

const log = console.log;

const AddDentist = () => {
    let [lastName, setLastName] = useState('')
    let [firstName, setFirstName] = useState('')
    let [phone, setPhone] = useState('')
    let [email, setEmail] = useState('')
    let [isSick, setIsSick] = useState('default')
    let [skillLevel, setSkillLevel] = useState("default")
    let [skillsOfDentist, setSkillsOfDentist] = useState([]);

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault()
    
        if (!lastName || !firstName) {
          alert('Please add a song lastName and firstName')
          return
        }   

        if (skillsOfDentist.length === 0) {
            alert('Please add a skill')
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

        // replace with code from winc-react-assistant: 
        const dentistId = `${lastName}-${generateRandomPersonId()}`;

        let treatmentTypes = skillsOfDentist;
        dispatch(addDentist({dentistId, lastName, firstName, phone, email, isSick, skillLevel, treatmentTypes }));   
        
        // now reset the form for the next use:
        // setLastName('')
        // setFirstName('')
        // setPhone('')
        // setEmail('')
        // setIsSick('')
        // setRating('')
        // setSkillLevel('');
        setSkillsOfDentist("");


    }

    const handleAddSkillsToDentist = (event) => {
        let value = Array.from(
            event.target.selectedOptions, (option) => option.value
        )   
        setSkillsOfDentist(value);
    };

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
      setIsHovering(true);
    };
  
    const handleMouseOut = () => {
      setIsHovering(false);
    };

  return (
    <Container> 
        <DentistAddStyled>
            <Intro>Add Dentist</Intro>
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
                        <option value="">skill level:</option>
                        {/* <option value="default" disabled hidden>
                            Add skill level
                        </option> */}
                        {skillLevelOptions.map(item => {
                            return (<option key={item.value} value={item.value}>{item.text}</option>);
                        })}
                    </StyledSelectbox>
                </Column>

                <Column>        
                    <div>
                    <StyledSelectbox 
                        multiple={true}
                        value={skillsOfDentist}
                        onChange={(e) => handleAddSkillsToDentist(e)  }     
                        onMouseOver={handleMouseOver} 
                        onMouseOut={handleMouseOut}                 
                    >    
                        <option value="" >skills:</option>
                        {/* <option value="" >do not filter</option>   */}
                        {dentalSkillsToAddToNewDentistCreatedViaUI.map(item => {
                            return (<option key={item.value} value={item.value}>{item.text}</option>);
                        })}
                    </StyledSelectbox>
                    {isHovering && <h5>Press Ctrl to select multiple skills</h5>}
                    </div>
                </Column>

                <Column>
                    <StyledButtonAroundText onClick={onSubmit}>
                        Add dentist 
                    </StyledButtonAroundText>                  
                </Column>
            </Form>
        </DentistAddStyled>  
    </Container>
  )
}

export default AddDentist 