import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tela, setTela] = useState('login');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const fazerCadastro = async () => {
    try {
      const resposta = await axios.post('http://localhost:5000/cadastro', {
        usuario,
        senha,
      });
      setMensagem('Usuário cadastrado com sucesso!');
    } catch (error) {
      setMensagem('Usuário já cadastrado. Tente novamente.');
    }
  };

  const fazerLogin = async () => {
    try {
      const resposta = await axios.post('http://localhost:5000/login', {
        usuario,
        senha,
      });
      setMensagem('Login bem-sucedido!');
      // leva o usuario ate a pagina home do site
      window.location.href = 'http://127.0.0.1:5500/doar.html#home';
    } catch (error) {
      setMensagem('Usuário ou senha incorretos. Tente novamente.');
    }
  };

  const alternarTela = () => {
    setTela(tela === 'login' ? 'cadastro' : 'login'); // reseta os valores dos inputs, depois do usuario se cadastrar
    setUsuario(''); 
    setSenha('');   
    setMensagem(''); 
  };

  return (
    <div className="App">
      <h1>{tela === 'login' ? 'Login' : 'Cadastro'}</h1>
      <div>
        <input
          type="text"
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button
          onClick={tela === 'login' ? fazerLogin : fazerCadastro}
        >
          {tela === 'login' ? 'Entrar' : 'Cadastrar'}
        </button>
      </div>
      <p>{mensagem}</p>
      <button onClick={alternarTela}>
        {tela === 'login' ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça o login'}
      </button>
    </div>
  );
}

export default App;
