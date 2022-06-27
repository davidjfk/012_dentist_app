# Design and plan to implement dentist app:

# June 27th
Time to make design below (today and June 26th combined): 2 hours
Time left to implement: 11.5 hours (challenge: trying to complete assignment in 16 hours)

* create branch 'create_mock-data' (see June 26th) and checkout this branch.
  scope of work on this branch: 
  a) create mock data for dentists, assistants and clients and load this data into the global state when the application starts (useEffect hook).
  b) use this data to show 4 dentists, 2 assistants, 50 clients and 150 appointments in the Calendar(month) View and Day View: 
  out-of-scope: use this data to make a dentist appointment. 

    winc-requirement: when you start your React app, the following entities have to be in your system:
    4 dentists
    2 assistants
    50 clients
    150 appointments
    Use one JaveScript object with all data as the state of the app.
    
    analysis: downloading data from https://www.mockaroo.com/ is one-way traffic from mockaroo server into my app state (probably redux-toolkit slice).
    I need mock data for 3 components: (see June 25th for the component structure)
    1. Dentist.js  (e.g. add a dentist)
    2. Assistant.js
    3. Client.js 
    
    Mockaroo is not used to create the following data:
    4. types of treatments ---> this will be an array 'treatmentTypes' of about 12 treatment types that will be added to utils.js, and as a select-box-options in component AddAppointment.js (see June 25th below). 
    5. a calendar with 4 weeks (28 days) with 20 working days (ma-fr) on which appointments can be scheduled between 09.00-17.00 o'clock. 
        --> I can re-use in utils.js fns getRandomDay and getRandomTime.
        --> In the form AddAppointment.js (bonus requirement, so implement at the end) I will do input validation on day and time of the day, so only correct day-time combinations can be selected. 

    The data from these 3 components (nrs 1-3) (i.e. the output / returned data (e.g. an added dentist)) will be downloaded in format json and stored each in a separate data file inside the dentist app in folder 'dataInDentistAppWhenDentistAppStarts'. 

    current situation: inside utils.js fn getRandomName( ) is used on the same dataset to randomnly generate a patient, dentist or assistant.
    expected/desired situation: fn getRandomName( ) will select:
    a) as a patient: from mockaroo json data with mock patients 'patients.js' .
    b) as a dentist: from mockaroo json data with mock dentists 'dentists.js' .
    c) as an assistant: from mockaroo json data with mock assistants 'assistants.js' .
    So the current array 'names' in util.js will be deleted and replaced by imports to the files patients.js, dentists.js and assistants.js .

    
    A useEffect hook will be used (in "componentDidMount mode") to load the data from Mockaroo (nrs 1-3) into the app-state-object. 
    The types of treatments are added "statically" into a selectbox, of which the options (1 for each appointment) can be selected as part of the use case to make an appointment. From there on 'type of treatment' becomes part of state too.
    Update of June 25th: component Treatment.js serves no purpose. So won't be created.

    Also as part  of the use case to make a dentist appointment: the day (1 of 20 working days) and time of the day (between 09.00-17.00) are both typed into their own input box (seems more user friendly than using a very long selectbox with all day-time combinations). From there on the day-time-combination becomes part of state too.
    Update of June 25th: component Calendar.js serves no purpose. So won't be created.
    
    
    So an appointment-object in global state (see June 25th) will look like this:
        Appointment_056946 = {
            time={time}
            patient={patient}
            treatmentType={treatmentType}  --> implement later as bonus assignment.
            dentist={dentist}
            assistant={assistant}
            key={index}
        }
        
        In Day.js the entire appointment object will be used to display an appointment in the Day-View.
        In AppointmentInMonth  the following properties of the appointment object will be used to display an appointment in the Month-View:
        Appointment_056946 = {
            time={time}
            patient={patient}
            key={index}  --> is used in Calendar.js for the mapping. 
        }


        example appointment object:
            Appointment_056946 = {
                time= "2010",
                patient= Darwish_953462,
                treatmentType= "parodontology", --> implement later as bonus assignment.
                dentist= Ayad_083596,
                assistant= Bakir_03949463,
                key={index}    
                isUpdateAppointment: false, --> while appointment is updated (see use case 'update an appointment' below), the boolean is set to true. 
            }
    
    Add this data (nrs 1-3) each separately to (winc requirement:) 'one JavaScript object with all data as the state of the app'. For each data (nrs 1-3) use a different redux-toolkit-slice 'Action.Type'. Put the data (nrs 1-3) into the global state inside the useEffect hook. Put this useEffect hook inside component Appointment.js . 
 
    use case: create dentist appointment:
    - step 01: 
        component AddAppointment.js will grab data from the the global state object (e.g. a client, dentist, assistant) to make an appointment. The day-time and treatment type will be selected manually.

        Winc requirement: at first component AddAppointment.js will just be a smart component with business logic. This business logic is the fn definition with code that executes when it is called by the following 2 fns calls:
            - add an appointment without an assistant: newState = addAppointment(state, dayNumber, time, patientId, dentistId) Note: an appointment on a day + time can only be added when the choosen dentist and/or assistant is available.

            - add an appointment with an assistant: newState = addAppointment(state, dayNumber, time, patientId, dentistId, assistentId)
        
        These 2 fn calls are put inside this component Appointment.js right below its business logic, but above the return statement, and emulate / simulate a form in which you add an appointment: one without and one with an assistent. 
        Later on, during the bonus requirement, the code to add an appointment,i.e. a form with controlled elements, will be added: either in the return statement of Appointment.js, or in a separate dumb component. When this is done, component AddAppointment will be the home-page ('/') in the nav routing.  The current home page will then be renamed to 'About.js'. 

        Naming:
        Components Patient.js, Dentist.js and Assistant.js are subdivided in e.g. AddPatient.js and DisplayPatient.js. But "Appointment.js" has the calendar(month) and day view to display the appointments. So I call "Appointment.js" instead "AddAppointment.js", because that is what the component does. 
        

    - step 02: Then validations will be performed:
        1. Is dentist available timewise? --> if not, show alert 'dentist already appointment scheduled at this day and time.
        2. does selected  dentist have the required skill?  --> later in bonus requirement.
        3. Is assistant availabe timewise?  --> if not, show alert 'dentist already appointment scheduled at this day and time.

        validation: how to check if dentist and assistant are available?
        1. First select day-time and (later on as part of bonus assignment) treatment type. 
        2. Then select a dentist and assistant.
        3. click save appointment (or: selectbox is a controlled form element, so I can perhaps better validate before clicking on the 'save appointment button'. Would be more user friendly)
        4. filter (state) array with all dentist appointments on time and dentist (e.g. if (time==="2010" && dentist="Ayad_083596") {alert("this dentist {dentist} already has an appointment on this day and time")})
        5. filter (state) array with all dentist appointments on time and dentist (e.g. if (time==="2010" && assistant= "Bakir_03949463") {alert("this assistant {assistant} already has an appointment on this day and time")})
        6. by performing a separate validation for availability of dentist and assistant, it is easier to display to fill the correct alert-message, also because assistant is an optional value when creating a dentist appointment.

    - step 03: 
        If dentist and assistant are availabe, then (after click on button 'add appointment') the appointment will be added to the global state object, and from there rendered to the Calendar (month) View and the Day View. 

        time, dentist and assistant together would serve as an alternative primary key, if dentist-appointments were stored in a relational db. 


    Design phase / thinking upfront / proof of concept is ready. Time to write code. 


