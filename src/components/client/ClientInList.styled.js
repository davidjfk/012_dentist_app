import styled from "styled-components";

export const ClientInClientListStyled = styled.h1`
    font-size: ${({ theme}) => theme.fontSize.default };
    font-weight: 450;

    @media (max-width: 700px) {
      font-size: ${({ theme}) => theme.fontSize.medium };
    }
`