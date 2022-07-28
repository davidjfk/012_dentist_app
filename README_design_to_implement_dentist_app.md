# Design to implement dentist app:


# INTRO / REQUIREMENTS INTAKE

    Assumptions about the requirements:
    1. Each dental treatment requires the presence of 1 dentist.
    2. dentist decides if (s)he needs an assistant. 
    3. Each type of dental treatment can be with or without an assistant. 
    4. the nr of dental treatment rooms is infinite. 
    5. an assistent assists a dentist, but does not perform dental treatments on its own (in real life assistent would do e.g. oral hygiene treatment, remove tartar 
        etc.  )
    6. there are no checks if workload is spread evenly among dentists and assistants...welcome to the dental treatment sweatshop :). 


# BRANCHES 

    All feature branches (except the first one) start with "use_case_" followed by a nr  of 2 digits plus a description:

    I have devised and written this detailed design, before starting to write code for branch create_mock_data.  

    create_mock_data  
    (read branch create_mock_data as: 'use_case_00_create_mock_data')
        When you start your React app, the following entities have to be in your system:
        4 dentists
        2 assistants
        50 clients

        use case 0: add 4 dentists, 2 assistants and 50 clients to global state --> I use Redux-toolkit.

    use_case_01_create_150_random_dentist_appointments
        use case 1: create 150 random appointments that are rendered from global state

    use_case_02_add_appointment
        use case 2 includes: add appointment with assistant,  as well as appointments without assistants. 

    use_case_03_delete_appointment 

    use_case_04_update_appointment

    use_case_05_add_dentist

    use_case_06_add_client
      
    use_case_07_cancel_appointments_because_client_is_ill
      
    use_case_08_give_appointments_of_sick_dentist_a_red_background_color

    use_case_09_give_appointments_of_sick_assistant_an_orange_background_color: (if time left, not a winc-requirement)

    use_case_10_add_assistant: (if time left, not a winc-requirement)

    use_case_11_bonus_treatment_types: --> see chapter treatment types 

    use_case_12_bonus_working_form_and_buttons_for_all_operations


