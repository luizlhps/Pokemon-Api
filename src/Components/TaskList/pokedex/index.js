import React, { useEffect, useState } from "react";
import Pagination from "../../pagination";
import Pokemon from "./Pokemon";



function Pokedex({ pokemons, loading, page, totalPages, setPage }) {
    const [favoriteList, setFavoriteList] = useState([]);

    useEffect(() => {
        const favoritePokemonsList = JSON.parse(localStorage.getItem("FAVORITE_POKEMONS") || '[]');
        setFavoriteList([...favoritePokemonsList]);
    }, []);


    // if(favoriteList.findIndex(x => x === pokemon.id) > -1) {

    const handleLike = (id) => {
        const array = [...favoriteList];
        const index = array.findIndex(x => x === id);
        if (index >= 0) {

            array.splice(index, 1)
        } else {
            array.push(id)
        }
        setFavoriteList([...array]);
        localStorage.setItem("FAVORITE_POKEMONS", JSON.stringify(array));
    }

    const onLeftClickHandler = () => {
        if(page > 0){
            setPage(page-1)
        }
    }
    const onRightClickHandler = () => {
        if(page+1 !== totalPages){
            setPage(page+1)
        }
    }

    //&& operador logico para ver se as duas expressoes são verdadeiras, no codigo se o valor de pokemons é verdadeito antes de iterar sobre ele com o 'map'. isso é uma medida de segunraça para evitar que uma propriedade acesse de um objeto 'null' ou 'undefined'
    //loading for verdadeiro o codigo dentro sera
    return (
        <div>
            <div className="pokedex-header">
                <Pagination
                    page={page+1}
                    totalPages={totalPages}
                    onLeftClick={onLeftClickHandler}
                    onRightClick={onRightClickHandler}
                />
            </div>
            {/* quando loadingo for verdaeiro, lembrando no codigo esta (true no começo dps esta false) */}
            {loading ? (<div className="loading"><p>Carregando</p>

            </div>) :


                (<div className="pokedex-grid">
                    {pokemons && pokemons.map((poke, index) => {

                        return (
                            <div key={index}>
                                <div><Pokemon pokemon={poke} key={index} onLike={(id) => handleLike(id)} favoriteList={favoriteList} /></div>
                                <img></img>
                            </div>

                        )

                    })}</div>)}
        </div>
    )
}


export default Pokedex