import clientsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/clients"
import dentistsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/dentists"
import assistantsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/assistants"

import {addAppointment} from "./redux/appointmentSlice";
import {addDayTimeClient} from "./redux/clientDayTimeSlice";
import {addDayTimeDentist} from "./redux/dentistDayTimeSlice";
import {addDayTimeAssistant} from "./redux/assistantDayTimeSlice";

export const log = console.log;

/*
createAppointment  ------------------------------------------------
createCombiOfPersonAndDayAndTime
deleteAllAppointmentsOfPerson
deleteDentalAppointment
formatTime
generateAppointmentId
generateRandomPersonId
generateRandomAppointmentId
generateRandomAppointmentFromWinc
generateRandomAppointmentsFromWinc
getAppointmentObject
getAppointmentId
getAssistantId
getClientId
getDentistId
getArrayObjectWithObjectKeyValuePair
getNrOfRandomElementsFromArray
getRandomDay
getRandomName
getRandomPaymentMethod (not in use)
getRandomPersonId
getRandomPersonIdOld
getRandomPersons
getRandomUniqueObjectsFromArray
getRandomTime
getRandomTreatmentForRandomAppointment
getRandomTreatmentTypes
getSystemDatePlusTime
isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI
isValidWorkingDay
isValidWorkingTime
loadSelectboxWithListOf
selectObjectsByArrayObjectKey
sortArrayWithObjects
updateAppointment_Phase1of2_DisplayComponentUpdateAppointment
updateAppointment_Phase2of2_updateAppointmentRecursivelyUntilUpdateSucceeds
*/



