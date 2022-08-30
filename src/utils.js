// remove imports after use case 1 has been completed. See fn generateRandomAppointment below.
import clientsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/clients"
import dentistsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/dentists"
import assistantsDentistCompanyBVT from "./dataInDentistAppWhenDentistAppStarts/assistants"

import { addAppointment, deleteAppointmentInReduxToolkit} from "./redux/appointmentSlice";
import {addDayTimeClient} from "./redux/clientDayTimeSlice";
import {addDayTimeDentist} from "./redux/dentistDayTimeSlice";
import {addDayTimeAssistant} from "./redux/assistantDayTimeSlice";
import {addDentalTreatmentsAsSkillSetToDentist} from  "./redux/dentistSlice"

const log = console.log;

/*

isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI
addTreatmentTypesToDentist

createCombiOfPersonAndDayAndTime
generateRandomPersonId
generateRandomAppointmentId
generateRandomAppointmentFromWinc
generateRandomAppointmentsFromWinc
getAppointmentObject
getAppointmentId
getAssistantId
getClientId
getDentistId
getNrOfRandomElementsFromArray
getRandomDay
getRandomDay2  (use getRandomDay instead)
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
isValidWorkingDay
isValidWorkingTime
loadSelectboxWithListOf
selectObjectsByArrayObjectKey
createAppointment  ------------------------------------------------
updateAppointmentRecursivelyUntilUpdateSucceeds 
deleteDentalAppointment_not_in_use
deleteAllAppointmentsOfPerson
deleteAllAppointmentsOfClient_not_in_use
deleteDentalAppointment

*/




export function isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI (
  personId, 
  day, 
  time, 
  personType, 
  clientDayTimesFromReduxToolkit, 
  dentistDayTimesFromReduxToolkit, 
  assistantDayTimesFromReduxToolkit) {
  // I only call this fn from within fn createAppointment.
  // 2do at the end (if time left): improve performance. Check useMemo( ). 
  
  log(`fn isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI: start: `)
  // log(personId)
  // log(day)
  // log(time)
  // log(personType)  
  // log(clientDayTimes.clientDayTimes)
  // log(dentistDayTimes.dentistDayTimes)
  // log(assistantDayTimes.assistantDayTimes)
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
        // log(assistantDayTimesFromReduxToolkit.assistantDayTimes)
        isUniqueValue = !assistantDayTimesFromReduxToolkit.assistantDayTimes.includes(PersonIdAndDayAndTimeCombi) 
        break;
      default:
        console.error(`this ${personType} does not exist`)
        break;  
  }
  return isUniqueValue
}


export const addTreatmentTypesToDentist = (arrayWithDentistObjects, arrayWithDentalTreatments, dispatch) => {
  for (let i = 0; i < arrayWithDentistObjects.length; i++) {
    dispatch(addDentalTreatmentsAsSkillSetToDentist({"skillSetOfDentist": getRandomTreatmentTypes(arrayWithDentalTreatments), "indexOfDentistInArray": i}))
  }
}





export const createCombiOfPersonAndDayAndTime = (personId, day, time) => personId + "_" + day + "_" + time;

// export const generateRandomAppointmentId = () => Math.floor(10000000 + Math.random() *  9000000); // 7 digits
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
    .fill(0) // why fill with 0 before mapping? The undefineds are replaced by zeros, but why?
    /* see MDN ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array ): A JavaScript array is 
      initialized with the given elements, except in the case where a single argument is passed to the Array constructor and that 
      argument is a number (see the arrayLength parameter below). 
      imho: skip fill(0)
    */
    .map(_ => generateRandomAppointmentFromWinc());




export function getAppointmentObject(appointmentsfromReduxToolkit, indexOfAppointment) {
  const appointmentObject = appointmentsfromReduxToolkit.appointments[indexOfAppointment]
  log('fn getAppointmentObject: start:')
  console.log('appointmentThatWillBeDeleted:')
  console.log(appointmentObject)
  log('fn getAppointmentObject: end.')
  return appointmentObject
}

