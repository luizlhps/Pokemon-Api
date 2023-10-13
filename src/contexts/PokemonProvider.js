import React, { useState, useEffect } from 'react'
import { PokemonContext } from './PokemonContext'

export const PokemonProvider = ({ children }) => {

  const [offset, setOffSet] = useState(0)

  //Estado loading
  const [loading, setLoading] = useState(true)
  const [Count, setCount] = useState(false)

  //Filtro
  const [filtro, setFiltro] = useState('')

  //Chamar 50 Pokemons
  const [AllPokemons, setAllPokemons] = useState([])
  const getAllPokemon = async (limit = 50, offset) => {
    try {
      const baseURL = "https://pokeapi.co/api/v2/"
      const response = await fetch(`${baseURL}pokemon?limit=${limit}&offset=${offset}`)
      const data = await response.json();
      
      const promises = data.results.map(async (pokemon) => {
        //aqui estamos entrando no url 
        const res = await fetch(pokemon.url)
        const data = await res.json()
        return data
      })
      const results = await Promise.all(promises)
      setCount(data.count)
      setAllPokemons([...AllPokemons, ...results,])
      setLoading(false)
    } catch (erro) {
      console.log('erro', erro)
    }
  };

  useEffect(() => {
    getAllPokemon()
  }, [])


  //Chamar Todos Os Pokemons
  const [globalPokemons, setGlobalPokemons] = useState([])
  const getGlobalPokemons = async () => {
    try {
      const baseURL = "https://pokeapi.co/api/v2/"
      const response = await fetch(`${baseURL}pokemon?limit=100000$offset=0`)
      const data = await response.json();

      const promises = data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url)
        const data = await res.json()
        return data
      })
      const results = await Promise.all(promises)

      setGlobalPokemons(results)
      setLoading(false)


    } catch (erro) {
      console.log('erro', erro)
    }
  };

  useEffect(() => {
    getGlobalPokemons()
  }, [])


  //Chamar Por Id 
  const getPokemonById = async (id) => {
    try {
      const baseURL = "https://pokeapi.co/api/v2/"
      const response = await fetch(`${baseURL}pokemon/${id}`)
      const data = await response.json();
      return data
    } catch (erro)
    { console.log(erro, 'erro') }
  }


  return (
    <PokemonContext.Provider value={{
      AllPokemons,
      globalPokemons,
      getPokemonById,
      filtro,
      numero: 8,
      setFiltro,
      loading,
      setLoading,
      Count
    }}>
      {children}
    </PokemonContext.Provider>
  )
}
