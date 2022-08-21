import styled from "styled-components";

export const AssistantInAssistantListStyled = styled.h1`
    font-size: ${({ theme}) => theme.fontSize.default };

    @media (max-width: 700px) {
      font-size: ${({ theme}) => theme.fontSize.medium };
    }
`