# June 26th
update: use case 2 and 3 (see June 25th): instead put button to delete or update in components 'AppointmentInMonth' and 'AppointmentInDay'. Is more user-friendly and easier to implement. 

update (see June 25th): skip component DisplayAppointments, because it is redundant.

Branches:
1. create_mock_data  --> see https://www.mockaroo.com/ 
    When you start your React app, the following entities have to be in your system:
    4 dentists
    2 assistants
    50 clients
    150 appointments
    Use one JaveScript object with all data as the state of the app.
2. add_dentist_and_client: 
    - add a dentist: newState = addDentist(state, "Toos", "Trekker", "06-12345678", "toos@tandartspraktijkbvt.nl")

    - add a client: newState = addPatient(state, "Piet", "Auw", "06-12345679", "piet@wincacademy.nl", 1985)
3. display_in_appointments_that_dentist_is_ill 
    - a dentist becomes sick. Give each of his or her appointments a red background colour in the views: newState = makeDentistSick(state, dentistId)

4. add_appointment_without_assistant
    - add an appointment without an assistant: newState = addAppointment(state, dayNumber, time, patientId, dentistId) Note: an appointment on a day + time can only be added when the choosen dentist and/or assistant is available.

5. add_appointment_with_assistant
    - add an appointment with an assistant: newState = addAppointment(state, dayNumber, time, patientId, dentistId, assistentId)

