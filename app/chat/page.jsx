"use client";

import { useEffect, useState, useRef } from "react";
import { db, auth } from "@/src/lib/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  limit,
} from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import AuthButtons from "@/src/components/AuthButtons";
import MessageList from "@/src/components/MessageList";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState(null);
  const qRef = collection(db, "messages");
  const scrollRef = useRef(null);

  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged((u) => setUser(u));

    const q = query(qRef, orderBy("createdAt"), limit(200));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(list);
      // scroll to bottom
      setTimeout(
        () => scrollRef.current?.scrollIntoView({ behavior: "smooth" }),
        50
      );
    });

    return () => {
      unsub();
      unsubAuth();
    };
  }, [qRef]);

  const sendMessage = async () => {
    if (!text.trim()) return;
    const payload = {
      text: text.trim(),
      uid: user?.uid || null,
      displayName: user?.displayName || "Аноним",
      photoURL: user?.photoURL || null,
      createdAt: serverTimestamp(),
    };

    await addDoc(collection(db, "messages"), payload);
    setText("");
  };

  const signInGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-semibold">Чат</h1>
        <AuthButtons
          user={user}
          onSignIn={signInGoogle}
          onSignOut={signOutUser}
        />
      </header>

      <section className="flex-1 overflow-hidden">
        <div className="h-full border rounded p-4 bg-white shadow-sm flex flex-col">
          <div className="flex-1 overflow-auto">
            <MessageList messages={messages} />
            <div ref={scrollRef}></div>
          </div>

          <div className="mt-3 flex gap-2">
            <input
              className="flex-1 border rounded px-3 py-2"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={
                user
                  ? "Введите сообщение..."
                  : "Войдите, чтобы отправить сообщение"
              }
              disabled={!user}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={sendMessage}
              disabled={!user}
            >
              Отправить
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
