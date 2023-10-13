
import Navbar from './Components/Navbar';
import Page from './Components/Page';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { getPokemons, getPokemonsData, searchPokemon } from './Components/API';
import Pokedex from './Components/TaskList/pokedex';
import { PokemonContext } from './contexts/PokemonContext';


function App() {
  const {filtro, setFiltro, loading, setLoading} = useContext(PokemonContext)
  

  // const [loading, setLoading] = useState(false)
  const [pokemons, setPokemons] = useState([])
  const [page, setPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const [itensPerPages, setitensPerPages] = useState(25)
  const [notFound, setNotFound] = useState(false)

  const buttonGrass = () => {
    setitensPerPages(10000)
    setFiltro("grass")
    setPage(0)
  }
  const buttonWater = () => {
    setitensPerPages(10000)
    setFiltro("water")
    setPage(0)
  }
  const buttonfire = () => {
    setitensPerPages(10000)
    setFiltro("fire")
    setPage(0)
  }

  const normalized = () => {
    setitensPerPages(25)
    setFiltro('')
    setPage(0)
  }


  const onSearchHandler = async (pokemons) => {
    //se valor for falso ele vai executar o fetchPokemon
    if (!pokemons) {
      return fetchPokemons()
    }
    setLoading(true)
    setNotFound(false)
    const result = await searchPokemon(pokemons)
    if (!result) {
      setNotFound(true)
    } else {
      setPokemons([result])
      setPage(0)
      setTotalPage(1)
    }
    setLoading(false)
  }

  const fetchPokemons = async () => {
    try {
      setLoading(true)
      setNotFound(false)
      const data = await getPokemons(itensPerPages, itensPerPages * page);
      const promises = data.results.map(async (poke) => {
        // poke = name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/'
        //ou seja esotu entrando no data depois entrando no results e imprimindo todos os pokemons

        return await getPokemonsData(poke.url)
        //A função "getPokemonsData" é chamada e passando como argumento "url", essa função também faz uso do método "fetch" e utiliza "url" para obter informações detalhadas de um Pokemon específico. Ela retorna essas informações também convertidas em formato JSON.
        //aqui no await, estou acessando apenas url

      })

      //quando todas as requisições estiverme prontas ele continuara
      //Na função "fetchPokemons", é criado um array "promises" usando o método "map" para iterar sobre os elementos em "data.results" e para cada elemento(poke) é chamada a função "getPokemonsData" passando como argumento "poke.url". Essa array de promises é então passada para o método "Promise.all" o qual aguarda todas as promises serem resolvidas antes de continuar. O resultado final é armazenado em "results" e setado no estado "pokemons" utilizando o setPokemons.
      const results = await Promise.all(promises)

      setPokemons(results)
      setLoading(false)
      setTotalPage(Math.ceil(data.count / itensPerPages))
      console.log(data.count)

    } catch (e) {
      console.log('error', e);
    }

  }


  useEffect(() => {
    fetchPokemons()
    //o page como vai alterar o componente vai renderizar denovo por isso é necessario colocar para executar toda vez que page foi atualizado
  }, [page, itensPerPages, ])

  const [search, setSearch] = useState('');

  return (
    
    
    <div className="App">

      {/* //pegando valor de navBar e setando no 'search' */}
      <Navbar onSearch={onSearchHandler}></Navbar>
      <Page pokemon={search} />
      <div className='Filtros'>
        <button onClick={buttonfire}>Fogo</button>
        <button onClick={buttonWater}>Água</button>
        <button onClick={buttonGrass}>Vegetal</button>
        <button onClick={normalized}>Mostrar Todos</button>
      </div>
      {/*  //A função filter e a função find retornam novos array com os dados que passarem no teste de verdadeiro ou falso e o resultado final é esse array novo que é passado para o componente Pokedex */}

      {notFound ? (
        <div className='notFound'>Não existe</div>
      ) :
        (<Pokedex
          pokemons={pokemons.filter(pokemon => pokemon.types.find((type) => type.type.name === filtro) || filtro === '')}
          loading={loading}
          page={page}
          totalPages={totalPage}
          setPage={setPage}>
        </Pokedex>)}
    </div>

  
  );

}

export default App;


/* 
1 A primeira função "getPokemons" é uma função assíncrona que recebe dois parâmetros, limit e offset, que são usados como argumentos para fazer uma requisição GET para a API do PokeAPI usando a biblioteca Fetch.

2 Dentro dessa função, a requisição é feita usando o método fetch e passando a URL como argumento. Isso retorna uma resposta que é convertida em JSON e retornada.

3 A segunda função "getPokemonsData" é também uma função assíncrona que recebe um parâmetro "url" e faz uma requisição GET para a url específica passada como argumento.

4 A função "fetchPokemons" é usada para obter os dados dos pokemons. Ele usa a função "getPokemons" para obter os dados iniciais dos pokemons e armazena os resultados no estado 'pokemons'.

5 O método useEffect é usado para chamar a função fetchPokemons uma vez quando o componente é montado.

6 Dentro da função fetchPokemons, é usado o método map para iterar sobre cada um dos resultados, e para cada um dos resultados é usado a função "getPokemonsData" para obter os dados detalhados do pokemon individual.

7 Os dados de cada pokemon são armazenados em um array de promises.

8 O método "Promise.all" é usado para esperar que todas as promises sejam resolvidas e armazena */