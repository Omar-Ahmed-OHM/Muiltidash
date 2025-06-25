import Container from "@/app/components/Container";
import Sidebar from "@/app/components/dashboard/Sidebar";
import Topbar from "@/app/components/dashboard/Topbar";
import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hoor-Book ",
  description: "أفضل تجربة عربية بخط جميل",
 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
        
      <body className={`${tajawal.variable} font-sans antialiased`}>
    <div className="flex-row">
      <div className="flex-1 ml-0 mr-64 bg-gradient-to-br from-purple-50 to-orange-50 min-h-screen">
        <Topbar />
        <main className="pt-20 p-6 w-full" >{children}</main>
      </div>
      <Sidebar />
    </div>
      </body>
    </html>
  );
}
