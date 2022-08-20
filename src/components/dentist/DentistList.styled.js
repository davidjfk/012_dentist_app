import styled from "styled-components";


export const DentistListAreaStyled = styled.div`
  grid-area: dentistList;  
  background: yellow;
  color: black;
  padding: 0.25rem;
`;

export const DentistListStyled = styled.div`
  display: grid;
  color: white;

  grid-template-areas:
      "intro intro intro intro"
      "formcontrol formcontrol formcontrol formcontrol"
      "header header header header"
      "dentistList dentistList dentistList dentistList"
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
  align-items: start;
  gap: 0.25rem;
  padding: 0.1rem;
  
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 0.2rem 0.1rem;
  }
`;

export const Headers = styled.main`
  grid-area: header;  
  background: ${({ theme}) => theme.colors.nearlyblack };
  color: white;
  padding: 0.25rem;
  display: flex;
  font-size: ${({ theme}) => theme.fontSize.default };
`;


export const Intro = styled.div`
  grid-area: intro;
  background: ${({ theme}) => theme.colors.nearlyblack };
  padding: 0.25rem;
`;

export const Row = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`

export const Section1 = styled.section`
  background: ${({ theme}) => theme.colors.bluegrey };
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



  













