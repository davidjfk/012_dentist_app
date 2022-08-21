import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
 
    *, *::before, *::after {
        box-sizing: border-box;
        margin-top: 0;
        margin: 0;  
        padding: 0; 
    }
    
    root,
    html {
        font-size: 16px;
      }
    

    // body {
    //     color: ${props => (props.darkMode ? 'white' : 'black')};
    // }

`