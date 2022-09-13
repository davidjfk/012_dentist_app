import styled from "styled-components";



export const DayInHeaderInMonthStyled = styled.div`
  padding-right: 30px;
  padding-left: 1.4rem;
  background: ${({ theme}) => theme.colors.header01};
`;


export const LegendaTableStyled = styled.table`  
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background: ${({ theme}) => theme.colors.background02};
  margin-left: 0.5rem;
  border: 2px solid black;
  width: 18rem;
  height: 8rem;
  font-size: ${({ theme}) => theme.fontSize.medium};
  font-weight: 500;
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


export const MonthViewStyled = styled.div`
  padding: 0.5rem;
  font-size:  ${({ theme}) => theme.fontSize.smallMedium};
  margin-bottom: 0.5rem;
  border: 1px solid lightblue;
  padding: 0.5rem;
  background: ${({ theme}) => theme.colors.background02};
  margin-left: 0.5rem;
`;

export const HeaderInMonthStyled = styled.header`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background: ${({ theme}) => theme.colors.background03};
  font-weight: bold;
  font-size:  ${({ theme}) => theme.fontSize.mediumDefault};
`;

export const TableInMonthStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

export const OrangeStyled = styled.th`
  background: ${({ theme}) => theme.colors.background04};
  padding: 0.2rem;
`;

export const PurpleStyled = styled.th`
background: ${({ theme}) => theme.colors.background05};
  padding: 0.2rem;
`;

export const RedStyled = styled.th`
background: ${({ theme}) => theme.colors.background06};
  padding: 0.2rem;
`;
