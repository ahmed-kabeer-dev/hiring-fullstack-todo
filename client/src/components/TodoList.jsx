import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle, onUpdate, onDelete }) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-4xl mb-3">✓</p>
        <p className="text-sm">No tasks yet. Add one above!</p>
      </div>
    );
  }

  const pending = todos.filter((t) => !t.done);
  const done = todos.filter((t) => t.done);
  const percent = Math.round((done.length / todos.length) * 100);

  return (
    <div className="flex flex-col gap-3">
      {/* Progress bar */}
      <div className="mb-1">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Progress</span>
          <span>{percent}%</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
      {pending.map((todo) => (
        <TodoItem key={todo._id} todo={todo} onToggle={onToggle} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
      {done.length > 0 && pending.length > 0 && (
        <div className="flex items-center gap-2 my-1">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-400">Completed ({done.length})</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>
      )}
      {done.map((todo) => (
        <TodoItem key={todo._id} todo={todo} onToggle={onToggle} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}