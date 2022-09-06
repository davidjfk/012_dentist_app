import styled from "styled-components";

export const SkillsInListStyled = styled.h1`

display: flex;
flex-direction: column;
align-items: flex-start;
min-width: 16rem;

font-size: ${({ theme}) => theme.fontSize.default };
font-weight: 450;

@media (max-width: 700px) {
  font-size: ${({ theme}) => theme.fontSize.medium };
}

`