export function getAppointmentId(appointmentsfromReduxToolkit, indexOfAppointment) {
  const appointment = appointmentsfromReduxToolkit.appointments[indexOfAppointment]
  log('fn getAppointmentId: start:')
  console.log('appointmentThatWillBeDeleted:')
  console.log(appointment)
  let appointmentId = appointment.appointmentId
  log('fn getAppointmentId: end.')
  return appointmentId
}

export function getAssistantId(assistantsfromReduxToolkit, indexOfAssistant) {
  const assistant = assistantsfromReduxToolkit.assistants[indexOfAssistant]
  log('fn getAssistantId: start:')
  console.log(assistant)
  let assistantId = assistant.assistantId
  log('fn getAssistantId: end.')
  return assistantId
}

export function getClientId(clientsfromReduxToolkit, indexOfClient) {
  const client = clientsfromReduxToolkit.clients[indexOfClient]
  log('fn getClientId: start:')
  console.log(client)
  let clientId = client.clientId
  log('fn getClientId: end.')
  return clientId
}



export function getDentistId(dentistsfromReduxToolkit, indexOfDentist) {
  const dentist = dentistsfromReduxToolkit.dentists[indexOfDentist]
  log('fn getDentistId: start:')
  console.log(dentist)
  let dentistId = dentist.dentistId
  log('fn getDentistId: end.')
  return dentistId
}

