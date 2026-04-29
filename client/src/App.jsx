import { useState, useEffect, useCallback } from 'react';
import * as api from './api/todos';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTodos = useCallback(async () => {
    try {
      const { data } = await api.fetchTodos();
      setTodos(data);
    } catch {
      setError('Failed to load todos. Is the server running?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadTodos(); }, [loadTodos]);

  const handleAdd = async (todoData) => {
    const { data } = await api.createTodo(todoData);
    // Optimistic-style: prepend immediately
    setTodos((prev) => [data, ...prev]);
  };

  const handleToggle = async (id) => {
    // Optimistic update
    setTodos((prev) => prev.map((t) => t._id === id ? { ...t, done: !t.done } : t));
    try {
      const { data } = await api.toggleDone(id);
      setTodos((prev) => prev.map((t) => t._id === id ? data : t));
    } catch {
      // Revert on failure
      setTodos((prev) => prev.map((t) => t._id === id ? { ...t, done: !t.done } : t));
    }
  };

  const handleUpdate = async (id, updatedData) => {
    const { data } = await api.updateTodo(id, updatedData);
    setTodos((prev) => prev.map((t) => t._id === id ? data : t));
  };

  const handleDelete = async (id) => {
    // Optimistic update
    setTodos((prev) => prev.filter((t) => t._id !== id));
    try {
      await api.deleteTodo(id);
    } catch {
      // Revert on failure
      loadTodos();
    }
  };

  const pendingCount = todos.filter((t) => !t.done).length;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
          {!loading && (
            <p className="text-sm text-gray-500 mt-1">
              {pendingCount === 0 ? 'All done!' : `${pendingCount} task${pendingCount !== 1 ? 's' : ''} remaining`}
            </p>
          )}
        </div>

        <TodoForm onAdd={handleAdd} />

        {loading && (
          <div className="text-center py-10 text-gray-400 text-sm animate-pulse">
            Loading tasks…
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-6 text-sm text-red-500 bg-red-50 border border-red-100 rounded-2xl px-4">
            {error}
            <button onClick={loadTodos} className="block mx-auto mt-2 text-indigo-600 hover:underline text-xs">
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <TodoList
            todos={todos}
            onToggle={handleToggle}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}