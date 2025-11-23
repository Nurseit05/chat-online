"use client";

import { useEffect, useState, useRef } from "react";
import { db, auth } from "@/src/lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";

export const useAuth = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const qRef = collection(db, "messages");
  const scrollRef = useRef(null);

  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged((u) => setUser(u));

    const q = query(qRef, orderBy("createdAt"), limit(200));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(list);
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

  const signInGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  return {
    signInGoogle,
    signOutUser,
  };
};