export const getRandomDay = () => {
  /*
      winc-requirement: The practice is closed on the weekend.
      // status: I have updated fn getRandomDay, so now it complies with this requirement.
  */
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
 
// export const getRandomDay2 = () => {
//   /*
//       winc-requirement: The practice is closed on the weekend.
//       // status: I have updated fn getRandomDay, so now it complies with this requirement.
//   */
//   let randomDay = 6;
//   while ([6, 7, 13, 14, 20, 21, 27, 28].includes(randomDay)){
//     randomDay = Math.floor(Math.random() * 28) + 1;
//     if (![6, 7, 13, 14, 20, 21, 27, 28].includes(randomDay)){
//       if (randomDay < 10){
//         randomDay = "0" + randomDay;
//       }
//       return randomDay.toString();
//     } 
//   }
//   return randomDay
// }


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
  // 2do: where does personId come from??? 
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

// export const getRandomPersonId = (personCategoryInCompanyBVT) => {
//   /*
//     in scope: use this fn in use case 1.
//     out of scope: use case 0.
//     personCategory is an array with either only randomly generated clients, dentists, or assistants.
//     I have created the person categories in Mockaroo, as well as random person ids.
//   */
  
//   let person = personCategoryInCompanyBVT[Math.floor(Math.random() * personCategoryInCompanyBVT.length)];
//     // 2do: where does personId come from??? 
//   return person.personId;
// };


export const getRandomPersonIdOld = (personCategoryInCompanyBVT) => {
  /*
    in scope: use this fn in use case 1.
    out of scope: use case 0.
    personCategory is an array with either only randomly generated clients, dentists, or assistants.
    I have created the person categories in Mockaroo, as well as random person ids.
  */
  
  let person = personCategoryInCompanyBVT[Math.floor(Math.random() * personCategoryInCompanyBVT.length)];
  return `${person["lastName"]}-${generateRandomPersonId()}`; 
};

// former (old) version: 
// export const getRandomPersonIdAsync = (personCategoryInCompanyBVT, typeOfPersonId) => {
//   if (personCategoryInCompanyBVT[0]?.[typeOfPersonId] !== undefined) { 
//       // personCategory is an array with either client, dentist or assistant objects. 
//       // All 3 arrays contain more than 1 element, according to the requirements. 
//       //console.log(clients[0])

//       /*
//         json data contains the personId, so do not create one with fn getRandomPersonId.
//         E.g. do not: 
      
//         let personId = getRandomPersonId(personCategoryInCompanyBVT);
//         return personId
//       */
//       let randomPerson = personCategoryInCompanyBVT[Math.floor(Math.random() * personCategoryInCompanyBVT.length)];
//       return randomPerson[typeOfPersonId];
      
//   } else {
//       console.log('react is busy retrieving data from redux-toolkit slice')
//       // getRandomPersonIdAsync(personCategoryInCompanyBVT, typeOfPersonId) // not working, see below:
//       let myInterval = setTimeout(function(){getRandomPersonIdAsync(personCategoryInCompanyBVT, typeOfPersonId)}, 100)
//       // getRandomPersonIdAsync is sent to the callback queue, before its interval is cleared.
//       clearTimeout(myInterval) 
//       /* combi of setTimeout and clearTimeout are needed to prevent 'RangeError: Maximum call stack size exceeded'. 
//         My trick: each previous callback fn "on the stack" is deleted right after the recursive fn call, so 
//         you don't get a call stack overflow.  
//       */
//   }
// }

 



 
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
      // log(indexOfRandomObjectFromArray)
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
  
  // log(dentistId)
  let getDentistObject = dentist => dentist.dentistId === dentistId
  let dentistObject = selectObjectsByArrayObjectKey(dentistArray, getDentistObject)
  
  const randomCurrentSkillOfDentist = dentistObject[0].treatmentTypes[Math.floor(Math.random() * dentistObject[0].treatmentTypes.length)];
  // log(randomCurrentSkillOfDentist)

  // let currentSkillSetOfDentist = dentistObject;
  // log(dentistObject)
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


export const isValidWorkingDay = (dayNumber) => (![6, 7, 13, 14, 20, 21, 27, 28].includes(dayNumber) ? true : false)


export const isValidWorkingTime = (hourNumber) => (hourNumber > 7 && hourNumber < 19 ? true : false)




export const loadSelectboxWithListOf = (arrayObjectKey, array) => {
  const createArrayWithArrayObjectKeysFromArrayWithObjects = (arrayObjectKey, array) => {
    const arrayWithArrayObjectKeysFromArrayWithObjects = array.map(arrayObject => arrayObject[arrayObjectKey]);
    return arrayWithArrayObjectKeysFromArrayWithObjects;  
  }
  const arrayWithArrayObjectKeysFromArrayWithObjects = createArrayWithArrayObjectKeysFromArrayWithObjects(arrayObjectKey, array);
  // log(arrayWithArrayObjectKeysFromArrayWithObjects)
  
  const putArrayObjectKeysInSelectBoxOptionsDataStructure = (scalarArrayWithListBoxOptions) => {
    let selectBoxOptions = []
    for (let i = 0; i < scalarArrayWithListBoxOptions.length; i++) {
      // log(scalarArrayWithListBoxOptions[i])
      let newObject = {};
      newObject.value = scalarArrayWithListBoxOptions[i];
      newObject.text = scalarArrayWithListBoxOptions[i];
      // log(newObject)
      selectBoxOptions.push(newObject);
    }
    // log(selectBoxOptions)
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
    arrayCopy.sort((a, b) => {
      let fa = a[arrayObjectKey].toLowerCase(),
          fb = b[arrayObjectKey].toLowerCase();
  
      if (fa < fb) {
          return -1;
      }
      if (fa > fb) {
          return 1;
      }
      return 0;
    });
    return arrayCopy;
  }


  export function createAppointment (
    clientId, 
    treatmentType,
    appointmentPriority,
    day, 
    time, 
    dentistId, 
    assistantId,    
    appointmentLastUpdatedOnDateTime,
    isNowUpdatingAppointment,             
    clientsFromReduxToolkit, 
    dentistsFromReduxToolkit, 
    assistantsFromReduxToolkit, 
    clientDayTimesFromReduxToolkit, 
    dentistDayTimesFromReduxToolkit, 
    assistantDayTimesFromReduxToolkit, 
    dispatch
    ) {
    log(`fn createAppointment: start: `)
    let personType;
    
    let getDentist = dentist => dentist.dentistId === dentistId
    let dentistForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(dentistsFromReduxToolkit.dentists, getDentist)  
    let skillsOfDentistForWhomAnAppointmentIsBeingMade = (dentistForWhomAnAppointmentIsBeingMade[0].treatmentTypes)
    log(`skillsOfDentistForWhomAnAppointmentIsBeingMade: `)
    log(skillsOfDentistForWhomAnAppointmentIsBeingMade)
    if(skillsOfDentistForWhomAnAppointmentIsBeingMade.includes(treatmentType)) {
      log(`Dentist ${dentistId} has the required skill to treat client ${clientId} `) // 
    } else {
      log(`Dentist ${dentistId} does not have the required skill to treat client ${clientId} `)
      alert(`Dentist ${dentistId} does not have the required skill to treat client ${clientId} `);
      return; // abort creating appointment. 
    } 

    // log(`isAssistantNeededForAppointment: ${isAssistantNeededForAppointment}`)
    if (assistantId !== "") {
        log(`data to create updated appointment:`)
        log(clientId, dentistId, treatmentType, assistantId, day, time, clientDayTimesFromReduxToolkit, dentistDayTimesFromReduxToolkit, assistantDayTimesFromReduxToolkit )     

        if (
            isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
              clientId, 
              day, 
              time, 
              personType="client",  
              clientDayTimesFromReduxToolkit, 
              dentistDayTimesFromReduxToolkit, 
              assistantDayTimesFromReduxToolkit) &&
            isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
              dentistId, 
              day, 
              time, 
              personType = "dentist",  
              clientDayTimesFromReduxToolkit, 
              dentistDayTimesFromReduxToolkit, 
              assistantDayTimesFromReduxToolkit) &&
            isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
              assistantId, 
              day, 
              time, 
              personType = "assistant",  
              clientDayTimesFromReduxToolkit, 
              dentistDayTimesFromReduxToolkit, 
              assistantDayTimesFromReduxToolkit)
            )
        {
          log(`fn createAppointment: after 'isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI: `)
       
            let clientDayTimes = createCombiOfPersonAndDayAndTime(clientId, day, time)
            dispatch(addDayTimeClient(clientDayTimes));
  
            let dentistDayTimes = createCombiOfPersonAndDayAndTime(dentistId, day, time)
            dispatch(addDayTimeDentist(dentistDayTimes));
  
            let assistantDayTimes = createCombiOfPersonAndDayAndTime(assistantId, day, time)
            dispatch(addDayTimeAssistant(assistantDayTimes));
  
            let getClient = client => client.clientId === clientId
            let clientForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(clientsFromReduxToolkit.clients, getClient)
            
            // variable client inside obj appointment is derived data from  the object client.                       
            let client = (`${(clientForWhomAnAppointmentIsBeingMade[0].firstName)} ${(clientForWhomAnAppointmentIsBeingMade[0].lastName)}`)
  
            let getDentist = dentist => dentist.dentistId === dentistId
            let dentistForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(dentistsFromReduxToolkit.dentists, getDentist)
            
            // variable dentist inside obj appointment is derived data from  the object dentist.
            let dentist = (`${(dentistForWhomAnAppointmentIsBeingMade[0].firstName)} ${(dentistForWhomAnAppointmentIsBeingMade[0].lastName)}`)
  
            let assistant;  
            if (assistantId !== null) {
              let getAssistant = assistant => assistant.assistantId === assistantId
              let assistantForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(assistantsFromReduxToolkit.assistants, getAssistant)

              // variable assistant inside obj appointment is derived data from  the object assistant.
              assistant = (`${(assistantForWhomAnAppointmentIsBeingMade[0].firstName)} ${(assistantForWhomAnAppointmentIsBeingMade[0].lastName)}`)
            }

  
            // let appointmentId = generateRandomAppointmentId();
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
              isNowUpdatingAppointment,
              time, 
              treatmentType, 
            }; 
            dispatch(addAppointment(newAppointmentObject));
        } 
        else {            
            alert('please check if client, dentist and/or assistant have an appointment on this day and time');
            return;
        }
    } else {
        log('the else way')
        log(clientId, dentistId, assistantId, day, time, clientDayTimesFromReduxToolkit, dentistDayTimesFromReduxToolkit, assistantDayTimesFromReduxToolkit )
        if (isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
          clientId, 
          day, 
          time, 
          personType = "client",  
          clientDayTimesFromReduxToolkit, 
          dentistDayTimesFromReduxToolkit, 
          assistantDayTimesFromReduxToolkit) &&
            isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
              dentistId, 
              day, 
              time, 
              personType = "dentist",  
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
          
          // variable client inside obj appointment is derived data from  the object client.
          let client = (`${(clientForWhomAnAppointmentIsBeingMade[0].firstName)} ${(clientForWhomAnAppointmentIsBeingMade[0].lastName)}`)

          let getDentist = dentist => dentist.dentistId === dentistId
          let dentistForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(dentistsFromReduxToolkit.dentists, getDentist)
          
          // variable dentist inside obj appointment is derived data from  the object dentist.
          let dentist = (`${(dentistForWhomAnAppointmentIsBeingMade[0].firstName)} ${(dentistForWhomAnAppointmentIsBeingMade[0].lastName)}`)
         
          // let appointmentId = generateRandomAppointmentId();
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
            isNowUpdatingAppointment,
            time, 
            treatmentType, 
          };
          dispatch(addAppointment(newAppointmentObject));   
        }
        else {            
            alert('please check if client and/or dentist have an appointment on this day and time');
            return;
        }
    } 
  } 


  export function updateAppointmentRecursivelyUntilUpdateSucceeds (
    clientId, 
    treatmentType,
    appointmentPriority,
    day, 
    time, 
    dentistId, 
    assistantId,    
    appointmentLastUpdatedOnDateTime,
    isNowUpdatingAppointment,             
    clientsFromReduxToolkit, 
    dentistsFromReduxToolkit, 
    assistantsFromReduxToolkit, 
    clientDayTimesFromReduxToolkit, 
    dentistDayTimesFromReduxToolkit, 
    assistantDayTimesFromReduxToolkit, 
    toggleVisibilityOfComponentUpdateAppointment,  // this parameter is not in fn createAppointment!
    dispatch
    ) {
    log(`fn createAppointment: start: `)
    
   
    // this fn is not in fn createAppointment !
    const makeComponentUpdateAppointmentInvisible = () => {
      // log("inside fn toggleVisibilityOfComponentUpdateAppointment: ");
      // log(`isShowingComponentUpdateAppointment: ${isShowingComponentUpdateAppointment} `)
      dispatch(toggleVisibilityOfComponentUpdateAppointment(false))
  }
    
    
    let personType;
    let getDentist = dentist => dentist.dentistId === dentistId
    let dentistForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(dentistsFromReduxToolkit.dentists, getDentist)  
    let skillsOfDentistForWhomAnAppointmentIsBeingMade = (dentistForWhomAnAppointmentIsBeingMade[0].treatmentTypes)
    log(`skillsOfDentistForWhomAnAppointmentIsBeingMade: `)
    log(skillsOfDentistForWhomAnAppointmentIsBeingMade)
    if(skillsOfDentistForWhomAnAppointmentIsBeingMade.includes(treatmentType)) {
      log(`Dentist ${dentistId} has the required skill to treat client ${clientId} `) // 
    } else {
      log(`Dentist ${dentistId} does not have the required skill to treat client ${clientId} `)
      alert(`Dentist ${dentistId} does not have the required skill to treat client ${clientId} `);
      return; // abort creating appointment. 
    } 

    // log(`isAssistantNeededForAppointment: ${isAssistantNeededForAppointment}`)
    if (assistantId !== "") {
        log(`data to create updated appointment:`)
        log(clientId, dentistId, treatmentType, assistantId, day, time, clientDayTimesFromReduxToolkit, dentistDayTimesFromReduxToolkit, assistantDayTimesFromReduxToolkit )     

        if (
            isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
              clientId, 
              day, 
              time, 
              personType="client",  
              clientDayTimesFromReduxToolkit, 
              dentistDayTimesFromReduxToolkit, 
              assistantDayTimesFromReduxToolkit) &&
            isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
              dentistId, 
              day, 
              time, 
              personType = "dentist",  
              clientDayTimesFromReduxToolkit, 
              dentistDayTimesFromReduxToolkit, 
              assistantDayTimesFromReduxToolkit) &&
            isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
              assistantId, 
              day, 
              time, 
              personType = "assistant",  
              clientDayTimesFromReduxToolkit, 
              dentistDayTimesFromReduxToolkit, 
              assistantDayTimesFromReduxToolkit)
            )
        {
          log(`fn createAppointment: after 'isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI: `)
       
            let clientDayTimes = createCombiOfPersonAndDayAndTime(clientId, day, time)
            dispatch(addDayTimeClient(clientDayTimes));
  
            let dentistDayTimes = createCombiOfPersonAndDayAndTime(dentistId, day, time)
            dispatch(addDayTimeDentist(dentistDayTimes));
  
            let assistantDayTimes = createCombiOfPersonAndDayAndTime(assistantId, day, time)
            dispatch(addDayTimeAssistant(assistantDayTimes));
  
            let getClient = client => client.clientId === clientId
            let clientForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(clientsFromReduxToolkit.clients, getClient)
            
            // variable client inside obj appointment is derived data from  the object client.                       
            let client = (`${(clientForWhomAnAppointmentIsBeingMade[0].firstName)} ${(clientForWhomAnAppointmentIsBeingMade[0].lastName)}`)
  
            let getDentist = dentist => dentist.dentistId === dentistId
            let dentistForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(dentistsFromReduxToolkit.dentists, getDentist)
            
            // variable dentist inside obj appointment is derived data from  the object dentist.
            let dentist = (`${(dentistForWhomAnAppointmentIsBeingMade[0].firstName)} ${(dentistForWhomAnAppointmentIsBeingMade[0].lastName)}`)
  
            let assistant;  
            if (assistantId !== null) {
              let getAssistant = assistant => assistant.assistantId === assistantId
              let assistantForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(assistantsFromReduxToolkit.assistants, getAssistant)

              // variable assistant inside obj appointment is derived data from  the object assistant.
              assistant = (`${(assistantForWhomAnAppointmentIsBeingMade[0].firstName)} ${(assistantForWhomAnAppointmentIsBeingMade[0].lastName)}`)
            }

  
            // let appointmentId = generateRandomAppointmentId();
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
              isNowUpdatingAppointment,
              time, 
              treatmentType, 
            }; 
            dispatch(addAppointment(newAppointmentObject));
            makeComponentUpdateAppointmentInvisible();  // this line is not in fn createAppointment.

        } 
        else {            
            alert('please check if client, dentist and/or assistant have an appointment on this day and time');
            return;


        }
    } else {
        log('the else way')
        log(clientId, dentistId, assistantId, day, time, clientDayTimesFromReduxToolkit, dentistDayTimesFromReduxToolkit, assistantDayTimesFromReduxToolkit )
        if (isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
          clientId, 
          day, 
          time, 
          personType = "client",  
          clientDayTimesFromReduxToolkit, 
          dentistDayTimesFromReduxToolkit, 
          assistantDayTimesFromReduxToolkit) &&
            isCombiOfPersonAndDayAndTimeAvailableToCreateAppointmentViaUI(
              dentistId, 
              day, 
              time, 
              personType = "dentist",  
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
          
          // variable client inside obj appointment is derived data from  the object client.
          let client = (`${(clientForWhomAnAppointmentIsBeingMade[0].firstName)} ${(clientForWhomAnAppointmentIsBeingMade[0].lastName)}`)

          let getDentist = dentist => dentist.dentistId === dentistId
          let dentistForWhomAnAppointmentIsBeingMade = selectObjectsByArrayObjectKey(dentistsFromReduxToolkit.dentists, getDentist)
          
          // variable dentist inside obj appointment is derived data from  the object dentist.
          let dentist = (`${(dentistForWhomAnAppointmentIsBeingMade[0].firstName)} ${(dentistForWhomAnAppointmentIsBeingMade[0].lastName)}`)
         
          // let appointmentId = generateRandomAppointmentId();
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
            isNowUpdatingAppointment,
            time, 
            treatmentType, 
          };
          dispatch(addAppointment(newAppointmentObject));   
          makeComponentUpdateAppointmentInvisible();  // this line is not in fn createAppointment.
        }
        else {            
            alert('please check if client and/or dentist have an appointment on this day and time');
            return;
        }
    } 
  } 

  export function deleteDentalAppointment_not_in_use (appointmentsfromReduxToolkit, appointmentId, appointmentIndexInAppointmentsArray, deleteAppointment, deleteDayTimeClient, deleteDayTimeDentist, deleteDayTimeAssistant, dispatch) {
    log('fn deleteAppointment start: ')
    // log(`appointmentsfromReduxToolkit: ${appointmentsfromReduxToolkit}`)
    // log(`appointmentId: ${appointmentId}`)
    // log(`appointmentIndexInAppointmentsArray: ${appointmentIndexInAppointmentsArray}`)
    // log(`deleteDayTimeClient${deleteDayTimeClient}`)
    // log(deleteDayTimeClient)
    // log(`deleteDayTimeDentistClient${deleteDayTimeDentist}`)
    // log(`deleteDayTimeAssistant${deleteDayTimeAssistant}`)
    // log(`dispatch${deleteDayTimeClient}`)
    // log(`appointmentIndexInAppointmentsArray (of appointment that will be deleted: )`)
    // log(appointmentIndexInAppointmentsArray)
    // log(typeof((appointmentIndexInAppointmentsArray)))

    let getAppointment = appointment => appointment.appointmentId === appointmentId
    let appointmentThatIsAboutToBeDeleted = selectObjectsByArrayObjectKey(appointmentsfromReduxToolkit.appointments, getAppointment)
    
    console.log('---appointmentThatWillBeDeleted:')
    console.log(appointmentThatIsAboutToBeDeleted[0])
  
    let {clientId, day, time, dentistId, assistantId} = appointmentThatIsAboutToBeDeleted[0];
  
    let clientDayTimes  = createCombiOfPersonAndDayAndTime(clientId, day, time)
    dispatch(deleteDayTimeClient(clientDayTimes));
    
    let dentistDayTimes = createCombiOfPersonAndDayAndTime(dentistId, day, time)
    dispatch(deleteDayTimeDentist(dentistDayTimes));
  

    if (assistantId !== null) {
        let assistantDayTimes = createCombiOfPersonAndDayAndTime(assistantId, day, time)
        dispatch(deleteDayTimeAssistant(assistantDayTimes));
    }
  

    dispatch(deleteAppointmentInReduxToolkit(appointmentIndexInAppointmentsArray))
    log('fn deleteAppointment end: ')
  }

  export const deleteAllAppointmentsOfPerson = (
    typeOfPersonId, //3 flavors: 'assistantId', 'clientId' or 'dentistId'.
    idOfPerson, 
    appointmentsfromReduxToolkit, 
    deleteAppointmentInReduxToolkit, 
    deleteDayTimeClient, 
    deleteDayTimeDentist, 
    deleteDayTimeAssistant, 
    dispatch) => {
    log(`idOfPerson (client, dentist or asssistant): ${idOfPerson}`)
    let getAppointment = appointment => appointment[typeOfPersonId] === idOfPerson
    let appointmentsToDelete = selectObjectsByArrayObjectKey(appointmentsfromReduxToolkit.appointments, getAppointment)
    log(`appointmentsToDelete: ${appointmentsToDelete}`)
    log(appointmentsToDelete)
    let appointmentsToDeleteCopy = [...appointmentsToDelete];
    appointmentsToDeleteCopy.forEach(appointmentToDelete => {
        let appointmentId = appointmentToDelete.appointmentId;
        if (appointmentsToDelete.length !== 0){
            deleteDentalAppointment(
                appointmentsfromReduxToolkit, 
                appointmentId,
                deleteAppointmentInReduxToolkit,
                deleteDayTimeClient, 
                deleteDayTimeDentist, 
                deleteDayTimeAssistant, 
                dispatch)  
        }
    })            
  } 

  export const deleteAllAppointmentsOfClient_not_in_use = (clientId, appointmentsfromReduxToolkit, dispatch, deleteAppointmentVersionTwo, deleteDayTimeClient, deleteDayTimeDentist, deleteDayTimeAssistant ) => {
    // this fn uses the index to  delete an item in redux-toolkit.
    
    log(`clientId: ${clientId}`)
    let getAppointment = appointment => appointment.clientId === clientId
    let appointmentsToDelete = selectObjectsByArrayObjectKey(appointmentsfromReduxToolkit.appointments, getAppointment)
  
    log(`appointmentsToDelete: ${appointmentsToDelete}`)
    log(appointmentsToDelete)
  
  let appointmentsToDeleteCopy = [...appointmentsToDelete];
  
  appointmentsToDelete.forEach(appointmentToDelete => {
        // console.log(appointmentToDelete);
        let appointmentIndexInAppointmentsArray = appointmentsfromReduxToolkit.appointments.indexOf(appointmentToDelete) 
        // log(appointmentIndexInAppointmentsArray)
        let appointmentId = appointmentToDelete.appointmentId;
        if (appointmentsToDelete.length !== 0){
            deleteDentalAppointment(
                appointmentsfromReduxToolkit, 
                appointmentId,
                appointmentIndexInAppointmentsArray, 
                deleteAppointmentVersionTwo,
                deleteDayTimeClient, 
                deleteDayTimeDentist, 
                deleteDayTimeAssistant, 
                dispatch)  
        }
    })            
  } 


  export function deleteDentalAppointment (
    appointmentsfromReduxToolkit, 
    appointmentId, 
    deleteAppointmentInReduxToolkit, 
    deleteDayTimeClient, 
    deleteDayTimeDentist, 
    deleteDayTimeAssistant, 
    dispatch) {
    log('fn deleteAppointment start: ')
    // log(`appointmentsfromReduxToolkit: ${appointmentsfromReduxToolkit}`)
    // log(`appointmentId: ${appointmentId}`)
    // log(`appointmentIndexInAppointmentsArray: ${appointmentIndexInAppointmentsArray}`)
    // log(`deleteDayTimeClient${deleteDayTimeClient}`)
    // log(deleteDayTimeClient)
    // log(`deleteDayTimeDentistClient${deleteDayTimeDentist}`)
    // log(`deleteDayTimeAssistant${deleteDayTimeAssistant}`)
    // log(`dispatch${deleteDayTimeClient}`)
    // log(`appointmentIndexInAppointmentsArray (of appointment that will be deleted: )`)
    // log(appointmentIndexInAppointmentsArray)
    // log(typeof((appointmentIndexInAppointmentsArray)))

    let getAppointment = appointment => appointment.appointmentId === appointmentId
    let appointmentThatIsAboutToBeDeleted = selectObjectsByArrayObjectKey(appointmentsfromReduxToolkit.appointments, getAppointment)
    
    console.log('---appointmentThatWillBeDeleted:')
    log(appointmentsfromReduxToolkit.appointments)
    console.log(appointmentThatIsAboutToBeDeleted)
    console.log(appointmentThatIsAboutToBeDeleted[0])
  
   
    let {clientId, day, time, dentistId, assistantId} = appointmentThatIsAboutToBeDeleted[0];
  
    let clientDayTimes  = createCombiOfPersonAndDayAndTime(clientId, day, time)
    dispatch(deleteDayTimeClient(clientDayTimes));
    
    let dentistDayTimes = createCombiOfPersonAndDayAndTime(dentistId, day, time)
    dispatch(deleteDayTimeDentist(dentistDayTimes));
  
    if (assistantId !== null) {
        let assistantDayTimes = createCombiOfPersonAndDayAndTime(assistantId, day, time)
        dispatch(deleteDayTimeAssistant(assistantDayTimes));
    }

    dispatch(deleteAppointmentInReduxToolkit(appointmentId))
    log('fn deleteAppointment end: ')
  }


