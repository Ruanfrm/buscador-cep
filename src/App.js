import { useState } from 'react';
import api from './services/api';
import './App.css';
import './styles.css';
import {FiSearch} from 'react-icons/fi'

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
    <div className='container'>
      <h1 className='title'>Buscador de CEP</h1>
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
      

    </div>
  );
}

export default App;
