import React, { useEffect, useState } from "react"
import { searchPokemon } from "../API"
import TaskList from '../TaskList'


function Page({pokemon}) {

    const [pokemons, setPokemons] = useState([])

    //useEffect que o valor de (props)pokemon mudar ele vai executar e buscar um pokemon na api
    useEffect(()=>{
        if(pokemon){
            onSearchHandler(pokemon)
        }
    
    },[pokemon])

    const onSearchHandler = async(pokemon) => {
        const result = await searchPokemon(pokemon.toLowerCase())
        const pokemonData = {
            name: result.name,
            types: result.types,
            base_experience: result.base_experience,
            sprites: result.sprites
        };
        //pokemons é listagem
        console.log('result =>', result)
        // console.log('pokemonData =>', pokemonData)
        setPokemons([...pokemons, pokemonData])
        console.log('teste', pokemons)

        pokemonData.types.forEach(type => {
            console.log(type.type.name) // "fire" "flying"
          })
    }


    return (
        <section>
            <div className="Title-Pokedex">
                <h3>Pokedex</h3>
            </div>

            <TaskList tasks={pokemons} />
       
            
        </section>
    )
}

export default Page