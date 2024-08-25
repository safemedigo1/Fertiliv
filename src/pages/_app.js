import "../styles/globals.css";
import { Cairo, Quicksand } from "next/font/google";
import { appWithTranslation } from "next-i18next";
import { useRouter } from "next/router";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cairo = Cairo({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700"],
  style: ["normal"],
});

function App({ Component, pageProps }) {
  const { locale } = useRouter();

  return (
    <>
      <main
        // className={`${
        //   locale === "ar" ? cairo.className : quicksand.className
        // }`}

        className={`${cairo.className}`}
      >
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default appWithTranslation(App);
