export const searchPokemon = async(pokemon) =>{
    try{
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        return await response.json()
        
    }catch(error){
        console.log('erro')
    }
}


export const getPokemons = async(limit, offset) =>{
    console.log('offset>>',limit)
    try{
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)

        return await response.json()
        
    }catch(error){
        console.log('erro')
    }
}


export const getPokemonsData = async(url) =>{
    try{
      const response = await fetch(url)
        return await response.json()
        
    }catch(error){
        console.log('erro')
    }
}

