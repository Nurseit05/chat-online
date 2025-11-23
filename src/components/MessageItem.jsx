import Image from "next/image";

export function MessageItem({ message }) {
  return (
    <li className="flex gap-3">
      {message.photoURL && (
        <Image
          height="100"
          width="100"
          alt=""
          src={message.photoURL}
          className="w-10 h-10 rounded-full"
        />
      )}
      <div>
        <div className="font-semibold">{message.displayName}</div>
        <div>{message.text}</div>
      </div>
    </li>
  );
}
