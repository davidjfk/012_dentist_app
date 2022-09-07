import React from "react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./App.css";

import clientsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/clients"
import dentistsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/dentists"
import assistantsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/assistants"
import dentalSkillsToAddToNewDentistToAutomaticallyCreateDentists from "./dataInDentistAppWhenDentistAppStarts/dentalSkillsToAddToNewDentistToAutomaticallyCreateDentists";
import appointmentPriorityLevelsAsScalarsInArray from "./dataInDentistAppWhenDentistAppStarts/appointmentPriorityLevelsAsScalarsInArray";

import {addClients } from "./redux/clientSlice";
import {addDentists } from "./redux/dentistSlice";
import {addAssistants } from "./redux/assistantSlice";
import {addDayTimeClient} from "./redux/clientDayTimeSlice";
import {addDayTimeDentist} from "./redux/dentistDayTimeSlice";
import {addDayTimeAssistant} from "./redux/assistantDayTimeSlice";
import {addAppointment } from "./redux/appointmentSlice";
// import {addAppointsments} from "./redux/appointmentSlice";
import {addDentalTreatmentsArrayFromExternalSource} from "./redux/dentalTreatments";
// import {addDentalTreatmentsAsSkillSetToDentist} from  "./redux/dentistSlice"

import { generateAppointmentId, getNrOfRandomElementsFromArray, getRandomPersonId, getRandomDay, getRandomPersons, getRandomUniqueObjectsFromArray, getRandomTime, selectObjectsByArrayObjectKey } from './utils';

import {createCombiOfPersonAndDayAndTime, getRandomTreatmentForRandomAppointment, getRandomTreatmentTypes} from "./utils";

const log = console.log;