export function createAppointment (
  clientId, 
  treatmentType,
  appointmentPriority,
  day, 
  time, 
  dentistId, 
  assistantId,    
  appointmentLastUpdatedOnDateTime,         
  clientsFromReduxToolkit, 
  dentistsFromReduxToolkit, 
  assistantsFromReduxToolkit, 
  clientDayTimesFromReduxToolkit, 
  dentistDayTimesFromReduxToolkit, 
  assistantDayTimesFromReduxToolkit, 
  dispatch
  ) {
  let getDentist = dentist => dentist.dentistId === dentistId
  let dentistForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(dentistsFromReduxToolkit.dentists, getDentist)  
  let skillsOfDentistForWhomAnAppointmentIsBeingMade = (dentistForWhomAnAppointmentIsBeingMade[0].treatmentTypes)
  if(skillsOfDentistForWhomAnAppointmentIsBeingMade.includes(treatmentType)) {
    log(`Dentist ${dentistId} has the required skill to treat client ${clientId} `) 
  } else {
    console.warn(`Dentist ${dentistId} does not have the required skill to treat client ${clientId} `)
    alert(`Dentist ${dentistId} does not have the required skill to treat client ${clientId} `);
    return; 
  } 

  if (assistantId !== "") {
      if (
          isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
            clientId, 
            day, 
            time, 
            "client",  
            clientDayTimesFromReduxToolkit, 
            dentistDayTimesFromReduxToolkit, 
            assistantDayTimesFromReduxToolkit) &&
          isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
            dentistId, 
            day, 
            time, 
            "dentist",  
            clientDayTimesFromReduxToolkit, 
            dentistDayTimesFromReduxToolkit, 
            assistantDayTimesFromReduxToolkit) &&
          isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
            assistantId, 
            day, 
            time, 
            "assistant",  
            clientDayTimesFromReduxToolkit, 
            dentistDayTimesFromReduxToolkit, 
            assistantDayTimesFromReduxToolkit)
          )
      {
     
          let clientDayTimes = createCombiOfPersonAndDayAndTime(clientId, day, time)
          dispatch(addDayTimeClient(clientDayTimes));

          let dentistDayTimes = createCombiOfPersonAndDayAndTime(dentistId, day, time)
          dispatch(addDayTimeDentist(dentistDayTimes));

          let assistantDayTimes = createCombiOfPersonAndDayAndTime(assistantId, day, time)
          dispatch(addDayTimeAssistant(assistantDayTimes));

          let getClient = client => client.clientId === clientId
          let clientForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(clientsFromReduxToolkit.clients, getClient)
                             
          let client = (`${(clientForWhomAnAppointmentIsBeingMade[0].firstName)} ${(clientForWhomAnAppointmentIsBeingMade[0].lastName)}`)

          let getDentist = dentist => dentist.dentistId === dentistId
          let dentistForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(dentistsFromReduxToolkit.dentists, getDentist)
          
          let dentist = (`${(dentistForWhomAnAppointmentIsBeingMade[0].firstName)} ${(dentistForWhomAnAppointmentIsBeingMade[0].lastName)}`)

          let assistant;  
          if (assistantId !== null) {
            let getAssistant = assistant => assistant.assistantId === assistantId
            let assistantForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(assistantsFromReduxToolkit.assistants, getAssistant)

            assistant = (`${(assistantForWhomAnAppointmentIsBeingMade[0].firstName)} ${(assistantForWhomAnAppointmentIsBeingMade[0].lastName)}`)
          }

          let appointmentId = generateAppointmentId(clientId, day, time);

          let newAppointmentObject = {
            appointmentId, 
            appointmentLastUpdatedOnDateTime,
            appointmentPriority,
            assistant,
            assistantId, 
            client, 
            clientId, 
            day, 
            dentist, 
            dentistId, 
            time, 
            treatmentType, 
          }; 
          dispatch(addAppointment(newAppointmentObject));
          console.log(`create: new (not updating an existing  one) appointment with id: ${appointmentId} (on day ${day} and time ${time} o'clock) has been added to redux-toolkit appointmentSlice.`)
      } 
      else {    
        
          let warning = `The following persons already have appointment on on day ${day} and ${time} o'clock: `;

           if (!
            isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
              clientId, 
              day, 
              time, 
              "client",  
              clientDayTimesFromReduxToolkit, 
              dentistDayTimesFromReduxToolkit, 
              assistantDayTimesFromReduxToolkit)){
                warning += ` client ${clientId}, `
                log(warning)
            }


            if( !isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
              dentistId, 
              day, 
              time, 
              "dentist",  
              clientDayTimesFromReduxToolkit, 
              dentistDayTimesFromReduxToolkit, 
              assistantDayTimesFromReduxToolkit)){
                warning += ` dentist ${dentistId}, `
            }
              
              
            if(! isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
              assistantId, 
              day, 
              time, 
              "assistant",  
              clientDayTimesFromReduxToolkit, 
              dentistDayTimesFromReduxToolkit, 
              assistantDayTimesFromReduxToolkit)){
                warning += ` assistant ${assistantId}.`
            }

          alert(warning);
          return;
      }
  } else {
      if (isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
        clientId, 
        day, 
        time, 
        "client",  
        clientDayTimesFromReduxToolkit, 
        dentistDayTimesFromReduxToolkit, 
        assistantDayTimesFromReduxToolkit) &&
          isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
            dentistId, 
            day, 
            time, 
            "dentist",  
            clientDayTimesFromReduxToolkit, 
            dentistDayTimesFromReduxToolkit, 
            assistantDayTimesFromReduxToolkit))
      {

        let clientDayTimes = createCombiOfPersonAndDayAndTime(clientId, day, time)
        dispatch(addDayTimeClient(clientDayTimes));

        let dentistDayTimes = createCombiOfPersonAndDayAndTime(dentistId, day, time)
        dispatch(addDayTimeDentist(dentistDayTimes));

        let getClient = client => client.clientId === clientId
        let clientForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(clientsFromReduxToolkit.clients, getClient)
        
        let client = (`${(clientForWhomAnAppointmentIsBeingMade[0].firstName)} ${(clientForWhomAnAppointmentIsBeingMade[0].lastName)}`)

        let getDentist = dentist => dentist.dentistId === dentistId
        let dentistForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(dentistsFromReduxToolkit.dentists, getDentist)

        let dentist = (`${(dentistForWhomAnAppointmentIsBeingMade[0].firstName)} ${(dentistForWhomAnAppointmentIsBeingMade[0].lastName)}`)

        let appointmentId = generateAppointmentId(clientId, day, time);
        
        let newAppointmentObject = {
          appointmentId, 
          appointmentLastUpdatedOnDateTime,
          appointmentPriority,
          assistant:null,
          assistantId:null, 
          client, 
          clientId, 
          day, 
          dentist, 
          dentistId, 
          time, 
          treatmentType, 
        };
        dispatch(addAppointment(newAppointmentObject));  
        console.log(`create: new (not updating an existing  one) appointment with id: ${appointmentId} (on day ${day} and time ${time} o'clock) has been added to redux-toolkit appointmentSlice.`)
      }
      else {            
        let warning = `The following persons already have appointment on on day ${day} and ${time} o'clock: `;

        if (!
         isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
           clientId, 
           day, 
           time, 
           "client",  
           clientDayTimesFromReduxToolkit, 
           dentistDayTimesFromReduxToolkit, 
           assistantDayTimesFromReduxToolkit)){
             warning += ` client ${clientId}, `
             log(warning)
         }


         if( !isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
           dentistId, 
           day, 
           time, 
           "dentist",  
           clientDayTimesFromReduxToolkit, 
           dentistDayTimesFromReduxToolkit, 
           assistantDayTimesFromReduxToolkit)){
             warning += ` dentist ${dentistId}. `
         }

       alert(warning);
       return;
      }
  } 
} 


