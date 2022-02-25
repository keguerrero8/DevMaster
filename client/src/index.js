import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';

// #1de9b6
let theme = createTheme({
  palette: {
    primary: {
      main: '#000000', 
    },
    secondary: {
      main: '#14a37f', 
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <App />
    </ Router>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
