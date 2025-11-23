import Image from "next/image";

export function AuthButtons({ user, onSignIn, onSignOut }) {
  return (
    <div className="flex items-center gap-3">
      {user ? (
        <>
          <Image
            src={user.photoURL}
            alt="avatar"
            className="w-8 h-8 rounded-full"
            height="100"
            width="100"
          />
          <button
            onClick={onSignOut}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Выйти
          </button>
        </>
      ) : (
        <button
          onClick={onSignIn}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Войти через Google
        </button>
      )}
    </div>
  );
}
