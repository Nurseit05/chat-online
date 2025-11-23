import { db } from "./firebase";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

// Create channel: create doc + add owner to members subcollection
export async function createChannel(name, user) {
  const ref = await addDoc(collection(db, "channels"), {
    name,
    ownerUid: user.uid,
    createdAt: serverTimestamp(),
  });

  // members subcollection
  await setDoc(doc(db, `channels/${ref.id}/members`, user.uid), {
    uid: user.uid,
    displayName: user.displayName || user.email,
    role: "owner",
    joinedAt: serverTimestamp(),
  });

  return ref.id;
}

export async function joinChannel(channelId, user) {
  await setDoc(doc(db, `channels/${channelId}/members`, user.uid), {
    uid: user.uid,
    displayName: user.displayName || user.email,
    role: "member",
    joinedAt: serverTimestamp(),
  });
}

export async function sendMessage(channelId, user, text) {
  if (!text || !text.trim()) return;
  await addDoc(collection(db, `channels/${channelId}/messages`), {
    text: text.trim(),
    uid: user.uid,
    displayName: user.displayName || user.email,
    photoURL: user.photoURL || null,
    createdAt: serverTimestamp(),
  });
}

export function subscribeMessages(channelId, cb) {
  const q = query(
    collection(db, `channels/${channelId}/messages`),
    orderBy("createdAt")
  );
  return onSnapshot(q, (snap) => {
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    cb(items);
  });
}

export function subscribeMembers(channelId, cb) {
  // members is a subcollection
  const q = query(
    collection(db, `channels/${channelId}/members`),
    orderBy("joinedAt")
  );
  return onSnapshot(q, (snap) =>
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  );
}

export async function removeMember(channelId, targetUid) {
  await deleteDoc(doc(db, `channels/${channelId}/members`, targetUid));
}

export async function getChannelsOnce() {
  const q = query(collection(db, "channels"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
