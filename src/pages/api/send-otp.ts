import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    try {
      const transporter = nodemailer.createTransport({
        host: "mail.privateemail.com",
        port: 465,
        auth: {
          user: "founder@soleer.xyz",
          pass: "@#possibilities",
        },
      });

      const htmlContent = `
      <html>
        <head>
          <style>
            body { 
              font-family: Arial, sans-serif;
              background-color: #000000;
              color: #FFFFFF;
              margin: 0;
              padding: 20px;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
            }
            h1 { 
              color: #FFFFFF; 
              font-size: 24px;
              margin-bottom: 20px;
            }
            .otp-code {
              font-size: 32px;
              font-weight: bold;
              color: #3498db;
              letter-spacing: 5px;
              margin: 30px 0;
            }
            p {
              margin-bottom: 15px;
            }
            .footer { 
              margin-top: 30px; 
              font-size: 12px; 
              color: #888;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Email Verification Code</h1>
            
            <p>Hi there,</p>
            
            <p>Here is your verification code:</p>
            
            <div class="otp-code">${otp}</div>
            
            <p>This code will expire in 5 minutes.</p>
            <p>If you didn't request this code, please ignore this email.</p>
            
            <div class="footer">
              <p>This message was sent to ${email}</p>
              <p>&copy; ${new Date().getFullYear()} Soleer Labs. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
      `;

      await transporter.sendMail({
        from: "founder@soleer.xyz", // Replace with your email
        to: email,
        subject: "Your Verification Code",
        html: htmlContent,
      });

      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Error sending email" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}