import React, {useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  // Utilizado o "componentDidUpdate" para realizar a atualização simultânea assim que o repositories sofrer alteração.
  useEffect(() =>{
     api.get('repositories').then(repository => {
      setRepositories(repository.data);
    })
  }, [repositories])

  async function handleAddRepository() {
  // Poderia montar um objeto e por no lugar do JSON, daria pra fazer de diversas maneiras.
  // Poderia tratar o retorno do request, porém deixei conforme pediu o teste.

   await api.post('repositories', {
    "title": "Desafio teste",
    "url": "https://github.com/JefferssonSemin/desafio-conceitos-node.git",
    "techs": ["nodejs", "reactjs"]
   });
  }

  async function handleRemoveRepository(id) {
  // Poderia tratar o retorno do request, porém deixei conforme pediu o teste.
    await api.delete(`repositories/${id}`);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => 
        <li key={repo.id}>
        {repo.title}
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
        )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
