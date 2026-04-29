import { useState } from 'react';

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) { setError('Title cannot be empty'); return; }
    setSaving(true);
    try {
      await onUpdate(todo._id, { title: title.trim(), description: description.trim() });
      setIsEditing(false);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setTitle(todo.title);
    setDescription(todo.description || '');
    setError('');
    setIsEditing(false);
  };

  return (
    <div className={`bg-white rounded-2xl border shadow-sm px-5 py-4 transition-all duration-200 ${todo.done ? 'opacity-60 border-gray-100' : 'border-gray-100 hover:shadow-md'}`}>
      {isEditing ? (
        <div className="flex flex-col gap-2">
          {error && <p className="text-xs text-red-500">{error}</p>}
          <input
            value={title}
            onChange={(e) => { setTitle(e.target.value); setError(''); }}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            maxLength={200}
            autoFocus
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <div className="flex gap-2 mt-1">
            <button onClick={handleSave} disabled={saving}
              className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-3 py-1.5 transition disabled:opacity-60">
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button onClick={handleCancel}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg px-3 py-1.5 transition">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <button
            onClick={() => onToggle(todo._id)}
            className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition ${
              todo.done ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300 hover:border-indigo-400'
            }`}
            title={todo.done ? 'Mark as undone' : 'Mark as done'}
          >
            {todo.done && (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium text-gray-800 break-words ${todo.done ? 'line-through text-gray-400' : ''}`}>
              {todo.title}
            </p>
            {todo.description && (
              <p className={`text-xs mt-0.5 break-words ${todo.done ? 'text-gray-300' : 'text-gray-500'}`}>
                {todo.description}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-1 flex-shrink-0">
            <button onClick={() => setIsEditing(true)}
              className="text-gray-400 hover:text-indigo-600 p-1.5 rounded-lg hover:bg-indigo-50 transition"
              title="Edit">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </button>
            <button onClick={() => onDelete(todo._id)}
              className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition"
              title="Delete">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}