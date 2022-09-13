import { useEffect, useRef, useCallback } from "react";
import { useDispatch} from "react-redux";
import {addDentalTreatmentsArrayFromExternalSource} from "./redux/dentalTreatments";
import {addClients } from "./redux/clientSlice";
import {addDentists } from "./redux/dentistSlice";
import {addAssistants } from "./redux/assistantSlice";
import {addDayTimeClientToReduxToolkit} from "./redux/clientDayTimeSlice";
import {addDayTimeDentistToReduxToolkit} from "./redux/dentistDayTimeSlice";
import {addDayTimeAssistantToReduxToolkit} from "./redux/assistantDayTimeSlice";
import {addAppointmentToReduxToolkit} from "./redux/appointmentSlice";

import { generateAppointmentId, getNrOfRandomElementsFromArray, getRandomPersonId, getRandomDay, getRandomUniqueObjectsFromArray, getRandomTime, selectObjectsByArrayObjectKey } from './utils';
import {createCombiOfPersonAndDayAndTime, getRandomTreatmentForRandomAppointment, getRandomTreatmentTypes} from "./utils";

import clientsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/clients"
import dentistsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/dentists"
import assistantsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/assistants"
import dentalSkillsToAddToNewDentistToAutomaticallyCreateDentists from "./dataInDentistAppWhenDentistAppStarts/dentalSkillsToAddToNewDentistToAutomaticallyCreateDentists";
import appointmentPriorityLevelsAsScalarsInArray from "./dataInDentistAppWhenDentistAppStarts/appointmentPriorityLevelsAsScalarsInArray";