export const createCombiOfPersonAndDayAndTime = (personId, day, time) => personId + "_" + day + "_" + time;


export const deleteAllAppointmentsOfPerson = (
  typeOfPersonId, //3 flavors: 'assistantId', 'clientId' or 'dentistId'.
  idOfPerson, // is a "foreign key" in array with appointments.
  appointmentsfromReduxToolkit, 
  deleteAppointmentInReduxToolkit, 
  deleteDayTimeClient, 
  deleteDayTimeDentist, 
  deleteDayTimeAssistant, 
  dispatch) => {
    let getAppointment = appointment => appointment[typeOfPersonId] === idOfPerson
    let appointmentsToDelete = selectObjectsByArrayObjectKey(appointmentsfromReduxToolkit, getAppointment)
    let appointmentsToDeleteCopy = [...appointmentsToDelete];
    appointmentsToDeleteCopy.forEach(appointmentToDelete => {
        let appointmentId = appointmentToDelete.appointmentId;
        if (appointmentsToDelete.length !== 0){
            deleteDentalAppointment(
                appointmentId, // is "primary key" in array with appointments.
                appointmentsfromReduxToolkit, 
                deleteAppointmentInReduxToolkit,
                deleteDayTimeClient, 
                deleteDayTimeDentist, 
                deleteDayTimeAssistant, 
                dispatch)  
        }
    })            
} 



export const deleteDentalAppointment = (
  appointmentId, 
  appointmentsfromReduxToolkit, 
  deleteAppointmentInReduxToolkit, 
  deleteDayTimeClient, 
  deleteDayTimeDentist, 
  deleteDayTimeAssistant, 
  dispatch) => {
  let appointmentThatIsAboutToBeDeleted = getArrayObjectWithObjectKeyValuePair("appointmentId", appointmentId, appointmentsfromReduxToolkit)
  let {clientId, day, time, dentistId, assistantId} = appointmentThatIsAboutToBeDeleted[0];
  let clientDayTimes  = createCombiOfPersonAndDayAndTime(clientId, day, time)
  dispatch(deleteDayTimeClient(clientDayTimes));
  
  let dentistDayTimes = createCombiOfPersonAndDayAndTime(dentistId, day, time)
  dispatch(deleteDayTimeDentist(dentistDayTimes));

  if (assistantId !== null) {
      let assistantDayTimes = createCombiOfPersonAndDayAndTime(assistantId, day, time)
      dispatch(deleteDayTimeAssistant(assistantDayTimes));
  }
  console.log(`delete: Appointment with id: ${appointmentId} is deleted inside fn deleteDentalAppointment (from redux-toolkit appointmentSlice) in the next line of code.`)
  dispatch(deleteAppointmentInReduxToolkit(appointmentId))
}


export const formatTime = time => (time < 10 ? `${time}:00u` : `${time}:00u`);


export const generateAppointmentId = (clientId, day, time) => ( `${clientId}_${day}_${time}`);


