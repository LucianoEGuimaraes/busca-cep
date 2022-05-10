import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./styles.css";
import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch(event) {
    event.preventDefault();
    if (input === "") {
      alert("Digite um CEP válido!");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("Ops! Erro ao tentar buscar o CEP!");
      setInput("");
    }
  }
  return (
    <div className="container">
      <h1 className="title">Busca CEP</h1>

      <div className="containerInput">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Digite o CEP "
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button type="submit" className="buttonSearch">
            <FiSearch size={24} color="#FFF" />
          </button>
        </form>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>Rua: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>
            Local: {cep.localidade} - UF: {cep.uf}
          </span>
          <span>IBGE: {cep.ibge}</span>
        </main>
      )}
    </div>
  );
}

export default App;
