// theme.js
import { createTheme } from '@mui/material/styles';
import backgroundImage from './i11.jpg';
const theme = createTheme({
    palette: {
        mode: 'light', // Adjust this based on your theme preference
        primary: {
            main: '#000000', // Adjust primary color
        },
        
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                body {
                     margin: 0;
                    padding: 0;
                    height: 100vh;
                    overflow: hidden;
                    background-image: url(${backgroundImage});
                    background-size: cover; // Adjust background properties as needed
                    background-repeat: no-repeat;
                }
            `,
        },
    },
});

export default theme;
