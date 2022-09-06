import styled from "styled-components";

export const AssistantAddStyled = styled.div`
  display: grid;
  color: ${({ theme}) => theme.font01 };
  grid-template-areas:
      "intro intro intro intro"
      "form form form form"
      ;
  text-align: center;
  grid-gap: 0.25rem;
  // font-family: ${({ theme}) => theme.font };
  font-size: ${({ theme}) => theme.fontSize.default }
 
`;

export const Column = styled.div`
  flex: 1;
`

export const Form = styled.form`
  grid-area: form;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;  
  gap: 1rem;
  background: ${({ theme}) => theme.colors.blackground02};
  // color: white;
  padding: 0.25rem;

  @media (max-width: 700px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
    padding-left: 3.5rem;
  }
`;

export const Intro = styled.div`
  grid-area: intro;
  background: ${({ theme}) => theme.colors.header01 };
  padding: 0.25rem;
  font-weight: bold;
`;






