import React, {useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() =>{
     api.get('repositories').then(repository => {
      setRepositories(repository.data);
    })
  }, [])

  async function handleAddRepository() {
 
   const response = await api.post('repositories', {
    "title": "Desafio teste",
    "url": "https://github.com/JefferssonSemin/desafio-conceitos-node.git",
    "techs": ["nodejs", "reactjs"]
   });

   setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
   await api.delete(`repositories/${id}`);
  
   const repository = repositories.filter(repository => repository.id !== id)
   setRepositories(repository)
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
