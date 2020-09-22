import React, {useState} from 'react';
import './App.css';

function App() {
  const [estado, setEstado] = useState("Cadastro de Pessoas")
   
  const handleEstado = () => {
    setEstado("Mudei meu estado")
  }
  
  const handleVoltar = () => {
    setEstado("Cadastro de Pessoas")
  }  

  return (
  
    <div id="app">
      <header>
        <h1>{estado}</h1>
      </header>

      <input type="text" name="nome" placeholder="Digite seu nome" />
      <input type="email" name="email" placeholder="Digite seu e-mail" />
      <input type="tel" name="telefone" min="11" max="11" placeholder="Digite seu telefone" />
      <input type="text" name="endereco" placeholder="Digite seu endereço" />
      <button onClick={() => handleEstado()}>Cadastrar</button>
      <button onClick={() => handleVoltar()}>Voltar</button>

      <footer>
        <h3>Feito com s2</h3>
      </footer>
    </div>
  
  );
}

export default App;
