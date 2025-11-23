import { MessageList } from "./MessageList";

export function ChannelView({ messages, members, user, text, setText, send }) {
  return (
    <div className="flex flex-col flex-1 p-4">
      <div className="flex-1 overflow-auto">
        <MessageList messages={messages} />
      </div>

      <div className="mt-3 flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Введите сообщение..."
          disabled={!user}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={send}
          disabled={!user}
        >
          Отправить
        </button>
      </div>
    </div>
  );
}
