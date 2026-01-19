"use server";

import { quoteSchema } from "@/lib/validations/quoteSchema";
import nodemailer from "nodemailer";
import { generateEmailHtml } from "@/lib/emailTemplate";

export async function submitQuote(data: unknown) {
    const result = quoteSchema.safeParse(data);

    if (!result.success) {
        return { success: false, errors: result.error.flatten().fieldErrors };
    }

    // Honeypot check
    if (result.data.website) {
        return { success: true }; // Silently fail for bots
    }

    const { website, ...validData } = result.data;

    try {
        // Configure SMTP Transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Generate HTML content
        const htmlContent = generateEmailHtml(validData);

        // Send Email
        await transporter.sendMail({
            from: process.env.SMTP_FROM || '"Act Events Website" <no-reply@act-events.fr>',
            to: "contact@act-event-pro.fr", // Destination address
            subject: `Nouvelle demande de devis : ${validData.eventType} - ${validData.eventDate}`,
            html: htmlContent,
            replyTo: validData.email, // Allow direct reply to the client
        });

        console.log("Email sent successfully for:", validData.email);

        return { success: true };
    } catch (error) {
        console.error("Submission error:", error);
        return { success: false, message: "Une erreur est survenue lors de l'envoi." };
    }
}
