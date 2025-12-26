"use server";

import { quoteSchema } from "@/lib/validations/quoteSchema";
import { client } from "@/sanity/lib/client";

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
        // Determine write token availability.
        // In a real app, you'd use a separate client with a write token.
        // For now, we'll log the intention.

        console.log("Submitting Quote to Sanity:", validData);

        // UNCOMMENT THIS WHEN YOU HAVE A WRITE TOKEN in .env.local named SANITY_API_TOKEN
        // const writeClient = client.withConfig({ token: process.env.SANITY_API_TOKEN })
        // await writeClient.create({
        //   _type: 'quoteRequest',
        //   ...validData,
        //   createdAt: new Date().toISOString()
        // })

        // For demo purposes, we'll simulate success delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return { success: true };
    } catch (error) {
        console.error("Submission error:", error);
        return { success: false, message: "Une erreur est survenue lors de l'envoi." };
    }
}
