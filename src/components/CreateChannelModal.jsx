export function CreateChannelModal({ open, onClose, onCreate }) {
  const [name, setName] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-5 rounded shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-3">Создать канал</h2>
        <input
          className="border w-full px-3 py-2 rounded"
          placeholder="Название канала"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-3 py-1 bg-gray-300 rounded">
            Отмена
          </button>
          <button
            onClick={() => {
              if (!name.trim()) return;
              onCreate(name);
              setName("");
            }}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Создать
          </button>
        </div>
      </div>
    </div>
  );
}
