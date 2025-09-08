const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Better rate limiting with clear messages
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Increase to 10 requests per window
  message: {
    message: 'Too many contact form submissions from this IP, please try again after 15 minutes.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/send', limiter); // Apply only to the send endpoint

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify transporter
transporter.verify((error, success) => {
  if (error) {
    console.log('Error with transporter:', error);
  } else {
    console.log('Server is ready to take messages');
  }
});

// Contact form endpoint
app.post('/send', (req, res) => {
  const { name, email, message } = req.body;
  
  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  if (message.length < 10) {
    return res.status(400).json({ message: 'Message should be at least 10 characters long' });
  }
  
  // Email content
  const mailOptions = {
    from: email,
    to: process.env.CONTACT_EMAIL,
    subject: `Portfolio Contact Form: ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #2563eb;">${message}</p>
        <br>
        <p style="color: #64748b; font-size: 14px;">This message was sent from your portfolio contact form.</p>
      </div>
    `
  };
  
  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      return res.status(500).json({ message: 'Error sending message. Please try again later.' });
    } else {
      console.log('Email sent:', info.response);
      return res.status(200).json({ message: 'Message sent successfully!' });
    }
  });
});

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});