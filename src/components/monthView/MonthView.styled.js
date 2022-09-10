import styled from "styled-components";

export const ColorLegendaStyled = styled.ul`
  padding: 0.5rem;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  border: 1px solid lightblue;
  padding: 0.5rem;
  background: ${({ theme}) => theme.colors.background02 };
  margin-left: 0.5rem;
  list-style: none;
  padding-left: 1rem;
  font-size: 1.4rem;
  width: 18rem;
  font-weight: 500;
`;

export const MonthViewStyled = styled.div`
  padding: 0.5rem;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  border: 1px solid lightblue;
  padding: 0.5rem;
  background: ${({ theme}) => theme.colors.background02 };
  margin-left: 0.5rem;
`;

export const HeaderInMonthStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  background: ${({ theme}) => theme.colors.background03 };
  font-weight: bold;
  font-size: 1.3rem;
`;

export const TableInMonthStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

export const OrangeStyled = styled.li`
  background: ${({ theme}) => theme.colors.background04 };
  padding: 0.2rem;
`;

export const PurpleStyled = styled.li`
background: ${({ theme}) => theme.colors.background05 };
  padding: 0.2rem;
`;

export const RedStyled = styled.li`
background: ${({ theme}) => theme.colors.background06 };
  padding: 0.2rem;
`;