# DEFINITIONS AND NAMING CONVENTIONS:
    Client = patient in a dental practice. Winc assignment uses the word 'client', so I have replaced the word 'patient' in the code by 'client'.
    Assistant = dental assistant
    business rule = winc requirement. I use these words interchangeably. Ex of business rule: 'A dentist or assistant cannot have two appointments at the same time.'.

    Each patient, dentist, assistent and appointment (as data state that are created in the just mentioned components with the same name) will have their own id consisting of 3 parts: surname + undercore + unique nr of 6 digits (randomn or ascending nr from a closure) e.g. Darwish_953462.  I need this format to be sure that I select e.g. the correct patient  to make an appointment (e.g. 2 patients can have the name Bakir). First the name and then the unique nr makes it possible to sort the select-box-options before I insert the options into the selectbox. 

    Component calendar must handle 28 days of a next month: 20 working days and 8 weekend days. Day is depicted as a number (e.g. 5, meaning day 5)
    
    On working days dentists and/or assistants work from 07.00 until 19.00 (last appointment starts at 18.00). (no lunch break, sorry :) ). Use component-business-logic, or form validation to check that correct day and time are selected to make an appointment. 
    Time is depicted as a number (e.g. 16, meaning: 16.00 o'clock)
    
    Each appointmentId is unique and consists of 7 digits.
    ex: 1234567
    Each appointment lasts an hour.

    Each personId is unique.
    A personId can be created for a client, dentist or assistant.
    Each personId contains a surname, a hyphen and a unique nr of 6 digits.
    For a client, the personId is called: clientId. ex: clientId= Johnson-05439432
    For a dentist, the personId is called: dentistId. ex: dentistId= Ayad-083596
    For an assistant, the personId is called: assistantId. ex: asssitantId= Bakir-03949463
    
    ex:
        example dentist object:
            dentistObject = {
                dentistId= Ayad-083596,
                firstName= "James",
                lastName= Ayad,
                phone="0612345678",
                email="James.Ayad@dentistcompanybvt.com",
                treatmentTypes= ["periodontalDisease", "filling", "brace", "crown", "dentalVeneer"], //--> implement later as bonus assignment
                isSick: false,
                key:dentistId
            }


        example assistant object:
            assistentObject = {
                assistantId= Bakir-03949463,
                firstName= "Michael",
                lastName= Bakir,
                phone="0600345678",
                email="Michael.Bakir@dentistcompanybvt.com",
                isSick: false,
                key:assistantId 
            }


        example client object:
            clientObject= {
                clientId= Johnson-05439432,
                firstName= "Abhilash",
                lastName= Johnson,
                phone="0612340012",
                email="Abhilash.Johnson@hotmail.com",
                isSick: false, 
                key:clientId  
            } 



    The combination of "person"Id (as a denominator of clientId, dentistId or assistentId), day and time is always unique. 
    Ex: "DeGooijer-305404_20_10" === person DeGooijer (can be dentist, assistant or client) has appointment on day 20 at 10 o'clock (until 11).

    The combinations of personId-day-time will be saved in a separate array for dentists, assistants and clients. So there is no need to do this: "client_DeGooijer305404_20_10". 
    (these arrays will be used to check if a person already has an appointment on a certain day-time combination (e.g. day 2 at 16 o'clock)).
    

    client-day-time = e.g. Atjep-0510 = client Atjep has an appointment on day 5 at 10.00 o'clock.
    dentist-day-time = e.g. Angga-0510 = dentist has an appointment on day 5 at 10.00 o'clock.
    assistant-day-time = e.g. Bakker-0510 = assistant has an appointment on day 5 at 10.00 o'clock.




# GLOBAL STATE IN REDUX-TOOLKIT

    I will save global state in the following 7 redux-toolkit slices:

    APPOINTMENTSLICE
        appointmentSlice will be saved in the store as reducer  " appointmnent: appointmentReducer "
        appointmentSlice has the following reducer-object functions: // a.k.a "case reducer" functions (on redux-toolkit website)
            addAppointment    // used in use cases 1 and 2 (see chapters with same name)
            deleteAppointment  // used in use case 3 (see chapter with same name)
            updateAppointment  // used in use case 4 (see chapter with same name)
        appointmentSlice contains the following array in its state:
            apppointments 

    CANCELUPDATEAPPOINTMENTSLICE
        appointmentSlice will be saved in the store as reducer  " cancelUpdateAppointmnent: cancelUpdateAppointmentReducer "
        appointmentSlice has the following reducer-object functions: // a.k.a "case reducer" functions (on redux-toolkit website)
            saveAppointmentToUseForCancelUpdateOfAppointment  // used in use case 4 (see chapter with same name)
        appointmentSlice contains the following array in its state:
            appointmentToUseForCancelUpdateOfAppointment 

    CLIENTDAYTIMESLICE
        clientDayTimeSlice will be saved in the store as reducer  " clientDayTime: clientDayTimeReducer "
        clientDayTimeSlice has the following reducer-object functions:
            addDayTimeClient    // used in use cases 1 and 2 (see chapters with same name)
            deleteDayTimeClient  // used in use case 3 (see chapter with same name)
            updateDayTimeClient  // used in use case 4 (see chapter with same name)
        clientDayTimeSlice contains the following array in its state:        
            reservedCombinationsOfClientAndDayAndTime

            example:
            dispatch((addDayTimeClient({cientId}{day}{time}))
            push the value of combination of client AND day AND time into array reservedCombinationsOfClientAndDayAndTime.
            ex of format: Wang-043402_03_14   --> this means: clientId Jansen-043402 has appointment on day 3 at 14.00 o'clock.
            inside this reducers-object fn:
                reservedCombinationsOfClientAndDayAndTime.push({cientId}{day}{time})
            

    DENTISTDAYTIMESLICE
        clientDayTimeSlice will be saved in the store as reducer  " dentistDayTime: dentistDayTimeReducer "
        dentistDayTimeSlice has the following reducer-object functions:
            addDayTimeDentist    // used in use cases 1 and 2 (see chapters with same name)
            deleteDayTimeDentist  // used in use case 3 (see chapter with same name)
            updateDayTimeDentist  // used in use case 4 (see chapter with same name)
        dentistDayTimeSlice contains the following array in its state:  
            reservedCombinationsOfDentistAndDayAndTime

            example:
            dispatch((addDayTimeDentist({dentistId}{day}{time}))
            push the value of combination of dentist AND day AND time into array reservedCombinationsOfDentistAndDayAndTime
            ex of format: Chou0437702_03_14   --> this means: dentistId Chou047702 has appointment on day 3 at 14.00 o'clock.
            inside this reducers-object fn:
                reservedCombinationsOfDentistAndDayAndTime.push({dentistId}{day}{time})


    ASSISTANTDAYTIMESLICE
        assistantDayTimeSlice will be saved in the store as reducer  " assistantDayTime: assistantDayTimeReducer "
        assistantDayTimeSlice has the following reducer-object functions:
            addDayTimeAssistant   // used in use cases 1 and 2 (see chapters with same name)
            deleteDayTimeAssistant  // used in use case 3 (see chapter with same name)
            updateDayTimeAssistant  // used in use case 4 (see chapter with same name)
        assistantDayTimeSlice contains the following array in its state:  
            reservedCombinationsOfAssistantAndDayAndTime

            example:
            dispatch((addDayTimeAssistant({assistantId}{day}{time}))
            push the value of combination of assistant AND day AND time into array reservedCombinationsOfAssistantAndDayAndTime
            ex of format: Lin450212_03_14   --> this means: assistantId Lin450212 has appointment on day 3 at 14.00 o'clock.
            inside this reducers-object fn:
                reservedCombinationsOfAssistantAndDayAndTime.push({assistantId}{day}{time})


    CLIENTSLICE
        clientSlice will be saved in the store as reducer  " client: clientReducer "
        clientSlice has the following reducer-object functions:
            addClient  
        clientSlice contains the following array in its state:
            clients


    DENTISTSLICE
        dentistSlice will be saved in the store as reducer  " dentist: dentistReducer "
        dentistSlice has the following reducer-object functions:
            addDentist  
            deleteDentist (not a Winc requirement, so only if time left)
            updateDentist (not a Winc requirement, so only if time left)            
        dentistSlice contains the following array in its state:
            dentists


    ASSISTANTSLICE (not a Winc requirement, so only if time left)
        assistantSlice will be saved in the store as reducer  " assistant: assistantReducer "
        assistantSlice has the following reducer-object functions:
            addAssistant
            deleteAssistant  
        assistantSlice contains the following array in its state:
            assistants


    TREATMENTTYPESLICE (bonus Winc requirement, so only if time left) 
    // just using an array with treatmentTypes also meets the winc requirements. It is not a requirement to CRUD treatmentTypes. So I do that instead.
        treatmentTypeSlice will be saved in the store as reducer  " treatment: treatmentReducer "
        treatmentTypeSlice has the following reducer-object functions:
            addTreatment (needed if I add a new dentist with a combobox in which also new treatmentTypes can be added)
            deleteTreatment  
        treatmentTypeSlice contains the following array in its state:
            treatments



    About the reservedCombinationsOf(...)AndDayTime:
        array reservedCombinationsOfClientAndDayAndTime 
        array reservedCombinationsOfDentistAndDayAndTime
        array reservedCombinationsOfAssistantAndDayAndTime
    These arrays are necessary, because, e.g. if a client has been added to an appointment in USE CASE 1 above (e.g. Johnson-0510  -- meaning: Johnson has appointment on day 5 at 10 o'clock), then in USE CASE 2 another appointment for  Johnson on day 5 cannot be scheduled. 
    

    I create component 'InitialSetupForMakingAppointments' in use case 0, to initialize the state , that is shared between multiple use cases.


# OBJECTS: APPOINTMENT, CLIENT, DENTIST, ASSISTANT
    Objects in global state:

        example appointment object:
            appointmentObject = {
                appointmentId: 0569464, // 7 digits
                clientId: Darwish_953462,
                client: firstName lastName, --> derived data from object client. usage: display in calendar view and day view.
                day: 20,
                time: 10,
                treatmentType: ["parodontology", "fillings"], --> implement later as bonus assignment.
                dentistId: Ayad_083596,
                dentist: firstName lastName, --> derived data from object dentist. usage: display in day view.
                assistantId: Bakir_03949463,
                assistant: firstName lastName, --> derived data from object assistant. usage: display in day view.
                isNowUpdatingThisAppointment: false, --> while appointment is updated (see use case 'update an appointment' below), the boolean is set to true. 
            }


        example client object:
            clientObject= {
                clientId= Johnson-05439432,
                firstName= "Abhilash",
                lastName= Johnson,
                phone="0612340012",
                email="Abhilash.Johnson@hotmail.com",
                isSick: false // false is the default value.
            } 


        example dentist object:
            dentistObject = {
                dentistId= Ayad-083596,
                firstName= "James",
                lastName= Ayad,
                phone="0612345678",
                email="James.Ayad@dentistcompanybvt.com",
                treatmentTypes= ["periodontalDisease", "filling", "brace", "crown", "dentalVeneer"], // --> implement later as bonus assignment. 
                isSick: false // false is the default value.
            }


        example assistant object:
            assistentObject = {
                assistantId= Bakir-03949463,
                firstName= "Michael",
                lastName= Bakir,
                phone="0600345678",
                email="Michael.Bakir@dentistcompanybvt.com",
                isSick: false  // false is the default value.
            }


        In Day.js the entire appointment object will be used to display an appointment in the Day-View.
        In AppointmentInMonth  the following properties of the appointment object will be used to display an appointment in the Month-View:
        appointmentObject = {
            appointmentId: {id},
            client: {client},
            day: {day},
            time: {time},
            isSick: false, 
        }

 
# COMPONENT STRUCTURE: 

    Components 2-8 below are child components of App.js.
    
    1. App.js 
    2. AddAppointment.js contains the following child components:
        a. InitialSetupForMakingAppointments.js
        b. CreateRandomAppointmentsWhenAppStarts.js (smart component)   // this is USE CASE 1.
            --> expected result: 4 dentists, 2 assistants, 50 clients and 150 appointments will be added to the dentist app.
        c. CreateManualAppointmentAfterDentistAppHasStarted (smart component)  // this is USE CASE 1.
            --> expected result: 1 dentist appointment (at a time) created by either the assistant or the dentist. 
    3. UpdateAppointment
    4. Calendar.js 
    5. Day.js 
    6. Client.js 
    7. Dentist.js 
    8. Assistant.js  --> not a requirement to CRUD an assistent. Implement if time left. 


    Components Dentist.js and Assistant.js are subdivided in a component-to-add, and a component-to-display, e.g. AddClient.js and DisplayClient.js. But "AddAppointment.js" has the calendar(month) and day view to display the appointments. 


# ROUTING: the following components get (or retain) their own routing:
    1. AddAppointment.js --> this is  the most important page that will be used most often, so its NavLink will be to the left of the screen.
    2. UpdateAppointment.js
    3. Calendar view.js // (with delete button for each appointment)
    4. Day view.js  // (with delete button for each appointment)
    5. Patient.js --> more patients get added than dentists or assistants,  so I add Patient.js first
    6. Dentist.js 
    7. Assistant.js --> skip, not a requirement (unless  I have time left)





# CONSIDERATIONS TO CREATE A DENTIST APPOINTMENT
    There are basically 2 types of state in the application:
    1. array with person-objects: 1 array with dentists, 1 array with assistants, 1 array with clients.
    2. array with appointment-objects. person-objects deliver the input (except for date-time and in the bonus requirement 'treatmentType' ) to create an appointment (object). 

    These 2 types of state need to be delt with in 2 phases of the application life-cycle:
    1. when the application  starts (and 4 dentists, 2 assistants, 50 clients and 150 appointments need to be in the system)
    2. when the application has started already and the dentist or assistant wants to CRUD appointments (within this  "big" phase, each  C,R,U and D is a "small/sub" phase).

    Below I describe for both phases of the application life-cycle how appointments can be added to state, in such a way that they are compliant with the winc requirements from the assignmennt. 
    


    ** task: put dentists, assistants and clients in  global state

        The following data has been created in Mockaroo:
            4 dentists
            2 assistants
            50 clients
        This data has been downloaded as json-files into directory 'dataInDentistAppWhenDentistAppStarts'.
        2do: put this data in the global state (e.g. Redux-toolkit slices)  (A).


        I do this from within component InitialSetupForMakingAppointments.js 





    ** task: select dentist, client and assistant from global state as input for making dentist appointment.
        The dentists, assistants and clients in global state (A, see about 10 lines above above) serve as input to create 150 appointments.         
        These 150 appointments must also be saved into global state  (B).
        (A) and (B) together are the data that must be in the application when the application starts.

        Remark: as opposed to notes from June 27th, fn generateRandomAppointments cannot be removed.
        The output of fn generateRandomAppointments must be saved into global state.

        pitfall: do NOT create an appointment directly with the mock(aroo) JSON data of dentists, assistants and client !!). Otherwise the same state is saved twice, which would be a bad practice. Example of how not to do it: first you save a dentist mrToothA as one of the 4 dentists into app state when the application starts.  Then you use mrToothA from the same json file to create 1 of the 150 appointments. Problem: mrToothA now exists in the App (global)
        state twice (which is wrong and cause mrHeadA...). 

        To make these words actionable:

        <start>
            In file utils.js: we get the following code to kick-start the dentist app:

            const generateRandomAppointment = () => ({
                appointmentId: generateRandomAppointmentId(), // not part of the kick-start code.  
                client: getRandomName(clientsOfDentistCompanyBVTInGlobalState),
                day: getRandomDay(),
                time: getRandomTime(),
                treatmentType: {treatmentType} // not part of kick-start code --> implement later as bonus assignment. 
                dentistId: getRandomName(dentistsOfDentistCompanyBVTInGlobalState),
                assistantId: getRandomName(assistantsOfDentistCompanyBVTInGlobalState),
                isNowUpdatingThisAppointment: false, // not part of the kick-start code.  
                key: appointmentId  // React needs a key property to ierate over an array (e.g. with map fn)
            });

            const generateRandomAppointments = num =>
            Array(num)
                .fill(0) 
                .map(_ => generateRandomAppointment());

            export default generateRandomAppointments;
        </end>
        
        2do in this winc kick-start code: retrieve clientsDentistCompanyBVT, dentistsDentistCompanyBVT and assistantsDentistCompanyBVT from global state, but NOT from the json Mockaroo files.



    ** task: validate if the generated data to make appointment (i.e. day, time, client, dentist, assistant [2do later: bonus requirement: treatmentType]) 
        comply with the business rules. This is a necessary step before you can put the appointment  into global state. 

        Question is now: how do I validate a getRandomName? (can be a client, a dentist and an assistant) (see next section)


        The output of fn generateRandomAppointment, i.e. a random appointment, must be saved to global state, together with the remaining 149 appointments. However, before (B) can also be put into global state, (B) needs to comply with the following winc-requirement: 'A dentist or assistant cannot have two appointments at the same time.'  Likewise (although not an explicit winc-requirement): 'A client cannot have two appointments at the same time.' (unless the 2nd appointment is for a foot massage :)  ).
        To make these words actionable:
        
        (part of fn generateRandomAppointment above: )
        client: getRandomName(clientsDentistCompanyBVT),
        dentist: getRandomName(dentistsDentistCompanyBVT),
        assistant: getRandomName(assistantsDentistCompanyBVT),
        
        What this means: these 2 requirements act as a validation on the output of fn getRandomName. 
        Scope: these 2 requirements must be enforced in the following 3 use cases:
                1) generating random appointments that are in the dentist app when the dentist app starts.
                2) create a new dentist appointment, after the application has started and has been loaded with state.
                3) update a dentist appointment by rescheduling an appointment to another dentist (and/or assistant), after the application has started and has been loaded with state. (this is not a winc requirement, but fun to implement, if time left/permits)

        A getRandomName can be about a random client, random dentist or random assistant.       
        So 3 actors (client, assistant, dentist) * 3 use cases = 9 situations with the same type of validation. So I will do the validation in a fn.
        
        Such a validation (by a fn preferably) is absolutely necessary, because:
        Given that the following parameters of each of the 150 appointment are determined randomly:
        a) day-time
        b) client
        c) treatmentType (bonus requirement)
        d) dentist
        e) assistant 
        and given the winc-requirement to make the 150 appointments with (only)  4 assistants,  2 assistants and 50 clients (if there were 100.00 assistants, dentists and clients for 150 appointments then there would be far less incentive to worry about 2 appointments scheduled for the same person at the same time)....the risk of scheduling 2 new appointments for the same person at the same time, is too big. This also applies to making an appointment  after the application has started.

        So chances of a client having 2 appointments at the same time (idem for dentist, idem for assistant) are considerable and a showstopper / bug. Such a bug would make the application unreliable / "render" the entire application useless. 

        
        Back to the question: how do I validate a getRandomName? 
        I take a step back and first describe the different use cases in which validating these 2 business rules plays a role: 
            USE CASE 1OF2: CREATE A RANDOM DENTIST APPOINTMENT, TO LOAD WHEN APPLICATION STARTS. 
            USECASE 2OF2: CREATE APPOINTMENT IN THE APPLICATION (AT FIRST WITH A FN CALL, LATER IN THE BONUS REQUIREMENT WITH A FORM)
        The validation process in usecase 1 is different compared to use case 2, because of the random data that is being created in use case 1. The presence of random data in use case 1, but not in usecase 2 makes it (imho) impossible to combine usecases 1 and 2 into one "giant" usecase.

        So below I describe the use cases separately and gradually drill down to describing the validation of the business rules as an integral part of each of the use cases. But first I fast-forward to the following 2 topics to keep the bird's-eye view:
        a) how and where use cases 1 and 2 will end up as components in the application.
        b) description of the state that is shared by use cases 1 and 2




