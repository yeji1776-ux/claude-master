import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "클로드 마스터 - AI 활용 100가지 팁",
  description: "GGANGLAB의 클로드 활용 100가지 팁을 8주 커리큘럼으로 마스터하세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-dvh font-sans antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
