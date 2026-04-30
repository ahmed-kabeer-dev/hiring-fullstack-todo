import axios from 'axios';

const BASE = '/api/todos';

export const fetchTodos = () => axios.get(BASE);
export const createTodo = (data) => axios.post(BASE, data);
export const updateTodo = (id, data) => axios.put(`${BASE}/${id}`, data);
export const toggleDone = (id) => axios.patch(`${BASE}/${id}/done`);
export const deleteTodo = (id) => axios.delete(`${BASE}/${id}`);