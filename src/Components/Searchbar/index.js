import { useEffect, useState, useContext } from "react"
import { PokemonContext } from "../../contexts/PokemonContext"
//useContext so é possivel ser usado em seus filhos

//Você usa as propriedades para enviar valor ou receber valor
function Searchbar({onSearch}) {
    const {numero} = useContext(PokemonContext)
    console.log(numero)

    // const {onSearch} = props.onSearch


    //task - armazena os itens da lista 
    //inputValue - Armazena o valor do input
    const [inputValue, setInputValue] = useState('')
    const onchangehandle = (e)=>{
        setInputValue(e.target.value.toLowerCase())
        if(e.target.value.length === 0 ){
            onSearch(undefined)
        }
    }
   
    useEffect(()=>{
        
        const handleKey = (event) =>{
            
            //verifica se a tecla é enter
            if(event.key === 'Enter'){
                event.preventDefault()
            
        
            //Setará no tasks oo valor quie ele ja tem ([]+inputvalue) 
                // callback para retornar ao componente pai o valor do input
                onSearch(inputValue)
            }
            console.log('onSearch', inputValue)
        };

        //é usado para registrar um evento em um elemento dom. Ele recebe dois argumentos:o tipo de evento('click' ou 'keydown') e uma função que é chamada sempre que o evento ocorre
        document.addEventListener('keydown', handleKey);


        //o retorno de chamada é uma função que é chamada quando o hook é limpo, ou seja quando o componente é desmontadod.nesse caso a função remove o listener evento de teclado adcionar anteriormente
        return()=>{
        //aqui desativaremos o evento
            document.removeEventListener('keydown', handleKey)
        };
        //tudo isso dentor do useEffect para toda vez que input e taks foremataualizado o use efecct vai ser executado
    },[inputValue, onSearch]);




    return (
        <div>

            <form className="input-seach">
            <label className="label-search">
                <p>Digite seu Pokemon:</p>
                <input type='text' value={inputValue} className="seach-bar"
                 onChange={onchangehandle}></input>
            </label>
        </form>
        </div>
)
}

// export const tasks = [...tasks]
export default Searchbar