export const generateRandomPersonId = () => Math.floor(1000000 + Math.random() * 900000); // 6 digits

const generateRandomAppointmentFromWinc = () => ({
  //appointmentId: generateRandomAppointmentId(), // appointmentId not part of the kick-start code. 
  day: getRandomDay(),
  time: getRandomTime(),
  client: getRandomName(clientsDentistCompanyBVT),
  dentist: getRandomName(dentistsDentistCompanyBVT),
  assistant: getRandomName(assistantsDentistCompanyBVT),
});

export const generateRandomAppointmentsFromWinc = num =>
  Array(num)
    // .fill(0) // why fill with 0 before mapping? The undefineds are replaced by zeros, but why?
    /* see MDN ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array ): A JavaScript array is 
      initialized with the given elements, except in the case where a single argument is passed to the Array constructor and that 
      argument is a number (see the arrayLength parameter below). 
      imho: skip fill(0)
    */
    .map(_ => generateRandomAppointmentFromWinc());



export function getAppointmentObject(appointmentsfromReduxToolkit, indexOfAppointment) {
  const appointmentObject = appointmentsfromReduxToolkit.appointments[indexOfAppointment]
  return appointmentObject
}


export function getAppointmentId(appointmentsfromReduxToolkit, indexOfAppointment) {
  const appointment = appointmentsfromReduxToolkit.appointments[indexOfAppointment]
  let appointmentId = appointment.appointmentId
  return appointmentId
}


export function getAssistantId(assistantsfromReduxToolkit, indexOfAssistant) {
  const assistant = assistantsfromReduxToolkit.assistants[indexOfAssistant]
  let assistantId = assistant.assistantId
  return assistantId
}


export function getClientId(clientsfromReduxToolkit, indexOfClient) {
  const client = clientsfromReduxToolkit.clients[indexOfClient]
  let clientId = client.clientId
  return clientId
}


export function getDentistId(dentistsfromReduxToolkit, indexOfDentist) {
  const dentist = dentistsfromReduxToolkit.dentists[indexOfDentist]
  let dentistId = dentist.dentistId
  return dentistId
}



export const getArrayObjectWithObjectKeyValuePair = (arrayObjectPropertyKeyToFilterWith, arrayObjectPropertyValueToFilterWith, array) => {
  // sample fn call: let objectFromArray = getArrayObjectWithObjectKeyValuePair("lastName", "Witting", clients);
  let filterFn = item => item[arrayObjectPropertyKeyToFilterWith] === arrayObjectPropertyValueToFilterWith ;
  let object = array.filter(filterFn)
  return object;
}


export const getRandomDay = () => {
  // meets winc-requirement: The practice is closed on the weekend.
  let randomDay = 6;
  while ([6, 7, 13, 14, 20, 21, 27, 28].includes(randomDay)){
    randomDay = Math.floor(Math.random() * 28) + 1;
    if (![6, 7, 13, 14, 20, 21, 27, 28].includes(randomDay)){
      if (randomDay < 10){
        randomDay = "0" + randomDay;
      }
      return randomDay.toString();
    } 
  }
  return randomDay
}
 

export const getNrOfRandomElementsFromArray = (array, nrOfArrayElements = 8) => {
  let arrayWithSelectedElements = [];

  for (let i = 0; i < nrOfArrayElements ; i++) {
    let dentalTreatment = array[Math.floor(Math.random() * array.length)]; 
    if (!arrayWithSelectedElements.includes(dentalTreatment)){
      arrayWithSelectedElements.push(dentalTreatment)
    }
  }
  return arrayWithSelectedElements.sort();
};


export const getRandomName = (personCategoryInCompanyBVT) => {
  const person = personCategoryInCompanyBVT[Math.floor(Math.random() * personCategoryInCompanyBVT.length)];
  return `${person["firstName"]} ${person["lastName"]}`;
};


export const getRandomPaymentMethod = (paymentMethodOptions) => {
  // random paymentmethod for each of the 50 clients is created in Mockaroo, so this fn is obsolete. 
  let randomPaymentMethod = paymentMethodOptions[Math.floor(Math.random() * paymentMethodOptions.length)];
  return randomPaymentMethod;
};


