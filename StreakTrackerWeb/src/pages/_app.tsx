import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}