# USE CASE 0: create component InitialSetupForMakingAppointments, using data from Mockaroo
        When you start your React app, the following entities have to be in your system:
        4 dentists
        2 assistants
        50 clients
        Use one JaveScript object with all data as the state of the app.

        use case 0: add 4 dentists, 2 assistants and 50 clients to global state.

        step: create mock data for dentists, assistants and clients (--> see https://www.mockaroo.com/ and info about mockaroo further down below in this chapter )  and load this data into the global state when the application starts (useEffect hook). 

        The following step 2 are executed only once, like an initial setup. 

        use case steps: 
        1.  Inside component App.js --> create child component AddAppointment.js --> create "child of child" component 'InitialSetupForMakingAppointments'. 

        2.  load the dentists, clients and assistants from  mockaroo json files into global state.
        
        3. then get the data from global state into component 'InitialSetupForMakingAppointments' (so it can be used in the next use case to 
            make 150 random appointments).
        

    Mockaroo
        analysis: downloading data from https://www.mockaroo.com/ is one-way traffic from mockaroo server into my app state (probably redux-toolkit slice).
        I need mock data for 3 components: (see June 25th for the component structure)
        1. Dentist.js  (e.g. add a dentist)
        2. Assistant.js
        3. Client.js 
        
        Mockaroo is not used to create the following data:
        4. types of treatments ---> this will be array 'treatmentTypes' of about 12 treatment types that will be added to utils.js, and as a select-box-options in component AddAppointment.js.
        5. a calendar with 4 weeks (28 days) with 20 working days (ma-fr) on which appointments can be scheduled between 09.00-17.00 o'clock. 
            --> I can re-use in utils.js fns getRandomDay and getRandomTime.
            --> In the form AddAppointment.js (bonus requirement, so implement at the end) I will do input validation on day and time of the day, so only correct day-time combinations can be selected. 

        The data from these 3 components (nrs 1-3) (i.e. the output / returned data (e.g. an added dentist)) will be downloaded in format json and stored each in a separate data file inside the dentist app in folder 'dataInDentistAppWhenDentistAppStarts'. 

        current situation: inside utils.js fn getRandomName( ) is used on the same dataset to randomnly generate a client, dentist or assistant.
        expected/desired situation: fn getRandomName( ) will select:
        a) as a client: from mockaroo json data with mock clients 'clients.js' .
        b) as a dentist: from mockaroo json data with mock dentists 'dentists.js' .
        c) as an assistant: from mockaroo json data with mock assistants 'assistants.js' .
        So the current array 'names' in util.js will be deleted and replaced by imports to the files clients.js, dentists.js and assistants.js. This data will be put into state (redux-toolkit slices), before being used to create random appointments. 

        
        A useEffect hook will be used (in "componentDidMount mode") to load the data from Mockaroo (nrs 1-3) into the app-state-object. 
        


