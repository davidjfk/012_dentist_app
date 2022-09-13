import styled from "styled-components";

export const AppointmentInMonthDayStyled = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.1rem;
    border-top-style: solid;
    border-width: 1px;
    margin-top: 0.2rem;
    padding: 0.5rem;  
`;

export const AssistantInMonthDayAppointmentStyled = styled.div`
    margin-bottom: 1rem;
`;


export const ClientInMonthDayAppointment = styled.div`
    margin-top: 1rem;
`;

export const DayInMonthViewStyled = styled.div`
    margin-left: 0.5rem;
    color:  ${({ theme}) => theme.colors.fontColor01}; 
    font-weight: bold;
`;

export const DentistInMonthDayAppointment = styled.div`
    margin-top: 1rem;
`;

export const TimeInMonthViewStyled = styled.div`
    margin-left: 0.5rem;
    color:  ${({ theme}) => theme.colors.fontColor01}; 
    font-weight: bold;
`;