import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, firstName, lastName, walletAddress, contributionAmount, confirmationCode } = req.body;

    if (!email || !firstName || !lastName || !walletAddress || !contributionAmount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const transporter = nodemailer.createTransport({
        host: "mail.privateemail.com",
        port: 465,
        secure: true,
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
              padding: 30px;
              background-color: #121212;
              border-radius: 8px;
              border: 1px solid rgba(168, 85, 247, 0.3);
            }
            .logo {
              text-align: center;
              margin-bottom: 20px;
            }
            h1 { 
              color: #FFFFFF; 
              font-size: 24px;
              margin-bottom: 20px;
              text-align: center;
              background: linear-gradient(to right, #A855F7, #22D3EE);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            .confirmation-code {
              font-size: 32px;
              font-weight: bold;
              text-align: center;
              color: #22D3EE;
              letter-spacing: 5px;
              margin: 30px 0;
              padding: 15px;
              background-color: rgba(168, 85, 247, 0.1);
              border-radius: 4px;
            }
            .details {
              background-color: rgba(255, 255, 255, 0.05);
              border-radius: 8px;
              padding: 20px;
              margin: 30px 0;
            }
            .details-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
              padding-bottom: 10px;
              border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            .details-row:last-child {
              border-bottom: none;
            }
            .details-label {
              color: #A855F7;
              font-weight: bold;
            }
            .details-value {
              color: #FFFFFF;
              word-break: break-all;
            }
            p {
              margin-bottom: 15px;
              line-height: 1.6;
            }
            .footer { 
              margin-top: 40px; 
              font-size: 12px; 
              color: #888;
              text-align: center;
              padding-top: 20px;
              border-top: 1px solid rgba(255, 255, 255, 0.1);
            }
            .button {
              display: block;
              width: 200px;
              margin: 30px auto;
              padding: 15px 25px;
              background: linear-gradient(to right, #A855F7, #22D3EE);
              color: white;
              text-align: center;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">
              <!-- Logo here if you have one -->
              <img src="https://bafybeiheg6ibmqmsi4ipxdqxlpafpf6gvaxgtjmgfxs2flte7yh4rw62qa.ipfs.w3s.link/soleer.png" alt="Soleer Logo" width="120" height="120" style="max-width: 100%;">
            </div>
            
            <h1>Soleer Whitelist Confirmation</h1>
            
            <p>Hello ${firstName} ${lastName},</p>
            
            <p>Thank you for registering for the Soleer public sale whitelist! Your registration has been received and is being processed.</p>
            
            <p>Here is your confirmation code:</p>
            
            <div class="confirmation-code">${confirmationCode}</div>
            
            <div class="details">
              <div class="details-row">
                <span class="details-label">Name: </span>
                <span class="details-value">${firstName} ${lastName}</span>
              </div>
              <div class="details-row">
                <span class="details-label">Email: </span>
                <span class="details-value">${email}</span>
              </div>
              <div class="details-row">
                <span class="details-label">Wallet Address: </span>
                <span class="details-value">${walletAddress}</span>
              </div>
              <div class="details-row">
                <span class="details-label">Contribution Amount: </span>
                <span class="details-value">${contributionAmount} SOL</span>
              </div>
            </div>
            
            <p>Please keep this confirmation for your records. We will notify you before the public sale begins with instructions on how to participate.</p>
            
            <a href="https://soleer.xyz/dashboard" class="button">Visit Dashboard</a>
            
            <p>If you have any questions or need assistance, please contact our support team at <a href="mailto:founder@soleer.xyz" style="color: #22D3EE;">founder@soleer.xyz</a>.</p>
            
            <div class="footer">
              <p>This message was sent to ${email}</p>
              <p>&copy; ${new Date().getFullYear()} Soleer Labs. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
      `;

      await transporter.sendMail({
        from: "founder@soleer.xyz",
        to: email,
        subject: "Soleer Whitelist Registration Confirmation",
        html: htmlContent,
      });

      res.status(200).json({ message: "Confirmation email sent successfully" });
    } catch (error) {
      console.error("Error sending confirmation email:", error);
      res.status(500).json({ message: "Error sending confirmation email" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}