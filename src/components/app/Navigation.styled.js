import styled from "styled-components";

export const NavigationStyled = styled.nav`
  .navBar {
    margin-bottom: 4rem;
    font-size: 2rem;
  }
  
  .navBar li {
    display: inline-block;
    list-style: none;
    margin-right: 4rem;
  }
  
  .navBar a {
    text-decoration: none;
  }
  
  .navBar a:hover {
    color: ${({ theme}) => theme.colors.onHoverFontColor01 };;
  }
  
  a,
  a:focus,
  a:visited {
    color: ${({ theme}) => theme.colors.fontColor03 };;
    outline: none;
  }
`;