import "@/src/styles/globals.css";

export const metadata = { title: "Realtime Chat" };

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <main className="max-w-5xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
