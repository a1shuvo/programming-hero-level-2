import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.APP_URL!],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;

        const info = await transporter.sendMail({
          from: '"Prisma Blog" <prismablog@gmail.com>',
          to: user.email,
          subject: "Prisma Blog - Verify your email",
          html: `
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify your email</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f4f6f8;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
          Roboto, Helvetica, Arial, sans-serif;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 32px;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
      }

      .logo {
        text-align: center;
        margin-bottom: 24px;
      }

      .logo h1 {
        color: #0f172a;
        font-size: 24px;
        margin: 0;
      }

      .content h2 {
        color: #111827;
        font-size: 20px;
        margin-bottom: 12px;
      }

      .content p {
        color: #4b5563;
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 20px;
      }

      .button-wrapper {
        text-align: center;
        margin: 32px 0;
      }

      .verify-button {
        background-color: #2563eb;
        color: #ffffff !important;
        padding: 14px 28px;
        text-decoration: none;
        font-size: 16px;
        font-weight: 600;
        border-radius: 6px;
        display: inline-block;
      }

      .verify-button:hover {
        background-color: #1d4ed8;
      }

      .footer {
        margin-top: 32px;
        font-size: 14px;
        color: #6b7280;
        text-align: center;
      }

      .link {
        word-break: break-all;
        color: #2563eb;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <div style="padding: 24px">
      <div class="container">
        <div class="logo">
          <h1>Prisma Blog</h1>
        </div>

        <div class="content">
          <h2>Verify your email address</h2>

          <p>
            Thanks for signing up for <strong>Prisma Blog</strong>!  
            Please confirm your email address by clicking the button below.
          </p>

          <div class="button-wrapper">
            <a
              href="{${verificationUrl}}"
              target="_blank"
              class="verify-button"
            >
              Verify Email
            </a>
          </div>

          <p>
            If the button doesn't work, copy and paste this link into your
            browser:
          </p>

          <p class="link">{${verificationUrl}}</p>

          <p>
            This verification link will expire in <strong>24 hours</strong>.
            If you didn't create an account, you can safely ignore this email.
          </p>
        </div>

        <div class="footer">
          © ${new Date().getFullYear()} Prisma Blog. All rights reserved.
        </div>

      </div>
    </div>
  </body>
</html>
        `, // HTML version of the message
        });
      } catch (error) {
        console.error("Error sending email:", error);
        throw error;
      }
    },
  },

  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
