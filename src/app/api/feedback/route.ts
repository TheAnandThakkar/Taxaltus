import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
    try {
        const { name, email, type, message } = await request.json();

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        // Configure Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: Number(process.env.SMTP_PORT) || 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Check if SMTP credentials are fully configured
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.CONTACT_EMAIL) {
            console.warn("SMTP credentials not configured. Logging feedback instead of sending email.");
            console.log("Feedback received:", { name, email, type, message });
            // We will still return success true so the UI functions as expected without errors
            // In production the dev will configure their SMTP creds
        } else {
            const feedbackTypeText = type.charAt(0).toUpperCase() + type.slice(1);
            const subjectName = name || "Anonymous User";
            const subject = `Taxaltus ${feedbackTypeText} Feedback from ${subjectName}`;

            // Professional HTML Email structure
            const htmlContent = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fbfd; border-radius: 8px; border: 1px solid #e2e8f0;">
          <div style="text-align: center; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 2px solid #14b8a6;">
            <h1 style="color: #0f172a; margin: 0; font-size: 24px;">New Feedback Received</h1>
            <p style="color: #64748b; margin: 8px 0 0 0; font-size: 14px;">via Taxaltus Platform</p>
          </div>
          
          <div style="background-color: white; padding: 24px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); margin-bottom: 24px;">
            <div style="display: flex; margin-bottom: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 16px;">
              <div style="width: 50%;">
                <p style="margin: 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: bold;">Sender</p>
                <p style="margin: 4px 0 0 0; font-size: 16px; color: #0f172a; font-weight: 500;">${name || 'Anonymous'}</p>
              </div>
              <div style="width: 50%;">
                <p style="margin: 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: bold;">Email</p>
                <p style="margin: 4px 0 0 0; font-size: 16px; color: #0f172a;"><a href="mailto:${email}" style="color: #14b8a6; text-decoration: none;">${email || 'Not Provided'}</a></p>
              </div>
            </div>
            
            <div style="margin-bottom: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 16px;">
              <p style="margin: 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: bold;">Feedback Type</p>
              <p style="margin: 4px 0 0 0; font-size: 16px; color: #0f172a; display: inline-block; padding: 4px 12px; background-color: ${type === 'mistake' ? '#fef2f2' : type === 'suggestion' ? '#f0fdf4' : '#f8fafc'}; color: ${type === 'mistake' ? '#ef4444' : type === 'suggestion' ? '#22c55e' : '#64748b'}; border-radius: 9999px; font-weight: 500; font-size: 14px;">${feedbackTypeText}</p>
            </div>

            <div>
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: bold;">Message</p>
              <div style="background-color: #f8fafc; padding: 16px; border-radius: 6px; border-left: 4px solid #14b8a6; color: #334155; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            </div>
          </div>

          <div style="text-align: center; color: #94a3b8; font-size: 12px;">
            <p>This email was generated automatically from the Taxaltus feedback form.</p>
            <p>&copy; ${new Date().getFullYear()} Taxaltus</p>
          </div>
        </div>
      `;

            // Send the email
            await transporter.sendMail({
                from: `"Taxaltus Feedback" <${process.env.SMTP_USER}>`,
                to: process.env.CONTACT_EMAIL,
                replyTo: email || undefined,
                subject,
                text: `Feedback Type: ${feedbackTypeText}\nName: ${name || 'Anonymous'}\nEmail: ${email || 'Not Provided'}\n\nMessage:\n${message}`,
                html: htmlContent,
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error sending feedback email:", error);
        return NextResponse.json({ error: "Failed to send feedback" }, { status: 500 });
    }
}
