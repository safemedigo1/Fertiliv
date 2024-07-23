const nodemailer = require("nodemailer");
const password = process.env.PASS;

export default async function sendEmail(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const {
    fname,
    lname,
    email,
    phone,
    selectedForm_1,
    selectedForm_2,
    selectedDate,
    selectedTime,
    asp,
  } = req.body;
  if (
    !fname ||
    !lname ||
    !email ||
    !phone ||
    !selectedForm_1 ||
    !selectedForm_2
  ) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "fertiliv@gmail.com",
      pass: password,
      // user: "mohamedgk5@gmail.com",
      // pass: "imbe ksrv dcgk rzhg",
    },
  });

  const mailOptions = {
    from: "fertiliv@gmail.com",
    to: "fertiliv@gmail.com",
    // from: "mohamedgk5@gmail.com",
    // to: "mohamedgk5@gmail.com",
    subject: "New message from (Fertiliv)",
    text: `(Fertiliv) First name:${fname}\nLast name${lname}\nEmail: ${email}\nPhone Number: ${phone}\nI like to do : ${selectedForm_1}\nFor:${selectedForm_2}\nDate:${selectedDate}\nTime:${selectedTime}\nI Want As Soon As Possible:${asp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: `Something went wrong: ${error}` });
  }
}
