import styled from "styled-components";

export const ClientListAreaStyled = styled.div`
  grid-area: assistantList;  
  background: ${({ theme}) => theme.colors.background02};
  color: ${({ theme}) => theme.colors.fontColor01};
  padding: 0.25rem;
`;

export const ClientListStyled = styled.div`
  display: grid;
  color: ${({ theme}) => theme.colors.fontColor01};

  grid-template-areas:
      "intro intro intro intro"
      "formcontrol formcontrol formcontrol formcontrol"
      "header header header header"
      "assistantList assistantList assistantList assistantList"
      ;
  text-align: center;
  grid-gap: 0.25rem;
  font-family: ${({ theme}) => theme.font };
  font-size: ${({ theme}) => theme.fontSize.default };
`;

export const Column = styled.div`
  flex: 1;
`

export const FormControlArea = styled.nav`
  grid-area: formcontrol;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  padding: 0.1rem;
  
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 0.2rem 0.1rem;
  }
`;

export const Headers = styled.main`
grid-area: header;  
background: ${({ theme}) => theme.colors.header01 };
color: ${({ theme}) => theme.colors.fontColor01};
font-weight: bold;
padding: 0.25rem;
display: flex;
font-size: ${({ theme}) => theme.fontSize.default };
`;


export const Intro = styled.div`
grid-area: intro;
background: ${({ theme}) => theme.colors.header01 };
font-weight: bold;
padding: 0.25rem;
`;

export const Row = styled.div`
  display: flex;
  margin-bottom: 1rem;
`

export const Section1 = styled.section`
  background: ${({ theme}) => theme.colors.background02 };
  padding: 0.25rem;
  width: 100%;
  height: 100%;
  border: 1px solid black;
  h3 {
    font-size:  ${({ theme}) => theme.fontSize.small };
  }
  @media (max-width: 700px) {
    font-size:  ${({ theme}) => theme.fontSize.small };
  }
`;
export const Section2 = styled(Section1)``;
export const Section3 = styled(Section1)``;



  














