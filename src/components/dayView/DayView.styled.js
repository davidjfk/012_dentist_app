import styled from "styled-components";

export const AppointmentInDayStyled = styled.div`
  list-style-type: none;
  background: ${({ theme}) => theme.colors.background02 };
  border-top: 2px solid grey;
  width: 92.8vw;
  width: 76.8vw;
  width: 43vw;
  margin-bottom: 20px;
  padding: 0.1rem;
  border-top-style: solid;
  border-width: 1px;
  margin-top: 0.2rem;
  margin-right: 2rem;
`;

export const AssistantInDayViewStyled = styled.div`
  padding: 10px;
  font-size: 1.1rem;
  padding-left: 1vw;
`;

export const BoxAroundSelectBox = styled.section`
  align-self: flex-start;
  background: ${({ theme}) => theme.colors.background01 };
  padding: 1rem;
  border: 1px solid black;  
  h3 {
    font-size:  ${({ theme}) => theme.fontSize.small };
  }
  @media (max-width: 700px) {
    font-size:  ${({ theme}) => theme.fontSize.small };
  }
`;

export const ClientInDayViewStyled = styled.div`
  height: 30px;
  padding: 10px;
  font-weight: bold;
  background: ${({ theme}) => theme.colors.header01 };
  font-size:  ${({ theme}) => theme.fontSize.smallMedium};  
  padding-left: 1vw;
  padding-bottom: 2rem;
`;

export const OrangeStyled = styled.th`
  background: ${({ theme}) => theme.colors.background04 };
  padding: 0.2rem;
`

export const PurpleStyled = styled.th`
  background: ${({ theme}) => theme.colors.background05 };
  padding: 0.2rem;
`

export const RedStyled = styled.th`
background: ${({ theme}) => theme.colors.background06};
  padding: 0.2rem;
`

export const DayStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const DayNrInDayViewStyled = styled.div`
  float: right;
  font-weight: bold;
  font-size: ${({ theme}) => theme.fontSize.smallMedium};  
  margin-top: 10px;
  margin-right: 10px;
`;

export const DayWordBeneathSelectBoxStyled = styled.div`
  font-size: ${({ theme}) => theme.fontSize.smallMedium };  
  font-weight: 500;
  margin-top: 10px;
  margin-right: 10px;
`;


export const DentistInDayViewStyled = styled.div`
padding: 10px;
font-size: ${({ theme}) => theme.fontSize.smallMedium};  
padding-left: 1vw;
`;

export const FlexboxAreaStyled = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 0.3rem;
  padding-bottom: 0.1rem;
  
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 0.2rem 0.1rem;
  }
`;

export const Header = styled.div`
  font-weight: bold;
  background: ${({ theme}) => theme.colors.header01 };
  padding: 0.25rem;
  padding-left: 22vw;
  color: ${({ theme}) => theme.colors.fontColor01 };
  font-size: ${({ theme}) => theme.fontSize.default }
`;

export const LegendaStyled = styled.ul`
display: flex;    
flex-direction: column;
list-style: none;
font-size: ${({ theme}) => theme.fontSize.medium};
font-weight: 500;
border: 1px solid black; 
width: 18rem;
`;

export const LegendaTableStyled = styled.table`  
  border: 2px solid black;
  width: 18rem;
  height: 8rem;
  font-size: ${({ theme}) => theme.fontSize.medium};
  th {
    border: 1px solid black;
    font-size: ${({ theme}) => theme.fontSize.medium};
    font-weight: 550;
  } 
  td {
    text-align: center;
    border: 1px solid black;
    font-weight: 500;
  }
`;

export const SelectDayNrToDisplayStyled = styled.div`
  width: 92.9vw;
  display: flex;
  flex-direction: column;
  padding: 0.4rem;
  margin: 1rem auto;
  background: ${({ theme}) => theme.colors.background02 };
  font-size: ${({ theme}) => theme.fontSize.default }
  margin-left: 0px; 
`;

export const TimeInDayViewStyled = styled.div`
  height: 30px;
  padding: 10px;
  float: right;
  background-color: ${({ theme}) => theme.colors.background03};
  font-size: ${({ theme}) => theme.fontSize.medium};  
  font-weight: 450;
  padding-bottom: 2rem;
`;


export const TreatmentTypeStyled = styled.div`
  float: right;
  background: ${({ theme}) => theme.colors.background03 };
  font-size: ${({ theme}) => theme.fontSize.smallMedium};  
  font-weight: 450;
  padding: 6px;
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 20px;
`;