# USE CASE 1: CREATE A RANDOM DENTIST APPOINTMENT, TO LOAD WHEN APPLICATION STARTS. 

        winc-requirement: when you start your React app, the following entities have to be in your system:
        150 appointments
        Use one JaveScript object with all data as the state of the app.

        use case 1: create 150 random appointments that are rendered from global state
        2do: use data in state from the previous branch (i.e. 4 dentists, 2 assistants, 50 clients) to create and show 150 appointments in the Calendar(month) View and Day when the application starts.

        use case steps: 
        1.  assumption: before doing this use case, use case 0 must be ready (i.e. implemented).

        2.  Init the following vars with a useEffect hook with  empty array as dependency inside component 'InitialSetupForMakingAppointments'.

            Initialize empty array 'appointments' (Y). 
            Initialize empty array 'reservedCombinationsOfClientAndDayAndTime' (A) that will contain all used "taken" combinations of 'client-day-time' (M). 
            Format of 'client-day-time': {clientId}{day}{time}  (concatenated without e.g. underscore as separator)

            Initialize empty array 'reservedCombinationsOfDentistAndDayAndTime' (D) that will contain all used "taken" combinations of 'dentist-day-time' (K).
            Format of 'dentist-day-time': {dentistId}{day}{time}  (concatenated without e.g. underscore as separator)

            Initialize empty array 'reservedCombinationsOfAssistantAndDayAndTime' (E) that will contain all used "taken" combinations of 'assistant-day-time' 
            (L).
            Format of 'assistant-day-time': {assistantId}{day}{time}  (concatenated without e.g. underscore as separator)

            Y contains the appointments that are rendered to the screen in the Calendar View and the Day View. 
            M, K and L will be used to check if a client, dentist or assistant already has an  appointment on a specific day and time, when you (as an assistant or dentist) try to make another appointment on that day and time for that particular client, dentist or assistant. 

            M, K and L must be initialized inside global state (e.g. redux-toolkit slice)

            Y will be filled with objects, whereas (M), (K) and (L) will be  filled with scalar values (e.g. strings). 
            Y, M, K and L are going to be used inside "case reducer" fns to update state. (example: see chapter 'USE CASE 3: DELETE APPOINTMENT') 

            
        3.  (just thinking out loud here, this  is not a step to "do", but describes the "why" of the following steps) 
            (M), (K) and (L) will be needed in the following 3 use cases (to verify that the combi of e.g. 'client with day-time', 'dentist with day-time', 'assistant with day-time' has not already been taken, so individually a client, dentist and assistant do NOT end up with 2 appointments scheduled at the same time).
            use cases:
            1. create 150 random appointments that will be rendered to the screen when the application starts.
            2. when the application has already started: as an assistant or dentist I add an appointment for a client.
            3. (not a winc requirement, implement if time permits) when the application has alreaddy started: as an assistant or dentist I update an appointment for a 
                client by rescheduling the appointment from dentist 'foo' to dentist 'bar'.        
            

        4.  Inside component AddAppointment, create component CreateRandomAppointmentsWhenAppStarts.js
            Inside component CreateRandomAppointmentsWhenAppStarts, fn generateRandomAppointments (plural) in a useEffect with [] as a dependency, will call fn generateRandomAppointment (singular) 150 times.

            I can make use of the winc kick-start code:
            <start>
                In file utils.js: we get the following code to kick-start the dentist app:

                const generateRandomAppointment = () => ({
                    appointmentId: generateRandomAppointmentId(), // not part of the kick-start code.  
                    client: getRandomName(clientsOfDentistCompanyBVTInGlobalState),
                    day: getRandomDay(),
                    time: getRandomTime(),
                    treatmentType: {treatmentType} // not part of kick-start code --> implement later as bonus assignment. 
                    dentistId: getRandomName(dentistsOfDentistCompanyBVTInGlobalState),
                    assistantId: getRandomName(assistantsOfDentistCompanyBVTInGlobalState),
                    isNowUpdatingThisAppointment: false, // not part of the kick-start code.  
                    key: appointmentId  // React needs a key property to ierate over an array (e.g. with map fn)
                });

                // left 2 do in this fn: validate that client nor dentist nor assistant can have 2 appointments at the same moment / day-time-combi.
                
                const generateRandomAppointments = num =>
                    Array(num)
                        .fill(0) 
                        .map(_ => generateRandomAppointment());

                export default generateRandomAppointments;
            </end>


        5. create fn generateRandomAppointment. 

           

            /*
                Suppose that in 40% of all appointments, an assistant needs to take part in the appointment:
                20 days * 4 dentists * 8 appointments per day * 0.6 (change of dentist not needing an assistant) = 384
                20 days * 2 assistants * 8 appointments per day * 0.4 (change of dentist needing an assistant) = 128
                So in 20 working days 384 + 128 = 512 appointments can be scheduled.


                I use Math.random() to select client, dentist and assistant, but must be 100% sure that the 150 appointments are created, when the application loads (because this is a winc requirement).
                A maximum of 4 appointments can be scheduled on 1 day-time-combi, (ex: day 02 at 10 o'clock), but I need a 150. 
                4 appointments supposes that that they are all scheduled without an assistant, but 40% will be scheduled with a mandatory assistant. So the practical maximum of appointments (due to assistants not being available to avoid 2 appointments at the same time, or because assistant is ill) will be less than 4 appointments scheduled per 1 day-time-combi.
                
                So it does not make sense to try a 100 times to make an appointment with random data (client, dentist, assistant, day, time) on one day-time-combi (ex: day 07 at 14.00 o'clock). 
                At the other extreme it does not make sense either to try to make an appointment only once in a certain day-time-combi, and then immediately move on by selecting another day-time-combi in the pursuit of making random appointments.
            */

            fn generateRandomAppointment (nrOfAppointments) {
                let appointmentId = generateRandomAppointmentId();
                let randomAssistant;
                let day = getRandomDay()  // see utils.js
                let time = getRandomTime() // see utils.js
                
                /*
                    winc-requirement: The practice is closed on the weekend.
                    // status: I have updated fn getRandomDay, so now it complies with this requirement.
                */
                let randomClientId = getRandomPersonId(clientsOfDentistCompanyBVTInGlobalState);
                let randomDentistId = getRandomPersonId(dentistsOfDentistCompanyBVTInGlobalState);

                /*
                40% chance that appointment requires the presence of an assistant:
                */
                let isAssistantNeededForAppointment = false;
                let randomNrThatDecidesIfAssistantMustBePresentAtAppointment = Math.random();
                if (randomNrThatDecidesIfAssistantMustBePresentAtAppointment < 0.4){
                    isAssistantNeededForAppointment = true;
                    randomAssistantId = getRandomName(assistantsOfDentistCompanyBVTInGlobalState);
                } 
                

                if (isAssistantNeededForAppointment) {
                    If (checkIfPersonWithDayAndTimeIsUnique(randomClientId, day, time, personType="client" = client) &&
                        checkIfPersonWithDayAndTimeIsUnique(randomDentistId, day, time, personType = "dentist") &&
                        checkIfPersonWithDayAndTimeIsUnique(randomAssistantId, day, time, personType = "assistant"))
                    ) {

                        dispatch((addDayTimeClient({cientId}{day}{time}))
                            /* 
                                inside this reducers-object fn:
                                reservedCombinationsOfClientAndDayAndTime.push({cientId}{day}{time})
                            */

                        dispatch((addDayTimeDentist(dentistId}{day}{time}))
                            /*
                                inside redux-toolkit slice: 
                                reservedCombinationsOfDentistAndDayAndTime.push({dentistId}{day}{time})
                            */ 

                        dispatch((addDayTimeAssistant(assistantId}{day}{time}))
                            /*
                                inside redux-toolkit slice: 
                                reservedCombinationsOfAssistantAndDayAndTime.push({assistantId}{day}{time})
                            */
                        
                        // add the appointment object to to the array with existing appointments
                            let appointmentId = generateRandomAppointmentId();
                            let key = appointmentId;
                            let newAppointmentObject = {appointmentId, clientId, day, time, dentistId, assistantId, isSick=false, isNowUpdatingAppointment = false, key} // bonus: 1 treatmentType
            

                            dispatch((addAppointment(newAppointmentObject))
                            /*
                                inside redux-toolkit slice: appointments.push(newAppointmentObject)
                            */

                        
                        /* status: the appointment is rendered/added to the Calender (month) View and the Day View. So you are done here.
                           
                           example of appointment object (that has been added to array appointments):
                                appointmentObject = {
                                    appointmentId= 056946,
                                    clientId: Darwish_953462,
                                    day: 20,
                                    time: 10,
                                    treatmentName: "parodontology",
                                    dentistId: Ayad_083596,
                                    assistantId: Bakir_03949463,
                                    isNowUpdatingThisAppointment: false, --> while appointment is updated (see use case 'update an appointment' below), the boolean is set to true. 
                                    key: appointmentId
                                }
                        */

                        return;
                    } else {
                        generateRandomAppointment();
                    }
                } else {
                    If (checkIfPersonWithDayAndTimeIsUnique(randomClientId, day, time, personType = "client") &&
                        checkIfPersonWithDayAndTimeIsUnique(randomDentistId, day, time, personType = "dentist") 
                    ) {

                    If (checkIfPersonWithDayAndTimeIsUnique(clientId, day, time, personType = client) &&
                        checkIfPersonWithDayAndTimeIsUnique(dentistId, day, time, personType = dentist) 
                    ) {
                        dispatch((addDayTimeClient({cientId}{day}{time}))
                            /* 
                                inside this reducers-object fn:
                                reservedCombinationsOfClientAndDayAndTime.push({cientId}{day}{time})
                            */

                        dispatch((addDayTimeDentist({dentistId}{day}{time}))
                            /*
                                inside redux-toolkit slice: 
                                reservedCombinationsOfDentistAndDayAndTime.push({dentistId}{day}{time})
                            */ 
                        
                        // add the appointment object to to the array with existing appointments
                            let appointmentId = generateRandomAppointmentId();
                            let key = appointmentId;
                            let newAppointmentObject = {appointmentId, clientId, day, time, dentistId, assistantId, isSick=false, isNowUpdatingAppointment = false, key} // bonus: 1 treatmentType
            

                            dispatch((addAppointment(newAppointmentObject))
                            /*
                                inside redux-toolkit slice: appointments.push(newAppointmentObject)
                            */

                        return;
                    } else {
                        generateRandomAppointment();
                    }
                } 
            }


        6. create fn checkIfPersonWithDayAndTimeIsUnique (personId, day, time, personType) {}:
            
            function checkIfPersonWithDayAndTimeIsUnique (personId, day, time, personType) {
                const { reservedCombinationsOfClientAndDayAndTime } = useSelector((state) => state.clientDayTime);
                const { reservedCombinationsOfDentistAndDayAndTime } = useSelector((state) => state.dentistDayTime);
                const { reservedCombinationsOfAssistantAndDayAndTime } = useSelector((state) => state.assistantDayTime);
                // 2do at the end (if time left): improve performance of how to load data from global state into this fn. Use e.g. useMemo( ). 2do: investigate.

                let arrayWithDayAndTimeCombinationsThatAreTaken = [];
                switch (personType) {
                    case client:
                        arrayWithDayAndTimeCombinationsThatAreTaken = reservedCombinationsOfClientAndDayAndTime; 
                        break;
                    case dentist:
                        arrayWithDayAndTimeCombinationsThatAreTaken = reservedCombinationsOfDentistAndDayAndTime; 
                        break;
                    case assitant:
                        arrayWithDayAndTimeCombinationsThatAreTaken = reservedCombinationsOfAssistantAndDayAndTime; 
                        break;
                    default:
                        console.error(`this ${personType} does not exist`)
                }
                return (arrayWithDayAndTimeCombinationsThatAreTaken.includes((`${personId}${day}${time}`) ? false : true ))
                
            }
        /*    
            7. create 150 appointments: generateRandomAppointment(150)
            8. put these 150 appointments into global state (redux-toolkit slice)  --> this is done inside the winc-starter-code fn generateRandomAppointments. 
            9. In component App.js in child components Calendar and Day, display the 150 appointments from global state.
            10. In component App.js remove ' import generateRandomAppointments from "./utils";  '.
            11. End result: the 150 appointments have been created once while the application starts and have been put into global state. From there they are imported in component App.js and rendered in the Calendar View and Day View. 
        */ 

# USECASE 2: CREATE APPOINTMENT IN THE APPLICATION (AT FIRST WITH A FN CALL, LATER IN THE BONUS REQUIREMENT WITH A FORM)

        use case 2 includes: add appointment with assistant
            - add an appointment without an assistant: newState = addAppointment(state, day, time, patientId, dentistId) Note: an appointment on a day + time can only be added when the choosen dentist and/or assistant is available.

            winc-requirements:
            An appointment is always with one client.
            An appointment is always with one dentist.
            The practice is closed on the weekend.


        use case 2 includes: add appointment without assistant
            - add an appointment with an assistant: newState = addAppointment(state, day, time, patientId, dentistId, assistentId)

            winc-requirements:
            An appointment is always with one client.
            An appointment is always with one dentist.
            The practice is closed on the weekend.
        
        
        design choice: 
            so while creating an appointment you cannot create e.g. a client, nor assistant, nor dentist. You must do that before you create an appointment, because these are separate workflows. 
        
        use case:  a an assistant or dentist I enter a dental appointment for a client into the dentist-app: 
        For fn checkIfPersonWithDayAndTimeIsUnique, see  USECASE 1OF2 above.
        The core functionality of the dentist app is about making appointments, because different types of state get together here.

        use case steps: 
        1.  assumption: before doing this use case, use cases 0 and 1 must be ready (i.e. implemented).

        2. 
        3. Inside component App.js --> inside component AddAppointment.js: create component 'CreateManualAppointmentAfterDentistAppHasStarted'. 

        4. There are 2 phases to make an appointment in the application:
            "phase 1:" at first with a fn call to fn addAppointment (see step 5 below). This fn call serves as a proxy/"substitute" for creating an 
                appointment with a "regular" form in the dentist application.

            "phase 2:" as a bonus requirement: create an appointment by filling out fields in a form. The workflow is as follows:
                - choose client (from selectbox)
                - select 1 treatment (from selectbox) --> must be step 2, otherwise I cannot check if dentist has the skill to perform this treatment (is 
                    bonus requirement)
                - choose day (e.g. 23 means day 23 means week 4 on a Tuesday) from select box. --> before selecting the dentist, otherwise I cannot check availability of dentist nor 
                    assistant in the next steps
                - choose time (e.g. 15 means 15.00 o'clock) from select box. --> before selecting the dentist, otherwise I cannot check availability of dentist nor 
                    assistant in the next steps
                - choose dentist (from selectbox)  
                - choose assistant (from selectbox) 
                - click button 'save appointment'
                - in the onSubmit fn you do e.preventDefault() 
                - call fn addAppointment (see step 5 below).
                - the "remainder" of this flow is identical to that of "phase 1".


            For both phases 1 and 2 there are 4 generic steps:
            step 1: fill out the appointment info:
                    client
                    treatment (bonus assignment)
                    day
                    time
                    dentist
                    assistant (optional)
            step 2: click button 'save appointment' to submit the form
            step 3: validate the appointment info, before (being allowed to) add the appointment to the array with appointment objects (that are rendered to 
                    the Calender/ month View and Day View).

                    Validate as follows: 
                    1.  select client
                    2.  select day (1 of 20 working days) and time ( 07.00 < time of appointment < and 19.00 ). Day and time are typed into their own input box (seems more user friendly than using a very long selectbox with all day-time combinations).
                    3. (later on as part of bonus assignment) select treatment type. 
                    4. select a dentist 
                    5. select an assistant
                    6. click save appointment 
                        Then validations will be performed:
                        1. Does the selected client already have an appointment on this  day and  time? Filter (state) array with all client appointments on
                            time and client (e.g. if (time==="20" && day==="10" && client="Mitterand-0469436") {alert("this client {client} already has an appointment on this day and time")})
                        2. Does selected dentist already have appointment on this day and time? Filter (state) array with all dentist appointments on time
                            and dentist (e.g. if (time==="20" && day==="10" && dentist="Ayad-083596") {alert("this dentist {dentist} already has an appointment on this day and time")})
                        3. does selected  dentist have the required skill?  --> later in bonus requirement.
                        4. Does selected assistant already have appointment on this day and time? Filter (state) array with all dentist appointments on time 
                            and assistant (e.g. if (time==="20" && day==="10" && assistant= "Bakir-03949463") {alert("this assistant {assistant} already has an appointment on this day and time")})

                    7. by performing a separate validation for availability of dentist and assistant, it is easier to display to fill the correct 
                        alert-message, also because assistant is an optional value when creating a dentist appointment.

            step 4: If client, dentist and assistant are availabe (and bonus: and dentist has the correct skill), then (after click on button 'add 
                    appointment') the appointment will be added to the global state object, and from there rendered to the Calendar (month) View and the Day View. 

            steps 3 and 4 takes place inside fn addAppointment (see further below).


        5. "phase 1" (step 4 above describes phase 1, and its 4 generic steps)
            The fn call comprises / handles / is about generic steps 1-4.

            call the fns from the winc assignment with data (i.e. client, dentist, assistant) that have already been added to global state.
            component AddAppointment.js will grab data from the the global state object (e.g. a client, dentist, assistant) to make an appointment. The day-time and treatment type will be selected manually.

            Winc requirement: In phase 1 component CreateManualAppointmentAfterDentistAppHasStarted.js will just be a smart component with business logic. This business logic is (in) the fn definition with code that executes when it is called by the following 2 fns calls:
                - add an appointment without an assistant: 
                newState = addAppointment(state, day, time, clientId, dentistId) 
                Note: an appointment on a day + time can only be added when the choosen dentist and/or assistant is available.

                - add an appointment with an assistant: 
                newState = addAppointment(state, day, time, clientId, dentistId, assistentId)


            These 2 fn calls are put inside this component Appointment.js right below its business logic, but above the return statement, and emulate / simulate a form in which you add an appointment: one without and one with an assistent. 
            Later on, during the bonus requirement (see phase 2 in step 4 below), the code to add an appointment,i.e. a form with controlled elements, will be added: either in the return statement of Appointment.js, or in a separate dumb component. When this is done, component AddAppointment will be the home-page ('/') in the nav routing.  The current home page will then be renamed to 'About.js'. 



        6. "phase 2"  (step 4 above describes phase 2, and its 4 generic steps)
        
            a) create form to add an appointment. Do this inside component 'CreateManualAppointmentAfterDentistAppHasStarted.js'. This component is a child  of component AddAppointment.js 
            b) select / fill out data on the form (selectboxes and input fields).  
            c) (2do if time left: add the validations before saving the controlled form, acting as a feedforward. So as soon as you select a client, day and time, the system  can already check if the client-day-time combi is vacant or not. This can already happen before having selected a dentist or assistant. The form controls (e.g. selectbox, input field) instantly update local state. So after each change you can validate if the  input is (still) valid. But at this stage you do not want alerts to pop up, but just a warning message instead, for better usability )
            c) click 'save appointment'.
            d) in the onsubmit fn, do a preventDefault.
            e) inside the onSubmit fn body, call  addAppointment (see step 5 below) 
            f) perform the validations. If the data does not pass the validations, then an alert is shown with the text ''please check if client, dentist and/or assistant have an appointment on this day and time'. If so, then look at the current calendar view to check who has a double appointment, adjust the data and click 'save appointment' again.
            f) to add another appointment by a dentist or assistant after the application has started, redo the steps b-f.


        7. create fn addAppointment
            assumption: for fn checkIfPersonWithDayAndTimeIsUnique, see USECASE 1OF2 above.

            function addAppointment (day, time, patientId, dentistId, assistantId=null) { // bonus: add treatmentType (do this later)
                 /* 
                    validate day-time-combi, because of winc-requirements: 
                        1. The practice is closed on the weekend.  --> implemented in fn call isValidWorkingDay( ) below.
                        2. An appointment can start at 08.00 o'clock in the morning, or later (I base this on the given winc fn 'getRandomTime( ) ).
                        3. An appointment can start at 18.00 o'clock in the evening, or before (I base this on the given winc fn 'getRandomTime( ) ).
                            2 and 3 have been implemented with fn call isValidWorkingTime( ) below. 
                 */
                
                /*
                    if (isValidWorkingDay(day) && isValidWorkingTime(time) ) {
                        // I do not want to combine validation of day and time with the validations in the if-statement below: it makes the code more difficult to read.
                    } else {
                        alert('Please select a correct day and time.') 
                        return // now I get out of fn addAppointment, so as an assistant or dentist I can fill out the correct day and/or time (in a new attempt).
                    };
                */
                // easier solution: day and time can only be entered in a select box with pre-defined valid options (so it becomes impossible to e.g. fill out 22 o'clock to make an appointment). 

                //winc-requirement: An appointment sometimes has an assistant. 
                if (assistantId !=="") {
                    If  (checkIfPersonWithDayAndTimeIsUnique(clientId, day, time, personType = client) &&
                        checkIfPersonWithDayAndTimeIsUnique(dentistId, day, time, personType = dentist) &&
                        checkIfPersonWithDayAndTimeIsUnique(assistantId, day, time, personType = assistant))
                    ) {

                        dispatch((addDayTimeClient({cientId}{day}{time}))
                            /* 
                                inside this reducers-object fn:
                                reservedCombinationsOfClientAndDayAndTime.push({cientId}{day}{time})
                            */

                        dispatch((addDayTimeDentist(dentistId}{day}{time}))
                            /*
                                inside redux-toolkit slice: 
                                reservedCombinationsOfDentistAndDayAndTime.push({dentistId}{day}{time})
                            */ 

                        dispatch((addDayTimeAssistant(assistantId}{day}{time}))
                            /*
                                inside redux-toolkit slice: 
                                reservedCombinationsOfAssistantAndDayAndTime.push({assistantId}{day}{time})
                            */
                        
                        // add the appointment object to to the array with existing appointments
                            let appointmentId = generateRandomAppointmentId();
                            let key = appointmentId;
                            let newAppointmentObject = {appointmentId, clientId, day, time, dentistId, assistantId, isSick = false, isNowUpdatingAppointment = false, key} // bonus: 1 treatmentType
            

                            dispatch((addAppointment(newAppointmentObject))
                            /*
                                inside redux-toolkit slice: appointments.push(newAppointmentObject)
                            */

                        
                        /* status: the appointment is rendered/added to the Calender (month) View and the Day View. So you are done here.
                           
                           example of appointment object (that has been added to array appointments):
                                appointmentObject = {
                                    appointmentId= 056946,
                                    clientId: Darwish_953462,
                                    day: 20,
                                    time: 10,
                                    treatmentName: "parodontology",
                                    dentistId: Ayad_083596,
                                    assistantId: Bakir_03949463,
                                    isSick, false,
                                    isNowUpdatingThisAppointment: false, --> while appointment is updated (see use case 'update an appointment' below), the boolean is set to true. 
                                    key: appointmentId
                                }
                        */
                    }

                    } else {
                        alert(Person {person.lastName} already has an appointment on {day} at {time} o'clock.)
                        return; // now I get out of fn addAppointment, so as an assistant or dentist I can correct the input. 
                        /*
                            The alert will trigger on the first error that it finds. But there can be multiple at the same time:
                            example: client and dentist both already have an appointment scheduled at the day-time-combi (day 3, 13.00 o'clock) and as an assistant or dentist you want to make another appointment on day 3 at 13.00 o'clock as well for the same client and dentist.
                            
                            This will happen: the first alert will pop up on the screen  for the client. Then (supposing that as an assistant or dentist you move the already existing appointment of the client on this day-time-combi to another day-time-combi (e.g. day 4 at 14.00 o'clock)), then the second time this fn addAppoinment is called, an alert will pop up on the screen for the dentist.  

                            Reason: the validations for te client take place before the validations of the dentist (this is arbitrarily the order in the code above. )
                        */
                    }
                } else {   // in the else there is no assistant taking part in the appointment
                    If (checkIfPersonWithDayAndTimeIsUnique(clientId, day, time, personType = client) &&
                        checkIfPersonWithDayAndTimeIsUnique(dentistId, day, time, personType = dentist) 
                    ) {
                        dispatch((addDayTimeClient({cientId}{day}{time}))
                            /* 
                                inside this reducers-object fn:
                                reservedCombinationsOfClientAndDayAndTime.push({cientId}{day}{time})
                            */

                        dispatch((addDayTimeDentist({dentistId}{day}{time}))
                            /*
                                inside redux-toolkit slice: 
                                reservedCombinationsOfDentistAndDayAndTime.push({dentistId}{day}{time})
                            */ 
                        
                        // add the appointment object to to the array with existing appointments
                            let appointmentId = generateRandomAppointmentId();
                            let key = appointmentId;
                            let newAppointmentObject = {appointmentId, clientId, day, time, dentistId, assistantId, isSick=false, isNowUpdatingAppointment = false, key} // bonus: 1 treatmentType
            

                            dispatch((addAppointment(newAppointmentObject))
                            /*
                                inside redux-toolkit slice: appointments.push(newAppointmentObject)
                            */

                    } else {
                        alert(Person {person.lastName} already has an appointment on {day} at {time} o'clock.)
                        return; // now I get out of fn addAppointment, so as an assistant or dentist I can correct the input. 
                        /*
                            The alert will trigger on the first error that it finds. But there can be multiple at the same time:
                            example: client and dentist both already have an appointment scheduled at the day-time-combi (day 3, 13.00 o'clock) and as an assistant or dentist you want to make another appointment on day 3 at 13.00 o'clock as well for the same client and dentist.
                            
                            This will happen: the first alert will pop up on the screen  for the client. Then (supposing that as an assistant or dentist you move the already existing appointment of the client on this day-time-combi to another day-time-combi (e.g. day 4 at 14.00 o'clock)), then the second time this fn addAppoinment is called, an alert will pop up on the screen for the dentist.  

                            Reason: the validations for te client take place before the validations of the dentist (this is arbitrarily the order in the code above. )
                        */
                    }
                }
            }







# USE CASE 3: DELETE APPOINTMENT 
        - delete an appointment: newState = removeAppointment(state, appointmentId)
        --> later in the bonus requirements: replace this fn call (inside the business logic of component Appointments) by a button 'delete (this) appointment' in the Calender (month) View and in the Day View.     
        

    use case: as a an assistant or dentist I delete a dental appointment for a patient in the dentist-app (e.g. the patient is ill, so cannot come).
        The basic idea of the next steps is that the deletion of an appointment will undo/reverse an added appointment in global state. Just like in the situation of adding an appointment, I must distinguish between appointments with and without an assistant. 


    1.  fn deleteAppointment below will first be called as a fn (see winc-requirment: - delete an appointment: newState = 
        removeAppointment(state, appointmentId)  ).
        
        In the bonus requirement: call this fn from a button 'delete appointment' that will be added to each appointment in the 


    2.  result: appointment is deleted from global state.
    3.  Automatic re-render will make the apppointment then disappear from calender (month) view and day view, due to automatic re-render.
    4.  the idea: deleteAppointment does the opposite with state as addAppointment (see use cases 1 and 2)

        

        fn deleteAppointment(appointmentId){
            /* 
                For more info, see chapter 'global state in redux-toolkit'.
            */

            const { appointments } = useSelector((state) => state.appointment);

            // get the appointmentObject with the appointmentId:
            const selectObjectsByArrayObjectKey  = (array, filterFunction) => {
                let filteredArr = array.filter(filterFunction)
                return filteredArr;
            }

            /*
                2do put fn selectObjectsByArrayObjectKey in file utils.js, because I will use it in 
                use  case 11 --> 'use case 1 with treatment types' as well.
            */

            let getAppointment = appointment => appoinment.appointmentId === appointmentId
            let appointmentThatIsAboutToBeDeleted = selectObjectsByArrayObjectKey(appointments, getAppointment)

            // destructure this object appointmentThatIsAboutToBeDeleted:
            {clientId, day, time, dentistId} = appointmentThatIsAboutToBeDeleted


            dispatch((deleteDayTimeClient({clientId}{day}{time})) // {clientId}{day}{time} is the payload.
            /* inside this reducers-object fn:
                let indexOfCombiOfClientAndDayAndTime = state.reservedCombinationsOfClientAndDayAndTime.indexOf({clientId}{day}{time}) // looking for a scalar value here.
                state.reservedCombinationsOfClientAndDayAndTime.splice(indexOfCombiOfClientAndDayAndTime, 1);
                // result: the reserved timeslot as the combi of {clientId}{day}{time} has been deleted, and can now be reused for making another appointment.
            */  


            dispatch((deleteDayTimeDentist({dentistId}{day}{time})) // {dentistId}{day}{time} is the payload.
            /* inside this reducers-object fn:
                let indexOfCombiOfDentistAndDayAndTime = state.reservedCombinationsOfDentistAndDayAndTime.indexOf({dentistId}{day}{time}) // looking for a scalar value here.
                state.reservedCombinationsOfDentistAndDayAndTime.splice(indexOfCombiOfDentistAndDayAndTime, 1);
                // result: the reserved timeslot as the combi of {dentistId}{day}{time} has been deleted, and can now be reused for making another appointment.
            */   


            if (assistantId !=="") {
                {assistantId} = appointmentThatIsAboutToBeDeleted;
                dispatch((deleteDayTimeAssistant({assistantId}{day}{time})) // {assistantId}{day}{time} is the payload.               
                /* inside this reducers-object fn:
                    let indexOfCombiOfAssistantAndDayAndTime = state.reservedCombinationsOfAssistantAndDayAndTime.indexOf({assistantId}{day}{time}) // looking for a scalar value here.
                    state.reservedCombinationsOfAssistantAndDayAndTime.splice(indexOfCombiOfAssistantAndDayAndTime, 1);
                    // result: the reserved timeslot as the combi of {assistantId}{day}{time} has been deleted, and can now be reused for making another appointment.
                */                
            }


            dispatch((deleteAppointment(appointmentId))
            /* 
                // inside this reducers-object fn:
                    const selectObjectsByArrayObjectKey  = (array, filterFunction) => {
                        let filteredArr = array.filter(filterFunction)
                        return filteredArr;
                    }

                    let deleteAppointment = appointment => appoinment.appointmentId !=== appointmentId
                    let state.appoinments = selectObjectsByArrayObjectKey(state.appointments, deleteAppointment)
            */
        }





# USE CASES 4: UPDATE APPOINTMENT 
    winc-requirement: - move an appointment: newState = moveAppointment(state, appointmentId, newDay, newTime) Note: dentists and assistants can't have two appointments simultaneously.   

    use case: as an assistant or dentist I update a dental appointment for a patient in the dentist-app: (e.g. bonus requirement: move appointment to other day-time: e.
        g. "day 19 at 10 o'clock" becomes "day 22 at 11 o'clock").
    1. precondition: fn addAppointment must be ready (and tested), because I want to reuse some  of the code inside this fn updateAppointment.  --> for the source of this 
            fn, see use case:
            USECASE 2OF2: CREATE APPOINTMENT IN THE APPLICATION (AT FIRST WITH A FN CALL, LATER IN THE BONUS REQUIREMENT WITH A FORM) --> step 5.
    2. precondition: fn deleteAppointment must be ready (and tested), because I want to call this fn from within this fn updateAppointment. 

    3. design: The idea in the following steps is to update the appointment by creating a new appointment with the current appointment info, and then to delete the current 
            appointment. 
    4. use case: as an assistant or dentist I make updates (e.g. move the appointment to other day and/or time) or: (e.g. reschedule an appointment to another dentist). 
    5. Extra feature: You can do as many updates at the same time to one appointment as you like, because you start with a clean slate, with the same constrains (business 
            rules) that apply to any new appointment.
    6. Extra feature: you can reschedule an appoinment to another dentist. All the necessary validations will be performed.
    7.  
        phase 1:
        /*
            fn updateAppointment can first be called as a fn (see winc-requirment: - move an appointment: newState = moveAppointment(state, appointmentId, newDayNumber, newTime) 
            Note: dentists and assistants can't have two appointments simultaneously.  ).
                
            Winc-fn-signature: - move an appointment: newState = moveAppointment(state, appointmentId, newDayNumber, newTime)
            To enable any type of appointment update (e.g. reschedule appointment 1234567 from dentist 'foo' to dentist 'bar'), I have broadened the necessary fn-signature to
            updateAppointment(appointmentId, clientId, day, time, dentistId, assistantId = null, ) {}
        */
        
        phase 2:
        In the bonus requirement this fn will be invoked from a button 'update appointment' that will be added to each appointment in the Calendar View and the Day View. The click event will make React Router open the component




    phase 1 (see step 7 above):

        fn updateAppointment(appointmentId, clientId, day, time, dentistId, assistantId = null, isUpdatingAppointment=true ){

            1. 

            2. delete the appoinment ("A", see example below) from global state (i.e. redux-toolkit slice): call fn deleteAppointment(appointmentId)
                /*
                assumption: I assume there is an appointment with this appointmentId in global state that can be deleted.

                status: appointment-to-update has been deleted from global state in redux-toolkit slice, so it cannot mess up the validations as part of saving the updated 
                    appointment to global state. 
                    
                    example of "messing up": if I assign the appointment from dentist 'foo' (A) to dentist 'bar' (B), but leave the day-time-combi as it is inside the state, then the updated appointment (B) will conflict with (A). Reason: the client will now have 2 appointments at the same time, one with dentist 'foo' and one with dentist 'bar'. That is why (A) MUST be deleted, before you can save (B). Otherwise the validations will stop / not allow the update to take place. 
                */

                /*
                    So now you are in a "greenfield" situation: the appoinment-to-update (A) is gone from the global state in Redux-toolkit slice, but its data are still in the local state above. So now you can do the update by making one or multiple adjustments in the fn call in the next step, to the current data in the update form.  
                
                    from here onwards the workflow is exactly the same as that of adding an appointment that is NOT part of this update-appointment-workflow. 

                    so the updated appointment ("B" in example above ) will go through the regular validations that are part of adding a new appointment (e.g. 1 dentist cannot have 2 appointments scheduled at the same day-time-combination). --> call fn addAppointment, or reuse code from  fn addAppointment to implement this (because this fn contains all the required validations). 
                */

            3. call with data from local state above:  addAppointment (day, time, patientId, dentistId, assistantId=null, isUpdatingAppointment=false) 
                // appointmentId is added inside fn addAppointment. 
                // bonus requirement: add treatmentType (implement if time left)

            4. fn addAppointment validates if the fn argumemnts comply with the business rules. 

            5. modify the data (e.g. day, time, dentist) until you have an updated appointment that meets/passes the validations.
        
        }




    phase 2 (see step 7 above):

        The steps to update an appointment: 

            1. click button 'update' that is part of each appointment in DayView and Calendar View. This will:
                a) set the boolean isNowUpdatingThisAppointment to true of this appointment (object). The default value is 'false'. So now there is 1 (and only 1) appointment with this boolean set to true.
                b) React Router will open the component UpdateAppointment.js on its own webpage. 

            2.  put appointment object from the event object into local state of this component UpdateAppointment.js. Use 
                    const [appointmentId, setAppointmentId] = useState(appointmentId);
                    const [clientId, setClientId] = useState(clientId);
                    const [day, setDay] = useState(day);
                    const [time, setTime] = useState(time);
                    const [dentistId, setDentistId] = useState(dentistId);
                    const [assistantId, setAssistantId] = useState(assistantId);
                    const [isUpdatingAppointment, setIsUpdatingAppointment] = useState(isUpdatingAppointment);

                    --> as a result the data of the appoinment-to-update will appear automatically in the update form. 


                only if you cannot use the event object in step 2, then (as an alternative):
                    a) load array with appointments from redux-toolkit slice. 

                        const { appointments } = useSelector((state) => state.appointment);

                    b) filter the appointment (the one you just clicked on in the Calendar View or Day View in step 1 above) with isNowUpdatingThisAppointment set to true. 

                        // get the appointmentObject with the appointmentId:
                        const selectObjectsByArrayObjectKey  = (array, filterFunction) => {
                            let filteredArr = array.filter(filterFunction)
                            return filteredArr;
                        }

                        let getAppointment = appointment => appoinment.isUpdatingAppointment === true
                        let appointmentThatIsAboutToBeUpdated = selectObjectsByArrayObjectKey(appointments, getAppointment)


                    c) put (immutable copy!) the data of this appoinment into the local state of the update-form. --> as a result the data of the appoinment-to-update will 
                        appear automatically in the update form. 

                    /* 
                        I can probably get access to the appointment-to-update via the event object. If so, then I do not need property 'isUpdatingAppointment' in each appointment object, nor do I need previous steps 2, 3 and 4 above. I can refactor that later. 
                    */




            3. save local state to redux-toolkit slice, so it can be used if you click on button 'cancel update' (see use case cancelUpdateAppointment below)
                    dispatch(saveAppointmentToUseForCancelUpdateOfAppointment({appointmentId, clientId, day, time, dentistId, assistantId, isUpdatingAppointment=false }))

                    // to get the data from the store (not needed in this step)
                    const appointmentHowItLookedBeforeItWasBeingUpdated = useSelector((state) => state.cancelUpdateAppointmnent.appointmentToUseForCancelUpdateOfAppointment)


            4. make the desired updates to the appointment: e.g. 
                a) move appoinment to another day and/or time
                b) reschedule appointment to another dentist
                c) do multiple updates at the same time.
            
            5. click button 'save update'

            6. fn updateAppointment will be invoked, with the updated data in the form that resides in the local state of the form. (see phase 1 above for the fn 
                updateAppointment)      

            7. dispatch(saveAppointmentToUseForCancelUpdateOfAppointment({null, clientId, day, time, dentistId, assistantId, isUpdatingAppointment=false })) 
                /*
                    if appointmentId !== null {
                        // cancel of update of appointment may take place. 
                    }
                */   

            8.   React Router will bring you automatically back to the Calendar View.

            9.   In the Calendar View and Day View the updated appointment is shown, as well as all the other appointments. 
            10.   end of update-appointment-workflow.

                (backlog idea: undo the update of the appointment).


            Component UpdateAppointment contains a button 'cancel update'. Up to (not inclusive) step 7 in the  flow above, you can click button 'cancel update' at any time (extra feature). If you click 'cancel update', then updates to the appointment will not be saved, but instead:

                    action 1: fn call addAppointment(appointmentIdCancelScenario, clientIdCancelScenario, dayCancelScenario, timeCancelScenario, dentistIdCancelScenario, assistantIdCancelScenario, isUpdatingAppointmentCancelScenario) .  So you do this with the local state from component UpdateAppointment.js . 
                    
                        This fn call can have can have one of two effects: 
                        Either before you reach step 8 below, it will overwrite the still existing appointment in global state with the same data (so nothing changes). 
                        Or when you reach step 8 below and the fn updateAppointment has deleted the current appointment from global state, then button 'cancel appointment' will undo the deletion of that appointment.

                    action 2:React Router will bring you back to the Calendar View. 

                    action 1 and action 2 will be the body of fn cancelUpdate()
                    fn cancelUpdate() will be a nested fn inside component UpdateComponent, so it can access the required local state of component UpdateComponent. 

# USE CASES 5: ADD DENTIST
    winc-requirement: add a dentist: newState = addDentist(state, "Toos", "Trekker", "06-12345678", "toos@tandartspraktijkbvt.nl")

    1. component Dentist.js: dentists are added in child component AddDentist.js of component Dentist.js 
    2. result: dentist is shown in component DisplayDentist, being a child  of component Dentist.js. 

    see chapter Objects for ex of dentist object.

# USE CASES 6: ADD CLIENT
    winc-requirement: add a client: newState = addPatient(state, "Piet", "Auw", "06-12345679", "piet@wincacademy.nl", 1985)


    1. component Client.js: clients are added in child component AddClient.js of component Client.js   
    2. result: client is shown in component DisplayClient, being a child of component Client.js. 

    see chapter Objects for ex of client object.        
        --> see https://www.javascripttutorial.net/javascript-dom/javascript-add-remove-options/ . 



# USE CASE 7: CANCEL APPOINTMENTS BECAUSE CLIENT IS ILL

    - a client is sick, so delete his appointments: newState = makePatientSick(state, patientId)

    UI: as a dentist or assistant on a client page, I select a clientId inside a selectbox. Then
    I click a button 'cancel all appointments'. The event that is  triggered, contains a clientId.
    The UI part will be implemented as part of the bonus requirement. Until then I use this useEffect hook to call the fn
    that deletes all appointments of this clientId. 

    Client page will get its own Route and Link in React Router. 

       
    
    alternative UI: a button (or stateful checkbox) in the component Client.js . If you click this button (or check the checkbox), then all appointments (0, 1 or more) in the upcoming month will be deleted for this patient. 
    
    alternative work flow:
    1. Component Dlient.js has subcomponent ShowClients.js 
    2. ShowClient.js contains overview with all clients.
    3. On each client row you can select checkbox 'client is ill'
    4. If you check this checkbox, then:
        - client object property key 'isSick' is set to 'true
        - client is added to array sickClients
        - filter appointments with sick clients out of array with appointments. So a permanent deletion of all the appointments of this client from state (in redux-toolkit slice) is taking place. After that the "usual" render process takes place, but without the just-deleted appointments. So no conditional-rendering here.
    5. use case 2 (see chapter use case 2): validate that it is not possible to make appointment for sick client, as 
        long as on the Client page the checkbox indicates that the client is ill.
    


# USE CASE 8: GIVE APPOINTMENTS OF SICK DENTIST A RED BACKGROUND COLOR
    winc-requirement: "a dentist becomes sick. Give each of his or her appointments a red background colour". --> do this in the Day View and in the Calendar (month) View: 
    newState = makeDentistSick(state, dentistId)" 
    winc-requirement: "dentists (and assistants) can become sick. They won't be able to work that day."
    --> Appointments are scheduled for next month. Possible that a dentist will still be ill (part of) the next month. So if a dentist gets ill (right now) then automatically a red_background_color around will be added to all of his/her appointments. This mechanism serves as an early warning to the planner of the dentist appointments. 
    --> scope: all working days of the upcoming month.
    --> where to implement: in component Dentist.js --> subcomponent DisplayDentist.js check checkbox 'dentist is ill'. As a result of this all of his appointments (0, 1 or more) will get a red background color. 


    UI work flow:
    1. Component Dentist.js has subcomponent ShowDentists.js 
    2. ShowDentist.js contains overview with all dentists.
    3. On each dentist row you can select checkbox 'dentist is ill'
    4. If you check this checkbox, then:
        - dentist object property key 'isSickDentist' is set to 'true
        - conditionally render appointments with dentists with "isSick=true" to the screen with RED background color.

        The dentist object and the appointment object will both be saved in their own redux-toolkit slice, because they are separate entities with their own purpose.

        rule: not allowed to save the same state in 2 different places.
        rule: not allowed to modify properties inside the props-object.
        So to render all the data I need to the screen, I must assemble the props-object with 2 different pieces of state as input: (I am not changing the properties inside the props-object, but just initializing the props-object with a selection of unmodified properties that I need):  
        a) the appointment object
        b) the property of the dentist-object that tells me if the dentist is ill or not.

        So I need a props-object that contains both pieces of state:
        1. create a props-object, appointmentToRender, for each appointment (=== state!) in the appointments array. 
        2. for each appointment check (i.e. filter) if the dentist is ill  or not. Add the result in format:  isSickDentist: false , or: isSickDentist: true  (these are the only 2 flavors) to the props-object 'appointmentToRender.
        3. Add 'appointmentToRender' to array 'appointmentsWithSickAndHealthyDentists.
        4. Repeat step 2 and 3 for all appointments.
        5. now conditionally render the array appointmentsWithSickAndHealthyDentists:  "if isSick, then show red background", else do nothing.  (use nullish coalescing operator.).


    5. 'scenario: (see chapter use case 2): validate that when you make appointment for sick dentist, then the appointment shows up on Calendar View and Day View, but with red background color. 