6. delete_appointment
    - delete an appointment: newState = removeAppointment(state, appointmentId)

7. cancel_appointments_because_client_is_ill
    - a client is sick, delete his appointments: newState = makePatientSick(state, patientId)

8. move_appointment
    - move an appointment: newState = moveAppointment(state, appointmentId, newDayNumber, newTime) Note: dentists and assistants can't have two appointments simultaneously.

9.  bonus-treatment-types: 
        each dentist has a set of skills. E.g. pulling teeth, dental fillings, surgery, etc.
        not every dentist has each skill.
        each appointment has one treatment type.
        in the calendar, view you cannot see the treatment type.
        in the day view, you can see the treatment type.
10.  bonus-working-form-and-buttons-for-all-operations



# June 25th

Time to make design below: 2.5 hours 
Time left to implement: 13.5 hours (challenge: trying to complete assignment in 16 hours)
After pushing this design and plan to github repo on the main branch, I will work on feature branche(s).

* Requirements intake:
Assumptions about the requirements:
1. Each dental treatment requires the presence of 1 dentist.
2. dentist decides if (s)he needs an assistant. 
3. Each type of dental treatment can be with or without an assistant. 
4. the nr of dental treatment rooms is infinite. 
5. an assistent assists a dentist, but does not perform dental treatments on its own (in real life assistent would do e.g. oral hygiene treatment, remove tartar etc.  )
6. there are no checks if workload is spread evenly among dentists and assistants...welcome to the dental treatment sweatshop. 


* Component structure: 6 components (or 7): 
1) DentalPractice.js (parent component with app state, unless I use Redux-toolkit...and I will)
2) Patient.js (child component)
3) Treatment.js (child component) --> not a requirement, so probably quicker to load this data as an object into global state in a componentDidMount scenario, or to just hard-code the treatment options into a selectbox:
    - bridge.js 
    - crown 
    - filling
    - root_canal_treatment
    - scale and polish
    - brace
    - wisdom tooth removal
    - dental implant
    - denture_false_teeth
    - broken or knocked out tooth
    - teeth whitening
    - dental veneer

   
4) Dentist.js (child component)
5) Assistant.js (child component) --> not a requirement to CRUD an assistent.
6) Calendar.js (child component)
7) Appointment.js (child component)

* Routing: the following components get their own routing:
1. Appointment.js --> this is  the most important page that will be used most often, so its NavLink will be to the left of the screen.
2. Calendar view.js --> this is also important page.
3. Day view.js --> also important page 
4. Patient.js --> more patients get added than dentists or assistants,  so I add Patient.js first
5. Dentist.js 
6. Assistant.js --> skip, not a requirement (unless  I have time left)


* State management: 
Each child component creates its own state and saves it to Redux-toolkit-slice: 
1. patients are added in component Patient.js in child component AddPatient.js  
    a) result: patient is shown in component DisplayPatient (2do: create this  component). component DisplayPatient is child component of component Patient.js. 
    b) patient_id (e.g. Darwish_953462) is added to Appointment.js in the selectbox to select a patient. --> see https://www.javascripttutorial.net/javascript-dom/javascript-add-remove-options/ . 
2. dentists are added in component Dentist.js in child component AddDentist.js
    a) result: dentist is shown in component DisplayDentist (2do: create this  component). component DisplayDentist is child component of component Dentist.js. 
    b) Dentist_id (e.g. Darwish_953462) is added to Appointment.js in selectbox to select patient.

