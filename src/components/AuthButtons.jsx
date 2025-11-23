"use client";

import Image from "next/image";

export default function AuthButtons({ user, onSignIn, onSignOut }) {
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <button className="px-3 py-1 border rounded" onClick={onSignIn}>
          Войти с Google
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Image
        src={user.photoURL || ""}
        alt="avatar"
        className="w-8 h-8 rounded-full"
        width="100"
        height="100"
      />
      <span className="font-medium">{user.displayName || user.email}</span>
      <button className="px-3 py-1 border rounded" onClick={onSignOut}>
        Выйти
      </button>
    </div>
  );
}
