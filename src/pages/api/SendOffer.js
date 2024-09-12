const nodemailer = require("nodemailer");
const password = process.env.PASS;
export default async function sendEmail(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { fname, email, phone } = req.body;

  console.log("Received body:", req.body); // Log the request body

  if (!fname || !email || !phone) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "Fertiliv@gmail.com",
      pass: password,
    },
  });

  const mailOptions = {
    from: "Fertiliv@gmail.com",
    to: "Fertiliv@gmail.com",
    subject: "New message from (Fertiliv)",
    text: `(Fertiliv)=> Name:${fname}\nEmail: ${email}\nPhone Number: ${phone}\nI `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: `Something went wrong: ${error}` });
  }
}
