import "../styles/globals.css";
import { Quicksand } from "next/font/google";
import { MyContextProvider } from "../../context/MyContext";
import { appWithTranslation } from "next-i18next";
import NoSsr from "@mui/base/NoSsr";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

function App({ Component, pageProps }) {
  return (
    <div>
      <NoSsr>
        <main className={`${quicksand.className}`}>
          <Component {...pageProps} />
        </main>
      </NoSsr>
    </div>
  );
}

export default appWithTranslation(App);