const Create150Appointments = () => {
    const CONFIGCHANCETHATAPPOINTMENTNEEDSASSISTANT = 0.5;  
    /*  value between 0 (included) and 1 (included). 
        The bigger the nr, the bigger the chance that the automatically generated appointment requires the precence of an assistant.
    */
    const CONFIGNROFASSISTANTS = 2; 
    const CONFIGNROFRANDOMLYGENERATEDAPPOINTMENTS = 350;
    const CONFIGNROFCLIENTS = 50;
    const CONFIGNROFDENTISTS = 4; 
    const CONFIGNROFDIFFERENTTREATMENTSASTHESKILLSOFADENTIST = 12;

    const dispatch = useDispatch();
    let randomClients = useRef([]);
    let randomDentists = useRef([]);
    let randomAssistants = useRef([]);


    const dispatchWithoutMissingDependencyError = useCallback(dispatch
      , []);


    let dentistsWithTreatmentTypesRef = useRef([]); // see comment below for explanation. 
    useEffect(() => {
        randomClients.current = getRandomUniqueObjectsFromArray(clientsDentistCompanyBVT, CONFIGNROFCLIENTS);

        dispatchWithoutMissingDependencyError(addClients(randomClients.current));
        randomDentists.current = getRandomUniqueObjectsFromArray(dentistsDentistCompanyBVT, CONFIGNROFDENTISTS);
        /*
          problem 1: "no time to go up-and-down to redux-toolkit"
          while this useEffect hook runs (with [] as a dependency) while the application starts, (e.g.) the array with dentists cannot be dispatched into redux-toolkit and 
          obtained from redux-toolkit, so that as a next step below, a set of treatmentTypes can be connected to each dentist in the array. 
          Presumed reason: the useEffect hook runs during the first render, but the "dispatching-and-getting" from redux-toolkit runs during the same first render in parallel as well 
          (and possibly takes a few more renders to complete). So the data to-and-from redux-toolkit is not available quickly enough to be of use inside this useEffect-hook below.
          
          solution: this ref 'dentistsWithTreatmentTypesRef' will be used inside comp Create150Appointments instead of the "round-about" to redux-toolkit. 
          dentistsWithTreatmentTypesRef will do 2 things:
          1. The array inside the ref 'dentistsWithTreatmentTypesRef' will be used to add a random set of treatmentTypes (skills) to each dentist. After that this array will be 
          dispatched into redux-toolkit. From that moment on redux-toolkit will be the single source of truth for the array with dentists (and their skills nested into each dentist object).
          2. In fn generateRandomAppointment() below <in read-only mode!! > dentistsWithTreatmentTypesRef is used to add 1 random skill (=== treatmentType) to each of the 150 appointments 
          that must be created when the application starts (i.e. "npm start"). 
        */
        dentistsWithTreatmentTypesRef.current.push(randomDentists.current);

        const addSkillsToAutomaticallyCreatedDentists = (dentistsWithTreatmentTypesRef, CONFIGNROFDENTISTS) => {
          for (let i = 0; i < CONFIGNROFDENTISTS; i++) {
            let skillSetOfDentist = getRandomTreatmentTypes(dentalSkillsToAddToNewDentistToAutomaticallyCreateDentists, CONFIGNROFDIFFERENTTREATMENTSASTHESKILLSOFADENTIST);
            dentistsWithTreatmentTypesRef.current[0][i].treatmentTypes = skillSetOfDentist;
          }
        }
        addSkillsToAutomaticallyCreatedDentists(dentistsWithTreatmentTypesRef, CONFIGNROFDENTISTS);
        dispatchWithoutMissingDependencyError(addDentists(dentistsWithTreatmentTypesRef.current[0]));
    

        randomAssistants.current = getRandomUniqueObjectsFromArray(assistantsDentistCompanyBVT, CONFIGNROFASSISTANTS); 
        dispatchWithoutMissingDependencyError(addAssistants(randomAssistants.current));

        dispatchWithoutMissingDependencyError(addDentalTreatmentsArrayFromExternalSource(dentalSkillsToAddToNewDentistToAutomaticallyCreateDentists));
  
      } , [dispatchWithoutMissingDependencyError] 
    );
    
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
        let day = getRandomDay()  
        let time = getRandomTime() 
        clientId = getRandomPersonId(randomClients.current, 'clientId')
        dentistId = getRandomPersonId(randomDentists.current, 'dentistId');
        let treatmentType = getRandomTreatmentForRandomAppointment(dentistId, dentistsWithTreatmentTypesRef.current[0] )

        let isAssistantNeededForAppointment = false;
        let randomNrThatDecidesIfAssistantMustBePresentAtAppointment = Math.random();
        if (randomNrThatDecidesIfAssistantMustBePresentAtAppointment < CONFIGCHANCETHATAPPOINTMENTNEEDSASSISTANT){    
            isAssistantNeededForAppointment = true;
            assistantId = getRandomPersonId(randomAssistants.current, 'assistantId');
        } 
        
        if (isAssistantNeededForAppointment) {
            if (
                isCombiOfPersonAndDayAndTimeAvailableToAutomaticallyGenerateAppointment(clientId, day, time, "client") &&
                isCombiOfPersonAndDayAndTimeAvailableToAutomaticallyGenerateAppointment(dentistId, day, time, "dentist") &&
                isCombiOfPersonAndDayAndTimeAvailableToAutomaticallyGenerateAppointment(assistantId, day, time, "assistant")
                )
            {
                let clientDayTimes = createCombiOfPersonAndDayAndTime(clientId, day, time)
                dispatch(addDayTimeClientToReduxToolkit(clientDayTimes));
                clientDayTimesRef.current.push(clientDayTimes)
  
                let dentistDayTimes = createCombiOfPersonAndDayAndTime(dentistId, day, time)
                dispatch(addDayTimeDentistToReduxToolkit(dentistDayTimes));
                dentistDayTimesRef.current.push(dentistDayTimes)

                let assistantDayTimes = createCombiOfPersonAndDayAndTime(assistantId, day, time)
                dispatch(addDayTimeAssistantToReduxToolkit(assistantDayTimes));
                assistantDayTimesRef.current.push(assistantDayTimes)

                let getClient = client => client.clientId === clientId
                let clientForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(randomClients.current, getClient)
                
                let client = (`${(clientForWhomAnAppointmentIsBeingMade[0].firstName)} ${(clientForWhomAnAppointmentIsBeingMade[0].lastName)}`)

                let getDentist = dentist => dentist.dentistId === dentistId
                let dentistForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(randomDentists.current, getDentist)
                
                let dentist = (`${(dentistForWhomAnAppointmentIsBeingMade[0].firstName)} ${(dentistForWhomAnAppointmentIsBeingMade[0].lastName)}`)

                let getAssistant = assistant => assistant.assistantId === assistantId
                let assistantForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(randomAssistants.current, getAssistant)
                
                let assistant = (`${(assistantForWhomAnAppointmentIsBeingMade[0].firstName)} ${(assistantForWhomAnAppointmentIsBeingMade[0].lastName)}`)

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
                dispatch(addAppointmentToReduxToolkit(newAppointmentObject));
                
            } else {
                generateRandomAppointment(); 
            } 
        } else {
            if (isCombiOfPersonAndDayAndTimeAvailableToAutomaticallyGenerateAppointment(clientId, day, time, "client") &&
                isCombiOfPersonAndDayAndTimeAvailableToAutomaticallyGenerateAppointment(dentistId, day, time, "dentist"))
            {
  
              let clientDayTimes = createCombiOfPersonAndDayAndTime(clientId, day, time)
              dispatch(addDayTimeClientToReduxToolkit(clientDayTimes));
              clientDayTimesRef.current.push(clientDayTimes)

              let dentistDayTimes = createCombiOfPersonAndDayAndTime(dentistId, day, time)
              dispatch(addDayTimeDentistToReduxToolkit(dentistDayTimes));
              dentistDayTimesRef.current.push(dentistDayTimes)

              let getClient = client => client.clientId === clientId
              let clientForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(randomClients.current, getClient)
              
              let client = (`${(clientForWhomAnAppointmentIsBeingMade[0].firstName)} ${(clientForWhomAnAppointmentIsBeingMade[0].lastName)}`)

              let getDentist = dentist => dentist.dentistId === dentistId
              let dentistForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(randomDentists.current, getDentist)
              
              let dentist = (`${(dentistForWhomAnAppointmentIsBeingMade[0].firstName)} ${(dentistForWhomAnAppointmentIsBeingMade[0].lastName)}`)

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
              dispatch(addAppointmentToReduxToolkit(newAppointmentObject));
                  
            } else {          
                generateRandomAppointment();
            }
        } 
    }

        const getRandomAppointmentWithoutMissingDependencyError = useCallback(generateRandomAppointment
        , []);
        
        useEffect(() => {
                const generateRandomAppointments = num => {
                  Array(num)
                      .fill(0) 
                      .map(_ => getRandomAppointmentWithoutMissingDependencyError());
                }
                generateRandomAppointments(CONFIGNROFRANDOMLYGENERATEDAPPOINTMENTS)
         
            } , [getRandomAppointmentWithoutMissingDependencyError] 
        );

    return ( 
      null
  )
}

export default Create150Appointments;