import { useState, useEffect, useCallback } from 'react';
import * as api from './api/todos';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

//Toast component
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white transition-all duration-300 animate-[fadeIn_0.2s_ease-in] ${type === 'success' ? 'bg-green-500' : 'bg-red-500'
      }`}>
      {type === 'success' ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
      {message}
    </div>
  );
}

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => setToast({ message, type });

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
    setTodos((prev) => [data, ...prev]);
    showToast('Task added!');
  };

  const handleToggle = async (id) => {
    setTodos((prev) => prev.map((t) => t._id === id ? { ...t, done: !t.done } : t));
    try {
      const { data } = await api.toggleDone(id);
      setTodos((prev) => prev.map((t) => t._id === id ? data : t));
    } catch {
      setTodos((prev) => prev.map((t) => t._id === id ? { ...t, done: !t.done } : t));
      showToast('Failed to update task', 'error');
    }
  };

  const handleUpdate = async (id, updatedData) => {
    const { data } = await api.updateTodo(id, updatedData);
    setTodos((prev) => prev.map((t) => t._id === id ? data : t));
    showToast('Task updated!');
  };

  const handleDelete = async (id) => {
    setTodos((prev) => prev.filter((t) => t._id !== id));
    try {
      await api.deleteTodo(id);
      showToast('Task deleted!');
    } catch {
      loadTodos();
      showToast('Failed to delete task', 'error');
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
      {/* Toast notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}