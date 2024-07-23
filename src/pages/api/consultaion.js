const nodemailer = require("nodemailer");
const password = process.env.PASS;

export default async function consultaion(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { fname, lname, email, phone, text } = req.body;
  if (!fname || !lname || !email || !phone || !text) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "fertiliv@gmail.com",
      pass: password,
    },
  });

  const mailOptions = {
    from: "fertiliv@gmail.com",
    to: "fertiliv@gmail.com",
    subject: "New message from (Fertiliv)",
    text: `(Fertiliv)=> First name:${fname}\nLast name${lname}\nEmail: ${email}\nPhone Number: ${phone}\nI \nFor:${text}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
}
