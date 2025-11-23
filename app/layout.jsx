import "@/src/styles/globals.css";

export const metadata = {
  title: "Realtime Chat",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="bg-slate-50 text-slate-900">
        <main className="max-w-3xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
