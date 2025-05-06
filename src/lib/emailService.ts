import nodemailer from 'nodemailer';

// Create transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your preferred email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD // Use app-specific password for Gmail
  }
});

// Email template for OTP
const createOTPEmailTemplate = (otp: string) => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Email Verification</h2>
        <p>Your verification code is:</p>
        <h1 style="color: #4F46E5; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
        <p>This code will expire in 5 minutes.</p>
        <p>If you didn't request this code, please ignore this email.</p>
      </div>
    `;
  };
  
  // Send OTP email function
  export const sendOTPEmail = async (email: string, otp: string) => {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification Code',
        html: createOTPEmailTemplate(otp)
      };
  
      const info = await transporter.sendMail(mailOptions);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };