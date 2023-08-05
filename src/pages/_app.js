import "@/styles/globals.css";
import { Quicksand } from "next/font/google";
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
export default function App({ Component, pageProps }) {
  return (
    <main className={`${quicksand.className}`}>
      <Component {...pageProps} />
    </main>
  );
}