export const getRandomPersonId = (personCategoryInCompanyBVT, typeOfPersonId) => {
  if (personCategoryInCompanyBVT[0]?.[typeOfPersonId] !== undefined) { 
      // personCategory is an array with either client, dentist or assistant objects. 
      // All 3 arrays contain more than 1 element, according to the requirements. 
      let randomPerson = personCategoryInCompanyBVT[Math.floor(Math.random() * personCategoryInCompanyBVT.length)];
      return randomPerson[typeOfPersonId];    
  } else {
    console.error(`check fn gerRandomPersonId for array: ${personCategoryInCompanyBVT} with typeOfPersonId: ${typeOfPersonId}`)
  }
}

 
export const getRandomPersons = (personCategoryInCompanyBVT, nrOfPersons) => {
  let randomPersons = [];
  for (let i = 0; i < nrOfPersons; i++) {
    let randomPerson = personCategoryInCompanyBVT[Math.floor(Math.random() * personCategoryInCompanyBVT.length)];
    randomPersons.push(randomPerson)
  };
  return randomPersons;
};


export const getRandomUniqueObjectsFromArray = (array, nrOfObjectsFromArray) => {
  let arrayWithFnInput = [...array];
  let arrayWithFnOutput = [];
  let i = 0;
  while (i < nrOfObjectsFromArray) {
    let randomObjectFromArray = array[Math.floor(Math.random() * array.length)];
    let indexOfRandomObjectinArrayWithFnOutput = arrayWithFnOutput.indexOf(randomObjectFromArray) 

    if (indexOfRandomObjectinArrayWithFnOutput === -1) {
      let indexOfRandomObjectFromArray = arrayWithFnInput.indexOf(randomObjectFromArray) 
      arrayWithFnInput.splice(indexOfRandomObjectFromArray, 1)
      arrayWithFnOutput.push(randomObjectFromArray)
      i++;
    }
  };
  return arrayWithFnOutput;
};


export const getRandomTime = () => {
  let hour;
  while (true) {
    hour = Math.floor(Math.random() * 24);
    if (hour > 7 && hour < 19) {
      if (hour < 10){
        hour = "0" + hour;
      }
      return hour.toString();
    }
  }
}; 


export const getRandomTreatmentForRandomAppointment = (dentistId, dentistArray) => {
  let getDentistObject = dentist => dentist.dentistId === dentistId
  let dentistObject = selectObjectsByArrayObjectKey(dentistArray, getDentistObject)
  const randomCurrentSkillOfDentist = dentistObject[0].treatmentTypes[Math.floor(Math.random() * dentistObject[0].treatmentTypes.length)];
  return randomCurrentSkillOfDentist;
};


export const getRandomTreatmentTypes = (completeArrayWithDentalTreatments, nrOfDifferentTreatmentsAsTheSkillsOfADentist = 8) => {
  let selectionOfDentalTreatments = [];
  while (selectionOfDentalTreatments.length < nrOfDifferentTreatmentsAsTheSkillsOfADentist){
    let dentalTreatment = completeArrayWithDentalTreatments[Math.floor(Math.random() * completeArrayWithDentalTreatments.length)];
      if (!selectionOfDentalTreatments.includes(dentalTreatment)){
        selectionOfDentalTreatments.push(dentalTreatment)
      }
  }
  return selectionOfDentalTreatments.sort();
};


export const getSystemDatePlusTime = () => {
  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date+' '+time;
  return dateTime;
}

export function isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI (
  personId, 
  day, 
  time, 
  personType, 
  clientDayTimesFromReduxToolkit, 
  dentistDayTimesFromReduxToolkit, 
  assistantDayTimesFromReduxToolkit) {
  
  let isUniqueValue = false;
  let PersonIdAndDayAndTimeCombi = personId +"_" + day + "_" + time;
  switch (personType) {
      case 'client':
        isUniqueValue = !clientDayTimesFromReduxToolkit.clientDayTimes.includes(PersonIdAndDayAndTimeCombi) 
        break;
      case 'dentist':
        isUniqueValue = !dentistDayTimesFromReduxToolkit.dentistDayTimes.includes(PersonIdAndDayAndTimeCombi) 
        break;
      case 'assistant':
        isUniqueValue = !assistantDayTimesFromReduxToolkit.assistantDayTimes.includes(PersonIdAndDayAndTimeCombi) 
        break;
      default:
        console.error(`this ${personType} does not exist`)
        break;  
  }
  return isUniqueValue
}


export const isValidWorkingDay = (dayNumber) => (![6, 7, 13, 14, 20, 21, 27, 28].includes(dayNumber) ? true : false)


export const isValidWorkingTime = (hourNumber) => (hourNumber > 7 && hourNumber < 19 ? true : false)


export const loadSelectboxWithListOf = (arrayObjectKey, array) => {
  const createArrayWithArrayObjectKeysFromArrayWithObjects = (arrayObjectKey, array) => {
    const arrayWithArrayObjectKeysFromArrayWithObjects = array.map(arrayObject => arrayObject[arrayObjectKey]);
    return arrayWithArrayObjectKeysFromArrayWithObjects;  
  }
  const arrayWithArrayObjectKeysFromArrayWithObjects = createArrayWithArrayObjectKeysFromArrayWithObjects(arrayObjectKey, array);
  const putArrayObjectKeysInSelectBoxOptionsDataStructure = (scalarArrayWithListBoxOptions) => {
    let selectBoxOptions = []
    for (let i = 0; i < scalarArrayWithListBoxOptions.length; i++) {
      let newObject = {};
      newObject.value = scalarArrayWithListBoxOptions[i];
      newObject.text = scalarArrayWithListBoxOptions[i];
      selectBoxOptions.push(newObject);
    }
    return selectBoxOptions;
  }
  const arrayWithSelectboxOptions = putArrayObjectKeysInSelectBoxOptionsDataStructure(arrayWithArrayObjectKeysFromArrayWithObjects) 
  return arrayWithSelectboxOptions;
}


  export const selectObjectsByArrayObjectKey  = (array, filterFunction) => {
      let filteredArr = array.filter(filterFunction)
      return filteredArr;
  }


  export const sortArrayWithObjects = (arrayObjectKey, array) => {
    let arrayCopy = [...array];
    arrayCopy.sort((ArrayObjectOne, ArrayObjectTwo) => {
      let stringOne = ArrayObjectOne[arrayObjectKey].toLowerCase(),
          stringTwo = ArrayObjectTwo[arrayObjectKey].toLowerCase();
  
      if (stringOne < stringTwo) {
          return -1;
      }
      if (stringOne > stringTwo) {
          return 1;
      }
      return 0;
    });
    return arrayCopy;
  }


  export const updateAppointment_Phase1of2_DisplayComponentUpdateAppointment = (
    appointment,
    appointmentId, 
    showComponentUpdateAppointmentReduxToolkit, 
    appointmentsfromReduxToolkit, 
    deleteAppointmentInReduxToolkit, 
    saveAppointmentToReduxToolkit, 
    disableUiControlsDuringAppointmentUpdate,
    deleteDayTimeClient, 
    deleteDayTimeDentist, 
    deleteDayTimeAssistant, 
    dispatch
    ) => {
    
    window.scrollTo(0, 0);

    dispatch(disableUiControlsDuringAppointmentUpdate());

    dispatch(saveAppointmentToReduxToolkit(appointment));
                
    deleteDentalAppointment(
      appointmentId, 
      appointmentsfromReduxToolkit, 
      deleteAppointmentInReduxToolkit, 
      deleteDayTimeClient, 
      deleteDayTimeDentist, 
      deleteDayTimeAssistant, 
      dispatch
    );

    dispatch(showComponentUpdateAppointmentReduxToolkit());
  }



  export function updateAppointment_Phase2of2_updateAppointmentRecursivelyUntilUpdateSucceeds (
    clientId, 
    treatmentType,
    appointmentPriority,
    day, 
    time, 
    dentistId, 
    assistantId,    
    appointmentLastUpdatedOnDateTime,        
    clientsFromReduxToolkit, 
    dentistsFromReduxToolkit, 
    assistantsFromReduxToolkit, 
    clientDayTimesFromReduxToolkit, 
    dentistDayTimesFromReduxToolkit, 
    assistantDayTimesFromReduxToolkit, 
    hideComponentUpdateAppointmentReduxToolkit,  // this parameter is not in fn createAppointment!
    enableUiControlsDuringAppointmentUpdate, // this parameter is not in fn createAppointment!
    dispatch
    ) {
    /*
      For quick access, I describe in this function the differences with fn createAppointment in comments.
    */

    // this fn is not in fn createAppointment !
    const makeComponentUpdateAppointmentInvisible = () => {
      dispatch(hideComponentUpdateAppointmentReduxToolkit())
  }
    let getDentist = dentist => dentist.dentistId === dentistId
    let dentistForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(dentistsFromReduxToolkit.dentists, getDentist)  
    let skillsOfDentistForWhomAnAppointmentIsBeingMade = (dentistForWhomAnAppointmentIsBeingMade[0].treatmentTypes)
    if(skillsOfDentistForWhomAnAppointmentIsBeingMade.includes(treatmentType)) {
      log(`Dentist ${dentistId} has the required skill to treat client ${clientId} `) // 
    } else {
      console.warn(`Dentist ${dentistId} does not have the required skill to treat client ${clientId} `)
      alert(`Dentist ${dentistId} does not have the required skill to treat client ${clientId} `);
      return; 
    } 

    if (assistantId !== "") {  
        if (
            isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
              clientId, 
              day, 
              time, 
              "client",  
              clientDayTimesFromReduxToolkit, 
              dentistDayTimesFromReduxToolkit, 
              assistantDayTimesFromReduxToolkit) &&
            isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
              dentistId, 
              day, 
              time, 
              "dentist",  
              clientDayTimesFromReduxToolkit, 
              dentistDayTimesFromReduxToolkit, 
              assistantDayTimesFromReduxToolkit) &&
            isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
              assistantId, 
              day, 
              time, 
              "assistant",  
              clientDayTimesFromReduxToolkit, 
              dentistDayTimesFromReduxToolkit, 
              assistantDayTimesFromReduxToolkit)
            )
        {
            let clientDayTimes = createCombiOfPersonAndDayAndTime(clientId, day, time)
            dispatch(addDayTimeClient(clientDayTimes));
  
            let dentistDayTimes = createCombiOfPersonAndDayAndTime(dentistId, day, time)
            dispatch(addDayTimeDentist(dentistDayTimes));
  
            let assistantDayTimes = createCombiOfPersonAndDayAndTime(assistantId, day, time)
            dispatch(addDayTimeAssistant(assistantDayTimes));
  
            let getClient = client => client.clientId === clientId
            let clientForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(clientsFromReduxToolkit.clients, getClient)
                                
            let client = (`${(clientForWhomAnAppointmentIsBeingMade[0].firstName)} ${(clientForWhomAnAppointmentIsBeingMade[0].lastName)}`)
  
            let getDentist = dentist => dentist.dentistId === dentistId
            let dentistForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(dentistsFromReduxToolkit.dentists, getDentist)
            
            let dentist = (`${(dentistForWhomAnAppointmentIsBeingMade[0].firstName)} ${(dentistForWhomAnAppointmentIsBeingMade[0].lastName)}`)
  
            let assistant;  
            if (assistantId !== null) {
              let getAssistant = assistant => assistant.assistantId === assistantId
              let assistantForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(assistantsFromReduxToolkit.assistants, getAssistant)

              assistant = (`${(assistantForWhomAnAppointmentIsBeingMade[0].firstName)} ${(assistantForWhomAnAppointmentIsBeingMade[0].lastName)}`)
            }

            let appointmentId = generateAppointmentId(clientId, day, time);
            let newAppointmentObject = {
              appointmentId, 
              appointmentLastUpdatedOnDateTime,
              appointmentPriority,
              assistant,
              assistantId, 
              client, 
              clientId, 
              day, 
              dentist, 
              dentistId, 
              time, 
              treatmentType, 
            }; 
            dispatch(addAppointment(newAppointmentObject));
            console.log(`update: updated appointment with new id: ${appointmentId} (on day ${day} and time ${time} o'clock) has been added to redux-toolkit appointmentSlice.`)
            makeComponentUpdateAppointmentInvisible();  // this line is not in fn createAppointment.
            dispatch(enableUiControlsDuringAppointmentUpdate());

        } 
        else {            
          let warning = `The following persons already have appointment on on day ${day} and ${time} o'clock: `;

           if (!
            isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
              clientId, 
              day, 
              time, 
              "client",  
              clientDayTimesFromReduxToolkit, 
              dentistDayTimesFromReduxToolkit, 
              assistantDayTimesFromReduxToolkit)){
                warning += ` client ${clientId}, `
                log(warning)
            }


            if( !isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
              dentistId, 
              day, 
              time, 
              "dentist",  
              clientDayTimesFromReduxToolkit, 
              dentistDayTimesFromReduxToolkit, 
              assistantDayTimesFromReduxToolkit)){
                warning += ` dentist ${dentistId}, `
            }
              
              
            if(! isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
              assistantId, 
              day, 
              time, 
              "assistant",  
              clientDayTimesFromReduxToolkit, 
              dentistDayTimesFromReduxToolkit, 
              assistantDayTimesFromReduxToolkit)){
                warning += ` assistant ${assistantId}.`
            }

          alert(warning);
          // return;


        }
    } else {
        if (isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
          clientId, 
          day, 
          time, 
          "client",  
          clientDayTimesFromReduxToolkit, 
          dentistDayTimesFromReduxToolkit, 
          assistantDayTimesFromReduxToolkit) &&
            isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
              dentistId, 
              day, 
              time, 
              "dentist",  
              clientDayTimesFromReduxToolkit, 
              dentistDayTimesFromReduxToolkit, 
              assistantDayTimesFromReduxToolkit))
        {
  
          let clientDayTimes = createCombiOfPersonAndDayAndTime(clientId, day, time)
          dispatch(addDayTimeClient(clientDayTimes));

          let dentistDayTimes = createCombiOfPersonAndDayAndTime(dentistId, day, time)
          dispatch(addDayTimeDentist(dentistDayTimes));
  

          let getClient = client => client.clientId === clientId
          let clientForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(clientsFromReduxToolkit.clients, getClient)
          
          let client = (`${(clientForWhomAnAppointmentIsBeingMade[0].firstName)} ${(clientForWhomAnAppointmentIsBeingMade[0].lastName)}`)

          let getDentist = dentist => dentist.dentistId === dentistId
          let dentistForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(dentistsFromReduxToolkit.dentists, getDentist)
          
          let dentist = (`${(dentistForWhomAnAppointmentIsBeingMade[0].firstName)} ${(dentistForWhomAnAppointmentIsBeingMade[0].lastName)}`)
         
          let appointmentId = generateAppointmentId(clientId, day, time);
          let newAppointmentObject = {
            appointmentId, 
            appointmentLastUpdatedOnDateTime,
            appointmentPriority,
            assistant:null,
            assistantId:null, 
            client, 
            clientId, 
            day, 
            dentist, 
            dentistId, 
            time, 
            treatmentType, 
          };
          dispatch(addAppointment(newAppointmentObject));  
          console.log(`update: updated appointment with new id: ${appointmentId} (on day ${day} and time ${time} o'clock) has been added to redux-toolkit appointmentSlice.`) 
          makeComponentUpdateAppointmentInvisible();  // this line is not in fn createAppointment.
          dispatch(enableUiControlsDuringAppointmentUpdate());  // this line is not in fn createAppointment.
        }
        else {            
          let warning = `The following persons already have appointment on on day ${day} and ${time} o'clock: `;

           if (!
            isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
              clientId, 
              day, 
              time, 
              "client",  
              clientDayTimesFromReduxToolkit, 
              dentistDayTimesFromReduxToolkit, 
              assistantDayTimesFromReduxToolkit)){
                warning += ` client ${clientId}, `
                log(warning)
            }


            if( !isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
              dentistId, 
              day, 
              time, 
              "dentist",  
              clientDayTimesFromReduxToolkit, 
              dentistDayTimesFromReduxToolkit, 
              assistantDayTimesFromReduxToolkit)){
                warning += ` dentist ${dentistId}. `
            }

          alert(warning);
          // return;
        }
    } 
  } 