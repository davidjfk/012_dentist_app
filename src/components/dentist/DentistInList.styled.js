import styled from "styled-components";

export const DentistInDentistListStyled = styled.h1`
    // display: block;
    

    font-size: ${({ theme}) => theme.fontSize.default };

    @media (max-width: 700px) {
      font-size: ${({ theme}) => theme.fontSize.medium };
    }
`