// server/index.js
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.post('/api/send', async (req, res) => {
  const { subject, body } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,      // из .env
      pass: process.env.EMAIL_PASS       // из .env
    }
  });

  try {
    await transporter.sendMail({
      from: `"Sophia Massage" <${process.env.EMAIL_USER}>`,
      to: 'salon.massge.sofia@gmail.com',
      subject,
      text: body,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('❌ Ошибка при отправке письма:\n', error.message, '\n', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
