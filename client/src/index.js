import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';
import {theme} from "./styles/styles"

// #1de9b6
// let theme = createTheme({
//   palette: {
//     primary: {
//       main: '#000000', 
//     },
//     secondary: {
//       main: '#14a37f', 
//     },
//   },
// });

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <App />
    </ Router>
  </ThemeProvider>,
  document.getElementById('root')
);

reportWebVitals();
