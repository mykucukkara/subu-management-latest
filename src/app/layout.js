import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sakarya Uygulamalı Bilimler Üniversitesi",
  deScription: "Sakarya Uygulamalı Bilimler Üniversitesi",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <link href="/css/sb-admin-2.min.css" rel="stylesheet"></link>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link
        href="/vendor/fontawesome-free/css/all.min.css"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet"
      />

      <body className={inter.className}>{children}</body>
      <Script src="/vendor/jquery/jquery.min.js"></Script>
      <Script src="/vendor/bootstrap/js/bootstrap.bundle.min.js"></Script>

      <Script src="/vendor/jquery-easing/jquery.easing.min.js"></Script>

      <Script src="/js/sb-admin-2.min.js"></Script>
      <Script src="/vendor/chart.js/Chart.min.js"></Script>

      <Script src="/js/demo/chart-pie-demo.js"></Script>
      <Script src="/js/demo/chart-area-demo.js"></Script>
    </html>
  );
}
