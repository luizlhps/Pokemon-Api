import React from "react"
import Searchbar from "../Searchbar"

//recebendo
//{} usado para criar um objeto
function Navbar({ onSearch }) {
    // const { onSearch } = props
    return (
        <header className="Header">
            <nav className="nav">
                <img className="logo" src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"></img>
                <div className="title-header">
                    <h2>Procure tudo a respeito</h2>
                    <h3>de seu Pokemon Favorito</h3>
                </div>
                {/* ta recebendo o valor */}
                <Searchbar onSearch={onSearch}/>
            </nav>
        </header>

    )
}

export default Navbar