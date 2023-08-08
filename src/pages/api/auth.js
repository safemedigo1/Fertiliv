import nodemailer from "nodemailer";
import crypto from "crypto";

export default async function handler(req, res) {
  const { email } = req.body;

  // Generate a random OTP code
  const otp = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "majd.khaled87@gmail.com",
      pass: "uylpdgemqncigqez",
    },
  });

  // Send the OTP code via email
  try {
    await transporter.sendMail({
      from: "majd.khaled87@gmail.com",
      to: email,
      subject: "Your OTP code",
      text: `Your OTP code is ${otp}`,
    });
    res.status(200).json({ message: "OTP code sent successfully", otp: otp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send OTP code" });
  }
}
