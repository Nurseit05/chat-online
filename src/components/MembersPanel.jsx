export function MembersPanel({ members, onRemove, isOwner }) {
  return (
    <div className="border-l w-64 p-3 bg-gray-50 overflow-auto">
      <h2 className="font-semibold mb-3">Участники</h2>
      <ul className="space-y-2">
        {members.map((m) => (
          <li key={m.uid} className="flex justify-between items-center p-2">
            <span>{m.displayName}</span>
            {isOwner && (
              <button onClick={() => onRemove(m.uid)} className="text-red-600">
                удалить
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
