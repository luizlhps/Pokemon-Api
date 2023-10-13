import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PokemonContext } from '../contexts/PokemonContext'
import buttonRight from '../SVG/button-pokemon-page.svg'
import buttonLeft from '../SVG/button-rigth.svg'



const PokemonPages = () => {

  const { getPokemonById, Count } = useContext(PokemonContext)
  const [loading, setLoading] = useState(true)
  const [pokemon, setPokemon] = useState({})
  const [AllPages, setAllPages] = useState()

  const { id } = useParams()

  const fetchPokemon = async (id) => {
    const data = await getPokemonById(id)
    setPokemon(data)
    setLoading(false)
  }

  const AllPagesValue = async () => {

  }


  useEffect(() => {
    fetchPokemon(id)
    AllPagesValue()

  }, [id])

  const calculatorPokemonPage = id.toString().padStart(4, '0')


    ;


  return (

    <main>
      <div className='container-pokemon-page'>
        <a href='http://localhost:3000/'><img className="logo-page" src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"></img></a>
        {
          loading ? (
            (<div className="loading"><p>Carregando</p>

            </div>)
          ) : (
            <>
              <div className="pokemon-card-page">
                <div className='Header-page'>
                  <h3>nº{calculatorPokemonPage}</h3>
                  <div className='top-card-page'>
                    <Link to={pokemon.id > 1 ? `/pokemon/${pokemon.id - 1}` : '/'}><button className="button-page"><img src={buttonLeft} ></img></button></Link>
                    <h1>{pokemon.name}</h1>
                    <Link to={pokemon.id < Count ? `/pokemon/${pokemon.id + 1}` : '/'}><button className="button-page"><img src={buttonRight} ></img></button></Link>
                  </div>


                </div>
                <div className='container-page-principal'>

                  <div className="pokemon-types-page">
                    <h3>Types</h3>
                    {pokemon.types.map((type, index) => (
                      <div className='pokemon-type' key={index}>
                        <span key={type?.type.name}>
                          <div className={index === 0 ? `first-card${type.type.name}` : index === 1 ? `second-card${type.type.name}` : ''}>
                            <div className='ball'></div>

                            <p >{type.type.name} </p></div></span>
                            {/* <div className={`card-${index}-${type.type.name}`}>
                            <div className='ball'></div>

                            <p >{type.type.name} </p></div> */}
                      </div>

                    ))}
                  </div>

                  <div className="column">
                    <img className='img-pokemon-page' src={pokemon.sprites.front_default} alt={pokemon.name}></img>
                  </div>

                  <div className="column">
                    <div className='column-1-page'>

                      <h3>Height</h3>
                      <h4>{`${pokemon.height} m`}</h4>

                      <h3>Category</h3>
                      <h4>Flame Pokemon</h4>


                    </div>
                    <div className='column-2-page'>

                      <h3>Experience</h3>
                      <h4>{`${pokemon.base_experience} Xp`}</h4>

                      <h3>Height</h3>
                      <h4>1,7</h4>

                    </div>
                  </div>
                </div></div>
              <div className='footer-page'>
                <div className='footer-column-page'>
                  <h3>Versions</h3>
                  <h4>Its dorsal and pectoral fins are strongly
                    developed like muscles. It can swim at a
                    speed of five knots</h4></div>
                <div>


                  <div className='column-footer-1'>
                    <div className='column-footer-1-right'>
                      {/* {Neste exemplo, estamos usando o método find para procurar o primeiro objeto dentro do array stats} */}
                      <h4>Hp:{pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}</h4>
                      <h4>Attack:{pokemon.stats.find(stat => stat.stat.name === 'attack')?.base_stat}</h4>
                      <h4>Defense:{pokemon.stats.find(valor => valor.stat.name === 'defense')?.base_stat}</h4>
                    </div>

                    <div className='column-footer-1-left' >
                      <h4>Speed:{pokemon.stats.find(valor => valor.stat.name === 'speed')?.base_stat}</h4>
                      <h4>Special Defense:{pokemon.stats.find(valor => valor.stat.name === 'special-defense')?.base_stat}</h4>
                      <h4>Special Attack:{pokemon.stats.find(valor => valor.stat.name === 'special-attack')?.base_stat}</h4></div>
                  </div>
                </div>

              </div>
            </>
          )
        }
      </div>
    </main>
  )
}

export default PokemonPages