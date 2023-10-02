import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [columns, setColumns] = useState([
    { id: 'todo', title: 'A Fazer', cards: [] },
    { id: 'inProgress', title: 'Em Andamento', cards: [] },
    { id: 'done', title: 'Concluído', cards: [] },
  ]);

  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      const tasks = response.data;
      organizeTasksByColumns(tasks);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  const organizeTasksByColumns = (tasks) => {
    const tasksByColumn = { todo: [], inProgress: [], done: [] };

    tasks.forEach((task) => {
      tasksByColumn[task.column].push(task);
    });

    setColumns([
      { id: 'todo', title: 'A Fazer', cards: tasksByColumn.todo },
      { id: 'inProgress', title: 'Em Andamento', cards: tasksByColumn.inProgress },
      { id: 'done', title: 'Concluído', cards: tasksByColumn.done },
    ]);
  };

  const handleCardMove = async (card, sourceColumn, targetColumn) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${card.id}`, {
        column: targetColumn,
      });

      if (response.status === 200) {
        // Atualize as colunas após mover a tarefa
        const updatedColumns = [...columns];
        const sourceIndex = updatedColumns.findIndex((col) => col.id === sourceColumn);
        const targetIndex = updatedColumns.findIndex((col) => col.id === targetColumn);

        if (sourceIndex !== -1 && targetIndex !== -1) {
          updatedColumns[sourceIndex].cards = updatedColumns[sourceIndex].cards.filter((c) => c.id !== card.id);
          updatedColumns[targetIndex].cards.push(card);
          setColumns(updatedColumns);
        }
      }
    } catch (error) {
      console.error('Erro ao mover tarefa:', error);
    }
  };

  const handleAddTask = async () => {
    if (newTask.trim() === '') {
      console.error('O título da tarefa não pode estar vazio');
      return;
    }
  
    try {
      // Enviar a nova tarefa para o servidor
      const response = await axios.post('http://localhost:5000/api/tasks', {
        title: newTask,
        description: '',
        favorite: false,
        color: '',
        column: 'todo', // Defina a coluna padrão para 'A Fazer'
      });

      if (response && response.data) {
        // A resposta é válida e contém dados
        const createdTask = response.data;
        
        const updatedColumns = [...columns];
        updatedColumns[0].cards.push(createdTask); // Adicione a nova tarefa à coluna 'A Fazer'
        setColumns(updatedColumns);
        setNewTask('');
      } else {
        console.error('Resposta inválida ou sem dados.');
      }
    } catch (error) {
      console.error('Erro ao criar tarefa:', error.response.data.message || error.message);
    }
    
  };
  
  
  return (
    <div className="App">
      <h1>Lista De Tarefas</h1>
      <div className="board">
        {columns.map((column) => (
          <div key={column.id} className="column">
            <div className="column-header">{column.title}</div>
            {column.cards.map((card) => (
              <div key={card.id} className="card">
                {card.title}
                <div className="actions">
                  <button className='redButton' onClick={() => handleCardMove(card, column.id, 'todo')}>Mover para A Fazer</button>
                  <button className='yellowButton' onClick={() => handleCardMove(card, column.id, 'inProgress')}>Mover para Em Andamento</button>
                  <button className='greenButton' onClick={() => handleCardMove(card, column.id, 'done')}>Mover para Concluído</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="add-task">
        <input
          type="text"
          placeholder="Nova Tarefa"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Adicionar Tarefa</button>
      </div>
    </div>
  );
}

export default App;
