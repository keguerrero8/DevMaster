import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';
import {theme} from "./styles/styles";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <App />
    </ Router>
  </ThemeProvider>,
  document.getElementById('root')
);

reportWebVitals();
