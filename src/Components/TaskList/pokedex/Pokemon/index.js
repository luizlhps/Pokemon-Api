import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import svg from "../../../../SVG/svg.svg"
import heartss from "../../../../SVG/heart-nofill.svg"
const Pokemon = ({ pokemon, onLike, favoriteList }) => {  

  //verifica se o heart existe no local storeage

  const [heart, setHeart] = useState(heartss);
        
  useEffect(() => {
        if(favoriteList.findIndex(x => x === pokemon.id) > -1) {
            setHeart(svg)
        } else setHeart(heartss);
    }, [pokemon, favoriteList]);

    const handleClick = () => {
        onLike(pokemon.id);
    }

    // Armazenar um objeto no Local Storage
    // const pessoa = { nome: 'João', idade: 30 };
    // localStorage.setItem('pessoa', JSON.stringify(pessoa));

    // // Obter um objeto do Local Storage
    // const pessoa = JSON.parse(localStorage.getItem('pessoa'));

    return (
        
        <div className="pokemon-card">
            <div className="pokemon-image-container">
                <Link to={`/pokemon/${pokemon.id}`}><img src={pokemon.sprites.front_default} alt={pokemon.name}></img></Link>
            </div>
            <div className="card-body">
                <div className="card-top">
                    <p><b>Nome:</b> {pokemon.name}</p>
                    <div>#{pokemon.id}</div>
                </div>
                <p><b>Experiência base:</b>{pokemon.base_experience}</p>
                    <span><p><b>Tipo</b></p></span>
            <div className="card-bottom">
                <div className="card-type">

                    {pokemon.types.map((type, index) => (
                        <div className="pokemon-type" key={index}>
                            <span  key={type?.type.name} className={type.type.name}><p>{type.type.name} </p></span>
                        </div>

                    ))}
                </div>
                <button className="pokemon-heart" onClick={handleClick}><img src={heart} ></img></button>
            </div>

            </div>

        </div>

    )
}

export default Pokemon