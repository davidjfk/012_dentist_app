import styled from "styled-components";

export const DayNrInMonthStyled = styled.div`
    padding-left: 1rem;
    font-size:  ${({ theme}) => theme.fontSize.mediumDefault};
    font-weight: 700;
    background: ${({ theme}) => theme.colors.header01};
`;