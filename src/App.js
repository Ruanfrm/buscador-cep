import { useState } from "react";
import {FiSearch} from 'react-icons/fi'
import api from "./services/api";
import {BsGithub} from "react-icons/bs"
import {IoLinkSharp} from "react-icons/io5"



function App() {

  const [input, setInput] = useState('');
  const [cep,setCep] = useState({});

  async function handleSearch(){
      if(input === ''){
        alert('Preencha algun CEP')
        return;
      }

      try{
        const response = await api.get(`${input}/json`);
        setCep(response.data)
        setInput("")
      }catch{
        alert('Ops error ao buscar')
        setInput("")
      }
  }

  return (
    <div className="App">
      <h1>Buscador de Cep</h1>

      <div className='containerInput'>
        <input type="text" placeholder='Digite seu CEP'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />

        <button className='buttonSearch' onClick={handleSearch} type="submit">
          <FiSearch size={25} color="#fff"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
        <h2>CEP: {cep.cep}</h2>
        <span>Cidade: {cep.localidade} - {cep.uf}</span>
        <span>ddd: {cep.ddd}</span>
        <span>ibge: {cep.ibge}</span>
      </main>
      )}

      <footer> 
        <h4>Feito por Ruan Freire</h4>
        <a href="https://github.com/Ruanfrm" target="_blank"><BsGithub size={24} color="#33da96"/></a>
        <a href="https://ruanfr.com" target="_blank"><IoLinkSharp size={24} color="#33da96"/></a>
        
       
      </footer>
      
    </div>
  );
}

export default App;
