import "../styles/globals.scss";
import { Tajawal, Quicksand } from "next/font/google";
import { appWithTranslation, useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import PhoneInput from "react-phone-input-2";
import { Button } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";
import toast from "react-hot-toast";
import "../styles/content-styles.css";

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
  const { t } = useTranslation();
  const { locale } = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [updatedFormData, setUpdatedFormData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNum, setPhoneNum] = useState("");
  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    phone: "",
  });

  // Update form data when phone number or form changes
  useEffect(() => {
    setUpdatedFormData({ ...formData, phone: phoneNum });
  }, [formData, phoneNum]);

  // Ensure the popup only shows once after 25 seconds on the first visit
  useEffect(() => {
    // Show the popup after 10 seconds
    const showPopupTimer = setTimeout(() => {
      setShowPopup(true);

      const hidePopupTimer = setTimeout(() => {
        setShowPopup(false);
      }, 10000); // 10 seconds to hide the popup

      // Clean up the hide timer when component unmounts
      return () => clearTimeout(hidePopupTimer);
    }, 10000); // 10 seconds to show the popup

    // Clean up the show timer when component unmounts
    return () => clearTimeout(showPopupTimer);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (updatedFormData) {
      toast.promise(
        fetch("/api/SendOffer", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...updatedFormData,
          }),
        })
          .then(async (response) => {
            const data = await response.text();
            setIsLoading(false);
            if (response.ok) {
              setShowPopup(false); // Close the popup on success
            } else {
              console.error("Request failed with status:", response.status);
              throw new Error(data);
            }
          })
          .catch((error) => {
            setIsLoading(false);
            console.error("Request failed:", error);
            throw error;
          }),
        {
          loading: "Processing...",
          success: (
            <b>
              Your consultation request has been submitted successfully. Thank
              you!
            </b>
          ),
          error: <b>Failed to send, please try again later.</b>,
        }
      );
    }
  };

  const handleChangeForm = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangePhone = (newPhoneVal) => {
    setPhoneNum(newPhoneVal);
  };

  console.log(tajawal, "tajawal");

  return (
    <>
      <main
        dir={locale === "ar" ? "rtl" : "ltr"}
        className={` ${
          locale === "ar" ? tajawal.style.fontFamily : quicksand.className
        }`}
      >
        <Component {...pageProps} />
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="card_container"
          >
            <div className="content_container">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="input_container"
              >
                <div className="text_container">
                  <h5>
                    {t("common:offer1")} <br /> {t("common:offer2")}
                  </h5>

                  <p>{t("common:offer3")}</p>
                </div>

                <div className="mobile">
                  <div className="img_container">
                    <img src="/assets/imgs/offer.png" />
                  </div>
                </div>

                <form onSubmit={handleSubmit} dir="ltr">
                  <div className={"name"}>
                    <input
                      type="text"
                      placeholder="Your Name"
                      name="fname"
                      value={formData.fname}
                      onChange={handleChangeForm}
                      required
                    />
                  </div>

                  <div className={"phone"} dir="ltr">
                    <PhoneInput
                      countryCodeEditable={false}
                      country="tr"
                      value={phoneNum}
                      enableLongNumbers={true}
                      onChange={handleChangePhone}
                      inputProps={{
                        name: "phone",
                        required: true,
                      }}
                    />
                  </div>

                  <div className={"email"}>
                    <input
                      type="email"
                      placeholder="E-mail"
                      name="email"
                      value={formData.email}
                      onChange={handleChangeForm}
                      required
                    />
                  </div>
                </form>
                <div className={"subBtn"} onClick={handleSubmit}>
                  <Button>
                    {isLoading ? (
                      <ThreeDots
                        height="25"
                        width="25"
                        radius="9"
                        color="#707070"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName="load_more_btn"
                        visible={true}
                      />
                    ) : (
                      t("why_feriliv:submit")
                    )}
                  </Button>
                </div>
              </motion.div>

              <div className="desktop">
                <div className="img_container">
                  <img src="/assets/imgs/offer.png" />
                </div>
              </div>

              <div className="close_btn" onClick={() => setShowPopup(false)}>
                <CloseIcon />
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </>
  );
}

export default appWithTranslation(App);
