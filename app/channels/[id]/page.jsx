"use client";
import { useEffect, useRef, useState } from "react";
import { auth } from "@/src/lib/firebase";
import {
  subscribeMessages,
  subscribeMembers,
  sendMessage,
  joinChannel,
} from "@/src/lib/chatService";
import { MessageList } from "@/src/components/MessageList";
import { MembersPanel } from "@/src/components/MembersPanel";

export default function ChannelPage({ params }) {
  const { id } = params;
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged(async (u) => {
      setUser(u);
      if (u) {
        await joinChannel(id, u);
      }
    });

    const unsubMsgs = subscribeMessages(id, setMessages);
    const unsubMembers = subscribeMembers(id, setMembers);

    return () => {
      unsubAuth();
      unsubMsgs();
      unsubMembers();
    };
  }, [id]);
  useEffect(() => {
    setTimeout(
      () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
      50
    );
  }, [messages]);

  const handleSend = async () => {
    if (!user) return alert("Войдите");
    if (!text.trim()) return;
    await sendMessage(id, user, text);
    setText("");
  };

  return (
    <div className="flex gap-6 h-screen">
      <div className="flex-1 flex flex-col bg-white rounded shadow p-4">
        <div className="flex-1 overflow-auto">
          <MessageList messages={messages} />
          <div ref={bottomRef} />
        </div>

        <div className="mt-3 flex gap-2">
          <input
            className="flex-1 border rounded px-3 py-2"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleSend}
          >
            Отправить
          </button>
        </div>
      </div>

      <div className="w-80">
        <MembersPanel members={members} currentUser={user} channelId={id} />
      </div>
    </div>
  );
}
