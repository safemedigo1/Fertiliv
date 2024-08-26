import "../styles/globals.css";
import { Tajawal, Quicksand } from "next/font/google";
import { appWithTranslation } from "next-i18next";
import { useRouter } from "next/router";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const tajawal = Tajawal({
  subsets: ["latin"],
  weight: ["200", "300", "400", "700"],
  style: ["normal"],
});

function App({ Component, pageProps }) {
  const { locale } = useRouter();

  return (
    <>
      <main
        dir={locale === "ar" ? "rtl" : "ltr"}
        className={`${
          locale === "ar" ? tajawal.className : quicksand.className
        }`}
      >
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default appWithTranslation(App);