# USE CASE 9: GIVE APPOINTMENTS OF SICK ASSISTANT AN ORANGE BACKGROUND COLOR
    winc-requirement: "(dentists and) assistants can become sick. They won't be able to work that day."
    There are no requirements about what needs to happen when an assistant becomes sick.
    Suggestion (if time left): "if an assistant becomes sick. Give each of his or her appointments an orange background colour".
    The rest of the code is the same as when a dentist becomes sick (see give_appointments_of_sick_dentist_a_red_background_color )
    corner case: if dentist and assistant are sick, then show orange (inner) and red (outer) background color.

    prerequisite: use case 8 above is ready. 

    work flow:
    1. Component Assistant.js has subcomponent ShowAssistants.js 
    2. ShowAssistant.js contains overview with all assistants.
    3. On each assistant row you can select checkbox 'assistant is ill'
    4. If you check this checkbox, then:
        - assistant object property key 'isSickAssistant' is set to 'true
        - conditionally render appointment objects with a sick assistant to the screen with ORANGE background color.

        The assistant object and the appointment object will both be saved in their own redux-toolkit slice, because they are separate entities with their own purpose.

        rule: not allowed to save the same state in 2 different places.
        rule: not allowed to modify properties inside the props-object.
        So to render all the data I need to the screen, I must initialize the props-object with 2 different pieces of state as input:  (I am not changing the properties inside the props-object, but just initializing the props-object with a selection of unmodified properties that I need):  
        a) the appointment object
        b) the property of the assistant-object that tells me if the assistant is ill or not.

        So I need a props-object that contains both pieces of state:
        1. get the existing props-object (created in use case 8), appointmentToRender, for each appointment (=== state!) in the appointments array. 
        2. for each appointment check (i.e. filter) if the assistant is ill  or not. Add the result in format:  isSickAssistant: false , or: isSickAssistant: true  (these are the only 2 flavors) to the props-object 'appointmentToRender.
        3. Add 'appointmentToRender' to array 'appointmentsWithSickAndHealthyDentistsAndAssistants.
        4. Repeat step 2 and 3 for all appointments.
        5. now conditionally render the array appointmentsWithSickAndHealthyDentistsAndAssistants:  "if isSickAssistant, then show orange background", else do nothing.  (use nullish coalescing operator.).

    5. 'use case 2: (see chapter use case 2): validate that when you make appointment for sick assistant, then the appointment shows up on Calendar View and Day View, but with orange background color. 

    corner case: if both the dentist and assistant are sick, then red-and-orange-striped background is shown, or a fancy combi of orange and red.

    prerequisite: use case 8 and all steps of use case 9  up until here have been implemented.
    Now add the following line of code:

    if (isSickDentist && isSickAssistant) {
        // conditionally render an orange-red-striped background. 
    }

