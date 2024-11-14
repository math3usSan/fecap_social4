import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tela, setTela] = useState('login'); // essa parte fica 
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
    } catch (error) {
      setMensagem('Usuário ou senha incorretos. Tente novamente.');
    }
  };

  const alternarTela = () => {
    setTela(tela === 'login' ? 'cadastro' : 'login');
    setUsuario(''); // Limpa o campo de usuário
    setSenha('');   // Limpa o campo de senha
    setMensagem(''); // Limpa mensagens anteriores
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
        {tela === 'login' ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
      </button>
    </div>
  );
}

export default App;
