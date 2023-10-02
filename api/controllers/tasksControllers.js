const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'todo_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const getAllTasks = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tasks');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
};

const createTask = async (req, res) => {
  const taskData = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO tasks (title, description, favorite, color) VALUES (?, ?, ?, ?)',
      [taskData.title, taskData.description, taskData.favorite, taskData.color]
    );
    const createdTask = { id: result.insertId, ...taskData };
    res.status(201).json(createdTask);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
};

const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const taskData = req.body;
  try {
    await db.query('UPDATE tasks SET favorite = ? WHERE id = ?', [
      taskData.favorite,
      taskId,
    ]);
    res.json({ message: 'Tarefa atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
};

const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    await db.query('DELETE FROM tasks WHERE id = ?', [taskId]);
    res.json({ message: 'Tarefa excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error);
    res.status(500).json({ error: 'Erro ao excluir tarefa' });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
