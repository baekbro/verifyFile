import "./globals.css";
import Navbar from "@/components/Navbar";
export const metadata = { title: "DocVerify" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
