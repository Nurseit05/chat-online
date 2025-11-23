import { MessageItem } from "./MessageItem";

export function MessageList({ messages }) {
  return (
    <ul className="space-y-3">
      {messages.map((m) => (
        <MessageItem key={m.id} message={m} />
      ))}
    </ul>
  );
}
