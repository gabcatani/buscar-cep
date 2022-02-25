import { FiSearch } from 'react-icons/fi'
import './App.css';
import { useState } from 'react';
import api from './services/api';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState('');

  async function handleSearch(){
  
    if (input === ''){
    alert(" Preencha o CEP ! ")
    return }
    
    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("")

    } catch {
      alert(" CEP Não Encontrado ! ")
      setInput("")
    }
  }

  return (
    <div className="container">

      <h1 className="title">Buscador CEP</h1>
      <h5 className="exempler">Somentes Números no CEP, EX: 89920000</h5>

      <div className="containerInput">
        
        <input 
        type="text" 
        placeholder="Digite seu CEP..."
        value={input}
        onChange={(event) => setInput(event.target.value)}
        />

      <button 
      className="buttonSearch" 
      onClick={handleSearch}> 
      <FiSearch size="25" color="white"/>
      </button>
    
      </div>


      {Object.keys(cep).length > 0 && (
      <main className="main">
      
      <h2>CEP: {cep.cep} </h2>

        <span>Logradouro: {cep.logradouro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>Bairro: {cep.bairro}</span>
        <span>Localidade: {cep.localidade}</span>

      </main>
      )}

    </div>
  )
}
export default App;