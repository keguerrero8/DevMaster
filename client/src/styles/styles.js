import { createTheme } from "@mui/material";   

export const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 480,
            md: 768,
            lg: 1200,
            xl: 1536
        }
    },
    palette: {
      primary: {
        main: '#000000', 
      },
      secondary: {
        main: '#14a37f', 
      },
    },
})
