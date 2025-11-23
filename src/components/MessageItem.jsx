"use client";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

export default function MessageItem({ message }) {
  const time = message.createdAt?.toDate
    ? formatDistanceToNow(message.createdAt.toDate(), { addSuffix: true })
    : "";

  return (
    <div className="flex items-start gap-3">
      <Image
        src={message.photoURL || ""}
        alt="avatar"
        className="w-10 h-10 rounded-full"
        width="100"
        height="100"
      />
      <div>
        <div className="text-sm text-slate-600">{message.displayName}</div>
        <div className="bg-slate-100 px-3 py-2 rounded mt-1">
          {message.text}
        </div>
        <div className="text-xs text-slate-400 mt-1">{time}</div>
      </div>
    </div>
  );
}
