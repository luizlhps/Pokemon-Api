import React from 'react';
import ReactDOM from 'react-dom/client';
import './Components/Css/style.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Path } from './Path';
import { PokemonProvider } from './contexts/PokemonProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <PokemonProvider>
    <Path />
    </PokemonProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
