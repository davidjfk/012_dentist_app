export const theme = {
    colors: {
      button01: "aquamarine", 
      background01: "lightslategray", 
      background02: "lightyellow", 
      background03: "aquamarine", 
      background04: "orange", 
      background05: "purple", 
      background06: "red", 
      fontColor01: "black",
      fontColor02: "white", 
      fontColor03: "darkSalmon",
  
      header01: "deepskyblue",
  
      onHoverBackground01: "lightslategray",
      onHoverBackground02: "aquamarine",
  
      onHoverFontColor01: "greenyellow"
    },

    /*
      status: buttons (delete) on Appointment-page can be disabled with 
      pointerEvents.no  below.
      2do next: 
      1. disable these buttons from Redux-toolkit during update appointment process.
      2. after completion of this process, enable these buttons again.
      access pointerEvents from Redux-toolkit. 
    */
    pointerEvents: "auto",
    font: {
        font01: "Helvetica"
    },
    fontSize: {
          tiny: "0.5rem",
          small: "1rem",
          medium: "1.2rem",
          default: "1.4rem",
          big: "1.9rem"
      }
  };