# USE CASE 10: ADD ASSISTANT 
    same as adding a dentist, except that an assistant is added without a set of skills. 
    So reuse code from  'use case 5: add dentist'.

    1. component Assistant.js: assistants are added in child component AddAssistant.js of component Assistant.js 
    2. result: assistant is shown in component DisplayAssistant, being a child of component Dentist.js. 

    see chapter Objects for ex of assistant object.

# USE CASE 11: GIVE EACH DENTIST A NUMBER OF TREATMENT TYPES: 
        Bonus
        Treatment types:
        a) each dentist has a set of skills. E.g. pulling teeth, dental fillings, surgery, etc.
        b) not every dentist has each skill.
        c) each appointment has one treatment type.
        d) in the calendar, view you cannot see the treatment type.
        e) in the day view, you can see the treatment type.


        Precondition before starting with TREATMENT TYPES: the following 4 usecases (see chapters with same names above) must be ready, before implementing treatment types. Reason:  TREATMENT TYPES will be implemented inside both use cases.
            USE CASE 0: create component InitialSetupForMakingAppointments, using data from Mockaroo
            USE CASE 1: CREATE A RANDOM DENTIST APPOINTMENT, TO LOAD WHEN APPLICATION STARTS. (read this chapter for more
                info about TREATMENT TYPE) arbitrary choice: I will give each of the 4 dentists (that must be in the system when the application starts) randomnly 50% of all skills.
                1 skill = the abililty to do 1 treatment of a certain type (e.g. dentalImplant). 
            USECASE 2: CREATE APPOINTMENT IN THE APPLICATION (AT FIRST WITH A FN CALL, LATER IN THE BONUS REQUIREMENT 
                WITH A FORM) 
            USE CASES 4: UPDATE APPOINTMENT 
        
            Generic step for all use cases below: create array with dental treatments:
            1. create file treatments.js in directory 'dataInDentistAppWhenDentistAppStarts'.
            2. inside this file add array:


                const dentalTreatments = [
                    "brace",
                    "bridge",
                    "crown", 
                    "dental_veneer",
                    "denture_false_teeth",
                    "scale_and_polish",
                    "filling",
                    "wisdom_tooth_removal",
                    "dental_implant",
                    "broken_or_knocked_out_tooth",
                    "teeth_whitening",
                    "root_canal_treatment"
                ]


            USE CASE 0 with treatment types:
                1. Each dentist is able to do 75% (arbitrary) of all treatment types (skills). Create fn getRandomTreatmentTypes for this. 
                2. save the skills of (i.e. add array with treatment types to) the 4 dentists that must be in the system when the application  starts, e.g.:

                    example dentist object:
                        dentistObject = {
                            dentistId= Ayad-083596,
                            firstName= "James",
                            lastName= Ayad,
                            phone="0612345678",
                            email="James.Ayad@dentistcompanybvt.com",
                            treatmentTypes= ["periodontalDisease", "filling", "brace", "crown", "dentalVeneer"], 
                            isSick: false 
                        }
    

            'USE CASE 1 with treatment types': add random treatmentType to each of the 150 appointments.
                prerequisite: 'use case 0 with treatment types' is ready.
                1. select random dentist (that means randomly select 1 of the 4 dentists)
                2. for the randomly selected dentist, now randomly select 1 of his/her treatmentTypes (e.g. brace, see dentist object above)
                3. add this treatment type to the appointment.
                4. done.  


                // how not to do it: first generate a random treatment and then select a qualified dentist would be more work: 
                1. create fn getRandomTreatment()
                2. Inside fn generateRandomAppointment: 
                    let randomTreatment = getRandomTreatment() --> 
                3. select a dentist until (loop) until you find one  that is able to perform the treatment
                4. an extra check is needed:
                   isDentistAbleToDoTreatment(treatmentType, dentistId))
                5. integrate this validation with the other validations from use case 1. 
                6. the  fn   isDentistAbleToDoTreatment(treatmentType, dentistId)) will look like this:

                     isDentistAbleToDoTreatment(treatmentType, dentistId)) {

                        //start
                        const { dentists } = useSelector((state) => state.dentist);


                        // get the dentistObject with the dentistId:
                        const selectObjectsByArrayObjectKey  = (array, filterFunction) => {
                        let filteredArr = array.filter(filterFunction)
                        return filteredArr;
                        }

                        /*
                            2do put fn selectObjectsByArrayObjectKey in file utils.js, because I use it in 
                            use  case 3 'delete appointment' as well.
                        */

                        let getDentist = dentist => dentist.dentistId === dentistId
                        let dentist = selectObjectsByArrayObjectKey(dentists, getDentist)

                        // end

                        // destructure this object appointmentThatIsAboutToBeDeleted:
                        {treatmentTypes} = appointment


                        return (treatmentTypes.includes((treatmentType) ? false : true )
                     }



            USE CASE 2 with treatment types: make an appointment: 
                1. In component AddAppointment.js 
                2. add a selectbox with all skills of all dentists.
                3. select a dentist
                4. select one treatmentType (winc-requirement: 1 treatmentType per appointment).
                5. add a validation to fn createAppointment to check if the selected dentist masters the required skill 
                    (skill = treatmentType) 


            USE CASE 4 with treatment types: update an appointment
                1. select an appointment in Day View or Month View, by clicking on button 'update appointment'.
                2. in (reused) component AddAppointment.js: repeat steps 3, 4 , 5.
                2. scenario1: select another dentist with the same skill (happy flow)
                3. scenario2: select another dentist not with the skill (error flow)
                5. integrate this validation with the other validations from use case 4. 


            USE CASE 6: add a dentist, with treatment types (skills):
                1. load array dentalTreatments into either a (multi-option)selectbox or a (multi-option) combobox in component Dentist.js
                2. In component Dentist.js add a dentist with a bunch of skills in either a (multi-option) selectbox, or a combobox.
                3. no validations are needed.
                3. Save the skills into an array of the dentistObject, e.g.:

                    example dentist object: see 'use case 0 with treatment types' above.




        Use cases to add a dentist with a bunch of skills to a new or existing appointment:
        1. when application starts, there must be 4 dentists in the application:
            On www.mockaroo.com (see schema dentist), for each dentist add FieldName 'skills'  with as its value an array with skills, e.g. [brace, fillings, crowns, rootCanal, poolTooth, teethCleaning, teethWithening, veneer] --> implement winc-requirement 'not every dentist has each skill' with fn Math.random(). 2 options here: do this on the site of Mockaroo, or download the json and then implement this requirement in vscode. I choose to do this in vscode, because I need to create the functionality to do this anyway for point 2. below.   (on the other hand I could do this on Mockaroo.com. Otherwise I would just be downloading a 'semi-finished product' from Mockaroo, instead of the precise mock data that I need).

        2. after the application has started, I add a new dentist: (adding a dentist is  a winc-requirement by itself)
            I add the skillset of a dentist as an array with skills. At first I will add a dentist including his/her skills, with a fn. Later, when the bonus requirement 'make forms and buttons for all operations' is ready, I will do this with a (multi) selectbox as part of a form  in the component AddAppointment.
            --> implement winc-requirement 'not every dentist has each skill' with fn Math.random(). 


            It is not a winc-requirement to update nor remove current skills of a dentist. In Holland valid skills of each dentist are registered in the so-called 'BIG'-register. If a dentist looses a skill (because (s)he has messed up her/his refesher training ), then appointments would need to be rescheduled to another dentist (who does still have the valid skill). But again, this is not a winc-requirement. 


        3. (not a winc requirement, if time left, then I will implement this) 
            user story: 'as an assistant or dentist I reschedule an appointment to another dentist', from dentist 'foo' to dentist 'bar', with TREATMENT TYPES. 

    
            Use case steps (of all for all of these 3 use cases) to add/update an appointment with 1 treatmentType with 1 dentist with a skill that matches exactly that treatmentType: 

            The component addAppointment has the following fields (see June 27th):

                appointmentObject = {
                    appointmentId: 056946,
                    clienttId: Ayad_083596,
                    day: 20,
                    time: 10,
                    treatmentType: "parodontology", --> implement later as bonus assignment.
                    dentistId: Darwish_953462,
                    assistantId: Bakir_03949463,
                    isSick: false,   
                    isNowUpdatingThisAppointment: false, --> while appointment is updated (see use case 'update an appointment' below), the boolean is set to true. 
                }

            
            1. select treatmentType (T)
            2. select all dentists with this skill (skill === treatmentType) (U)
                - filter array with dentist-objects on the skill that is required for a particular appointment. 
            
            Steps 1 and 2 will be abstracted out into a separate fn retrieveAllDentistsWithRequiredSkillForAppointment. This fn has the parameter 'skill' and the fn signature looks like this: 
                retrieveAllDentistsWithRequiredSkillForAppointment(skill)
                ex: retrieveAllDentistsWithRequiredSkillForAppointment('brace')

            3. 
            IF the application has not yet started AND you are adding appointments that will be shown when the application starts, THEN:
            (in a loop)
            3a. automatically select the first dentist 'foo' from (U)
            3b. check  if dentist on that day-time already has appointmment (this functionality will be working before I start with bonus assignment 'treatment types', so should be plug-and-play).
            3c. if yes, continue with 3a and select the next dentist (e.g. 'bar') in the list
            3d if no, you have now selected a dentist with the required skill and who is available in that particular timeslot day-time-combi.


            4.
            ELSEIF the application has already started AND you are selecting a dentist to make an appointment, THEN:
            (in a loop)
            4a. manually select a dentist from (U): at first as part of a fn call, then later (when the bonus form and buttons for all operations are ready) from a selectbox in a form. .
                This means I need to populate a selectbox with only (U)
            4b. check  if dentist on that day-time already has appointmment (this functionality will be working before I start with bonus assignment 'treatment types', so should be plug-and-play).
            4c. if yes, continue with 3a and select the next dentist (e.g. 'bar') in the list
            4d if no, you have now selected a dentist with the required skill and who is available in that particular timeslot day-time-combi.







# USE CASE 12: AS A DENTIST OR ASSISTANT I CAN PERFORM OPERATIONS WITH FORMS AND BUTTONS

    add client (form)
    add dentist (form)
    add assistant (form) (if time left, not a winc-requirement)
    add appointment (form)
    add button to delete appointment (to each appointment in the calendar (month) View and day View).
    add button to update (to be more precise: 'move an') appointment (to each appointment in the calendar (month) View and day View).

    This means that the following must be implemented as well: 
    If you add a client, then this client must appear in the add-appointment-form in the selectbox to select a client.
    If you add a dentist, then this dentist must appear in the add-appointment-form in the selectbox to select a dentist.
    If you add a client, then this client must appear in the add-appointment-form in the selectbox to select an assistant.

    Implement with useEffect hook that contains the local state with select-box-options. The use effect hook has the array with all clients as a dependency. The selectbox options are then loaded into the selectbox. 





------------------- END ------------------------------------------














This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

----------------------------------------------------------------------------------------

