"use client";
import MessageItem from "./MessageItem";

export default function MessageList({ messages }) {
  return (
    <div className="space-y-3">
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}
    </div>
  );
}
