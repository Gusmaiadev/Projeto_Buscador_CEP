import { useState} from 'react'
import { FiSearch } from 'react-icons/fi';
import './App.css';
import React from 'react';

import api from './services/api';

function App() {

  const[input, setInput] = useState('');
  const[cep, setCep] = useState({});

 async function heandleSearch(){
    // 01310930/json/

    if(input === ''){
      alert("Preencha o campo com algum CEP!!")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    }catch{
      alert("Ops, erro ao buscar o CEP digitado")
      setInput("");
    }
  }

  return (
    <>
      <div className="container">
        <h1 className="title">Buscador CEP</h1>

        <div className="containerInput">
        <input type="text" placeholder="Digite seu CEP"
        value={input} onChange={(e) => setInput(e.target.value)}/>

        <button className="buttonSearch" onClick={heandleSearch}>
          <FiSearch size={25} color="#fff"/>
        </button>
        </div>

        {Object.keys(cep).length > 0 && (
          <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>Logradouro: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade}</span>
          <span>Estado: {cep.uf}</span>
          <span>DDD: {cep.ddd}</span>
          
          </main>
        )}
      </div>
    </>
  );
}

export default App
