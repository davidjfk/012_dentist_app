import styled from "styled-components";

export const NavigationArea = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;  
  gap: 0.25rem;
  padding: 0.1rem;

  @media (max-width: 700px) {
    flex-direction: column;
  }
  font-family: ${({ theme}) => theme.font };
  font-size: ${({ theme}) => theme.fontSize.default };
`;
  
export const Section1 = styled.section`
  background: ${({ theme}) => theme.colors.bluegrey };
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  width: 100%;
  height: 2.8rem;
  border: 1px solid black;
`;
export const Section2 = styled(Section1)``;
export const Section3 = styled(Section1)``;






