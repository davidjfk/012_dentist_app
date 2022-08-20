import styled from "styled-components";

export const SkillsInListStyled = styled.h1`

display: flex;
flex-direction: column;
align-items: flex-start;
// min-width: 15%;


font-size: ${({ theme}) => theme.fontSize.default };

@media (max-width: 700px) {
  font-size: ${({ theme}) => theme.fontSize.medium };
}

`