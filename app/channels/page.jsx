"use client";
import { useEffect, useState } from "react";
import { auth } from "@/src/lib/firebase";
import { createChannel } from "@/src/lib/chatService";
import { AuthButtons } from "@/src/components/AuthButtons";
import { ChannelsList } from "@/src/components/ChannelsList";

export default function ChannelsPage() {
  const [user, setUser] = useState(null);
  const [channels, setChannels] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    // simple polling/subscribe channels via firestore directly here if needed
    // For brevity, use client-side fetch or implement subscribe in chatService
  }, []);

  const handleCreate = async () => {
    if (!user) return alert("Войдите");
    if (!name.trim()) return;
    const id = await createChannel(name.trim(), user);
    setName("");
    // redirect to channel page
    window.location.href = `/channels/${id}`;
  };

  return (
    <div className="flex gap-6">
      <div className="w-2/5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Каналы</h2>
          <AuthButtons user={user} />
        </div>

        <div className="mb-4">
          <input
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Название канала"
          />
          <button
            className="mt-2 px-3 py-2 bg-blue-600 text-white rounded"
            onClick={handleCreate}
          >
            Создать канал
          </button>
        </div>

        <ChannelsList channels={channels} />
      </div>

      <div className="flex-1">
        <div className="p-6 bg-white rounded shadow">
          Выбери канал слева или создай новый
        </div>
      </div>
    </div>
  );
}
