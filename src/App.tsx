import { FiSearch } from 'react-icons/fi'
import './App.css';
import { useState } from 'react';
import api from './services/api';

type test = {
  logradouro:string;
  complemento:string;
  cep:string;
  bairro:string;
  localidade:string;
}

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState<test | null>(null);

  async function handleSearch(){
  
    if (input === ''){
    alert(" Preencha o CEP ! ")
    return }
    
    try {
      const response = await api.get(`${input}/json`)
      console.log(cep)
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

      {cep && (
      <main className="main">
      
      <h2>CEP: {cep?.cep} </h2>
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