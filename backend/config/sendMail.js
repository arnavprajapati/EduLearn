import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = createTransport({
    service: "gmail", // or host: "smtp.gmail.com"
    auth: {
        user: process.env.USER_GMAIL,
        pass: process.env.USER_PASSWORD,
    },
});

const sendMail = async (to, otp) => {
    try {
        await transporter.sendMail({
            from: process.env.USER_GMAIL,
            to,
            subject: "Reset Your Password",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                    <h2 style="text-align: center; color: #333;">Password Reset Request</h2>
                    <p style="text-align: center; font-size: 16px; color: #555;">Your One-Time Password (OTP) for resetting your password is:</p>
                    <div style="background-color: #f0f0f0; border-left: 5px solid #007bff; padding: 15px; text-align: center; margin: 20px 0;">
                        <p style="margin: 0; font-size: 24px; font-weight: bold; color: #007bff;">${otp}</p>
                    </div>
                    <p style="text-align: center; font-size: 14px; color: #888;">This code will expire in 5 minutes.</p>
                    <p style="text-align: center; font-size: 14px; color: #888;">If you did not request this, please ignore this email.</p>
                </div>
            `
        });
        console.log("Email sent successfully to:", to);
    } catch (error) {
        console.error("Failed to send email:", error);
    }
};

export default sendMail;
