export function ChannelsList({ channels = [], currentChannel, onSelect }) {
  return (
    <div className="border-r w-64 p-3 bg-gray-50 overflow-auto">
      <h2 className="font-semibold mb-3">Каналы</h2>
      <ul className="space-y-2">
        {channels.map((c) => (
          <li
            key={c.id}
            onClick={() => onSelect(c)}
            className={`p-2 rounded cursor-pointer ${
              currentChannel?.id === c.id ? "bg-blue-100" : "hover:bg-gray-200"
            }`}
          >
            #{c.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
