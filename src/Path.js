import React from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

//Pages
import PokemonPage from '../src/screens/pokemonPages'
import App from './App';

export const Path = () => {
  return (
    <>
    <Router>
        <Routes>
            <Route path='/' element={<App/>}/>
            <Route path='pokemon/:id' element={<PokemonPage/>}/>
        </Routes>
    </Router>
    </>
  )
}