const Create150Appointments = () => {
    const CONFIGCHANCETHATAPPOINTMENTNEEDSASSISTANT = 0.5;  
    /*  value between 0 (included) and 1 (included). 
        The bigger the nr, the bigger the chance that the automatically generated appointment requires the precence of an assistant.
    */
    const CONFIGNROFASSISTANTS = 4; 
    const CONFIGNROFRANDOMLYGENERATEDAPPOINTMENTS = 150;
    const CONFIGNROFCLIENTS = 50;
    const CONFIGNROFDENTISTS = 4; 
    const CONFIGNROFDIFFERENTTREATMENTSASTHESKILLSOFADENTIST = 12;

    const dispatch = useDispatch();
    // helper variables (only accessible inside the useEffect hook below)
    let randomClients;
    let randomDentists;
    let randomAssistants;
    let dentistsWithTreatmentTypesRef = useRef([]); // see comment below for explanation. 
    useEffect(() => {
        randomClients = getRandomUniqueObjectsFromArray(clientsDentistCompanyBVT, CONFIGNROFCLIENTS);
        dispatch(addClients(randomClients));
        randomDentists = getRandomUniqueObjectsFromArray(dentistsDentistCompanyBVT, CONFIGNROFDENTISTS);
        /*
          problem 1: "no time to go up-and-down to redux-toolkit"
          while this useEffect hook runs (with [] as a dependency) while the application starts, (e.g.) the array with dentists cannot be dispatched into redux-toolkit and obtained from redux-toolkit, so next, a set of treatmentTypes can be connected to each dentist in the array. Reason: the useEffect hook runs during the first render, but the "dispatching-and-getting" from redux-toolkit runs during the same first render in parallel as well (and possibly takes a few more renders to complete). So the data to-and-from redux-toolkit is not available quickly enough to be of use inside this useEffect-hook.
          
          solution: this ref 'dentistsWithTreatmentTypesRef' will be used inside comp App instead of the "round-about" to redux-toolkit. 
          dentistsWithTreatmentTypesRef will do 2 things:
          1. The array inside the ref 'dentistsWithTreatmentTypesRef' will be used to add a random set of treatmentTypes (skills) to each dentist. After that this array will be dispatched into redux-toolkit. From that moment on redux-toolkit will be the single source of truth for the array with dentists (and their skills nested into each dentist object).
          2. In fn generateRandomAppointment() below <in read-only mode!! > dentistsWithTreatmentTypesRef is used to add a treatmentType to each of the 150 appointments that must be created. 

          alternative solution: add the treatmentTypes below to the helper variable randomDentists. Then dispatch(addDentists(randomDentists)); Then access the dentist data from redux-toolkit below this useEffect-hook, instead of accessing the dentist data from useRef dentistsWithTreatmentTypesRef.
        */
        dentistsWithTreatmentTypesRef.current.push(randomDentists);

        const addSkillsToAutomaticallyCreatedDentists = (dentistsWithTreatmentTypesRef, CONFIGNROFDENTISTS) => {
          for (let i = 0; i < CONFIGNROFDENTISTS; i++) {
            let skillSetOfDentist = getRandomTreatmentTypes(dentalSkillsToAddToNewDentistToAutomaticallyCreateDentists, CONFIGNROFDIFFERENTTREATMENTSASTHESKILLSOFADENTIST);
            dentistsWithTreatmentTypesRef.current[0][i].treatmentTypes = skillSetOfDentist;
          }
        }
        addSkillsToAutomaticallyCreatedDentists(dentistsWithTreatmentTypesRef, CONFIGNROFDENTISTS);
        dispatch(addDentists(dentistsWithTreatmentTypesRef.current[0]));
    

        randomAssistants = getRandomUniqueObjectsFromArray(assistantsDentistCompanyBVT, CONFIGNROFASSISTANTS); 
        dispatch(addAssistants(randomAssistants));

        dispatch(addDentalTreatmentsArrayFromExternalSource(dentalSkillsToAddToNewDentistToAutomaticallyCreateDentists));
  
      } , [] 
    );
    /* 
      note to self: 
      goal: access the treatmentTypes inside the dentist objects, so I can add 1 random skill (=== treatmentType) to 
      each of the 150 randomly generated appoinments inside fn generateAppointment() below. (A set of random treatmentTypes have just been added to each dentist inside the useEffect hook above). 

      problem 2:following line will log undefined, because randomDentists is a helper variable.  useRef nor useState are used to make this variable persist across re-renders. 
    */ 
      // log(randomDentists);
    /*  
      solution: use useRef, just like for e.g. clientDayTimesRef below. 
      status: the useRef from useEffect above works, so now the treatment types inside each dentist object are accessible (after the 3rd render).
        log(dentistsWithTreatmentTypesRef)
    */
      // log(dentistsWithTreatmentTypesRef.current)
    
    let clientDayTimesRef = useRef([]);
    let dentistDayTimesRef = useRef([]);
    let assistantDayTimesRef = useRef([]);
    
    function isCombiOfPersonAndDayAndTimeAvailableToAutomaticallyGenerateAppointment (personId, day, time, personType) {
        let arrayWithDayAndTimeCombinationsThatAreTaken = [];
        let isUniqueValue = false;
        switch (personType) {
            case 'client':
                arrayWithDayAndTimeCombinationsThatAreTaken = clientDayTimesRef.current; 
                break;
            case 'dentist':
                arrayWithDayAndTimeCombinationsThatAreTaken = dentistDayTimesRef.current; 
                break;
            case 'assistant':
                arrayWithDayAndTimeCombinationsThatAreTaken = assistantDayTimesRef.current; 
                break;
            default:
                console.error(`this ${personType} does not exist`)
                break;  
        }
        let PersonIdAndDayAndTimeCombi = personId +"_" + day + "_" + time;
        isUniqueValue = !arrayWithDayAndTimeCombinationsThatAreTaken.includes(PersonIdAndDayAndTimeCombi) 
        return isUniqueValue;
    }
        
    function generateRandomAppointment () {
        let assistantId;
        let clientId;
        let dentistId;
        let personType;
        let day = getRandomDay()  
        let time = getRandomTime() 
        clientId = getRandomPersonId(randomClients, 'clientId')
        dentistId = getRandomPersonId(randomDentists, 'dentistId');
        let treatmentType = getRandomTreatmentForRandomAppointment(dentistId, dentistsWithTreatmentTypesRef.current[0] )
        // log(treatmentType)

        let isAssistantNeededForAppointment = false;
        let randomNrThatDecidesIfAssistantMustBePresentAtAppointment = Math.random();
        if (randomNrThatDecidesIfAssistantMustBePresentAtAppointment < CONFIGCHANCETHATAPPOINTMENTNEEDSASSISTANT){    
            isAssistantNeededForAppointment = true;
            assistantId = getRandomPersonId(randomAssistants, 'assistantId');
        } 
        
        if (isAssistantNeededForAppointment) {
            if (
                isCombiOfPersonAndDayAndTimeAvailableToAutomaticallyGenerateAppointment(clientId, day, time, personType="client") &&
                isCombiOfPersonAndDayAndTimeAvailableToAutomaticallyGenerateAppointment(dentistId, day, time, personType = "dentist") &&
                isCombiOfPersonAndDayAndTimeAvailableToAutomaticallyGenerateAppointment(assistantId, day, time, personType = "assistant")
                )
            {
                let clientDayTimes = createCombiOfPersonAndDayAndTime(clientId, day, time)
                dispatch(addDayTimeClient(clientDayTimes));
                clientDayTimesRef.current.push(clientDayTimes)
  
                let dentistDayTimes = createCombiOfPersonAndDayAndTime(dentistId, day, time)
                dispatch(addDayTimeDentist(dentistDayTimes));
                dentistDayTimesRef.current.push(dentistDayTimes)

                let assistantDayTimes = createCombiOfPersonAndDayAndTime(assistantId, day, time)
                dispatch(addDayTimeAssistant(assistantDayTimes));
                assistantDayTimesRef.current.push(assistantDayTimes)

                let getClient = client => client.clientId === clientId
                let clientForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(randomClients, getClient)
                
                // variable client inside obj appointment is derived data from  the object client.
                let client = (`${(clientForWhomAnAppointmentIsBeingMade[0].firstName)} ${(clientForWhomAnAppointmentIsBeingMade[0].lastName)}`)

                let getDentist = dentist => dentist.dentistId === dentistId
                let dentistForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(randomDentists, getDentist)
                
                // variable dentist inside obj appointment is derived data from  the object dentist.
                let dentist = (`${(dentistForWhomAnAppointmentIsBeingMade[0].firstName)} ${(dentistForWhomAnAppointmentIsBeingMade[0].lastName)}`)

                let getAssistant = assistant => assistant.assistantId === assistantId
                let assistantForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(randomAssistants, getAssistant)
                
                // variable assistant inside obj appointment is derived data from  the object assistant.
                let assistant = (`${(assistantForWhomAnAppointmentIsBeingMade[0].firstName)} ${(assistantForWhomAnAppointmentIsBeingMade[0].lastName)}`)
                // log(dentistsWithTreatmentTypesRef.current[0])

                // let appointmentId = generateRandomAppointmentId();
                let appointmentId = generateAppointmentId(clientId, day, time);
                let appointmentPriority = getNrOfRandomElementsFromArray(appointmentPriorityLevelsAsScalarsInArray, 1).toString();
                let appointmentLastUpdatedOnDateTime = null;

                let newAppointmentObject = {
                  appointmentId, 
                  appointmentPriority,
                  assistantId, 
                  appointmentLastUpdatedOnDateTime,
                  assistant, 
                  client, 
                  clientId, 
                  day, 
                  dentist, 
                  dentistId, 
                  time, 
                  treatmentType
                }; 
                dispatch(addAppointment(newAppointmentObject));
                
            } else {
                // console.log('the else way 1')
                generateRandomAppointment(); 
                  
            } 
        } else {
            if (isCombiOfPersonAndDayAndTimeAvailableToAutomaticallyGenerateAppointment(clientId, day, time, personType = "client") &&
                isCombiOfPersonAndDayAndTimeAvailableToAutomaticallyGenerateAppointment(dentistId, day, time, personType = "dentist"))
            {
  
              let clientDayTimes = createCombiOfPersonAndDayAndTime(clientId, day, time)
              dispatch(addDayTimeClient(clientDayTimes));
              clientDayTimesRef.current.push(clientDayTimes)

              let dentistDayTimes = createCombiOfPersonAndDayAndTime(dentistId, day, time)
              dispatch(addDayTimeDentist(dentistDayTimes));
              dentistDayTimesRef.current.push(dentistDayTimes)

              let getClient = client => client.clientId === clientId
              let clientForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(randomClients, getClient)
              
              // variable client inside obj appointment is derived data from  the object client.
              let client = (`${(clientForWhomAnAppointmentIsBeingMade[0].firstName)} ${(clientForWhomAnAppointmentIsBeingMade[0].lastName)}`)

              let getDentist = dentist => dentist.dentistId === dentistId
              let dentistForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(randomDentists, getDentist)
              
              // variable dentist inside obj appointment is derived data from  the object dentist.
              let dentist = (`${(dentistForWhomAnAppointmentIsBeingMade[0].firstName)} ${(dentistForWhomAnAppointmentIsBeingMade[0].lastName)}`)

              // let appointmentId = generateRandomAppointmentId();
              let appointmentId = generateAppointmentId(clientId, day, time);
              let appointmentPriority = getNrOfRandomElementsFromArray(appointmentPriorityLevelsAsScalarsInArray, 1).toString();
              let appointmentLastUpdatedOnDateTime = null;


              let newAppointmentObject = {
                appointmentId, 
                appointmentPriority,
                assistantId:null, 
                assistant:null, 
                appointmentLastUpdatedOnDateTime,
                client, 
                clientId, 
                day, 
                dentist, 
                dentistId, 
                time, 
                treatmentType
              };
              dispatch(addAppointment(newAppointmentObject));
                  
            } else {          
                generateRandomAppointment();
            }
        } 
    }
        
        useEffect(() => {
              
                const generateRandomAppointments = num => {
                  Array(num)
                      .fill(0) 
                      .map(_ => generateRandomAppointment());
                }
                generateRandomAppointments(CONFIGNROFRANDOMLYGENERATEDAPPOINTMENTS)
  
            } , [] 
        );

  let appointmentsfromReduxToolkit = useSelector((state) => state.appointment)
  
  // log(appointmentsfromReduxToolkit.appointments.length)


    return (
       
        null

  )
}

export default Create150Appointments;