3. component Appointment creates appointment(s) in child component AddAppointment.js. --> so while creating an appointment you cannot create e.g. a patient, nor assistant, nor dentist. You must do that before in their own component. 
    a) result: appointment is shown in component DisplayAppointment (2do: create this  component). component DisplayAppointment is child component of component Appointment.js. 
    b) Appointment (identified by appointment_id, e.g. Appointment_056946, is added to Calender (month) view and Day view.


* naming conventions:
Each patient, dentist, assistent and appointment (as data state that are created in the just mentioned components with the same name) will have their own id consisting of 3 parts: surname + undercore + unique nr of 6 digits (randomn or ascending nr from a closure) e.g. Darwish_953462.  I need this format to be sure that I select e.g. the correct patient  to make an appointment (e.g. 2 patients can have the name Bakir). First the name and then the unique nr makes it possible to sort the select-box-options before I insert the options into the selectbox. 

Component calendar must handle 28 days of a next month: 20 working days and 8 weekend days. On working days dentists and/or assistants work from 09.00-17.00  (no lunch break, sorry :) ). Use form validation to check that correct day and time are selected to make an appointment. 
Each appointment lasts an hour.
A day-time has the following format: "2010" === day 20 with appointment starting at 10 o'clock (until 11) //   "0816" === day 8 with appointment starting at 16.00 o'clock (until 17).

The "2010" or "0816" will be a an object reference as part of the big state object (be it in Redux-toolkit, useContext or global state in the app. I choose Redux-toolkit).
e.g. "2010 = {id: Dentist083596_Ayad, id: Assistant03949463_Bakir, etc.}



* Use cases:
The proof of the pudding will be "to eat" component 'appointment', because here the other components (and their state) meet and greet:

use case 1of3: a an assistant I enter a dental appointment for a patient into the dentist-app: 
1. choose patient (from selectbox)
2. select 1 treatment (from selectbox) --> must be step 2, otherwise I cannot check if dentist has the skill to perform this treatment (is bonus requirement)
3. choose day-time (e.g. "2010") from select box. --> must be step 3, otherwise I cannot check availability of dentist nor assistant in the next steps
4. choose dentists (from selectbox)  --> business logic: in the controlled component do an immediate check if timeslot is available.  Alternative: check availability when clicking the 'add appointment' button in a step below (which would be less user friendly).
5. choose assistant (from selectbox) --> idem
6. if everyting peachy, then click button 'add appointment':
    1) add appointment-object to global state:
    Appointment_056946 = {
        patientId: Darwish_953462,
        treatmentName: "parodontology",
        dayTime: "2010",
        dentist: Ayad_083596,
        Assistant: Bakir_03949463,
        isUpdateAppointment: false, --> while appointment is updated (see use case 'update an appointment' below), the boolean is set to true. 
    }
    1) appointment is added to the list with appointments in component 'Appointments'. For this purpose a component DisplayAppointments must be created that is a child component of Appointments.js
    2) appointment becomes automatically visible in the Calender (month) view and the day view.


use case 2of3: a an assistant I delete a dental appointment for a patient in the dentist-app (e.g. the patient is ill, so cannot come): 
1. in component DisplayAppointments (is child of component Appointments) click delete-button on the row that contains the appointment-to-delete. --> Each appointment will have their own button 'delete'.
2. result: via inverse data flow (via redux-toolkit) appointment is removed from state. Automatic re-render will make then apppointment disappear in component DisplayAppointments.
3. result: appointment will disappear from calender (month) view and day view, due to automatic re-render.


use case 3of3: a an assistant I update a dental appointment for a patient in the dentist-app: (e.g. bonus requirement: move appointment to other day-time: e.g. "2010" becomes "0211"):
1. make immutable copy of appointment-to-update.
2. delete the appointment-to-update from state. 
3. in component DisplayAppointments (is child of component Appointments) click update-button on the row that contains the appointment-to-update. --> Each appointment will have its own button 'update'.
4. To start the update of appointment, A click event on button 'update' will set the boolean isUpdateAppointment to true. 
5. if true, use conditional rendering to display the component UpdateAppointmen. --> 2do: create this component inside component DisplayAppointments. ( ps DisplayAppointments itself is a child component of component Appointments, and component Appointments is a child component of DentalPractice.js). 
6.  example: see object with name 'Appointment_056946' (see example code above).
7. "paste" the appointment-data into the update-window.  --> this update-window is a re-use of the component AddAppointment. --> this means that after each update the appointment will have a new appointment_id (e.g. Appointment_056946). This is not an impediment, because there is no connection to e.g. a billing program to make the invoices (in which case the invoice would have to be connected to the updated appointment_id as well). 
8. make the necessary modification(s) (e.g. move the appointment, switch to another dentist, etc.)
9. save the appointment 
10. result: via inverse data flow (via redux-toolkit) appointment is updated in state. Automatic re-render will make then apppointment update in component DisplayAppointments.
11. result: appointment will update in calender (month) view and day view, due to automatic re-render.

















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
