import "@/styles/globals.css";
import { Quicksand } from "next/font/google";
import { MyContextProvider } from "../../context/MyContext";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
export default function App({ Component, pageProps }) {
  return (
    <MyContextProvider>
      <main className={`${quicksand.className}`}>
        <Component {...pageProps} />
      </main>
    </MyContextProvider>
  );
}
