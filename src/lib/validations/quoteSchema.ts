import { z } from "zod";

export const quoteSchema = z.object({
    fullName: z.string().min(2, "Le nom est requis (2 caractères minimum)"),
    email: z.string().email("Email invalide"),
    phone: z.string().min(10, "Numéro de téléphone invalide"),

    eventType: z.enum(["wedding", "birthday", "corporate", "other"]),

    serviceType: z.enum(["full", "dj", "rental"]),

    // Handling date as string to avoid timezone headaches in forms, or date object
    eventDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Date invalide",
    }),

    city: z.string().min(2, "Ville requise"),
    postcode: z.string().min(4, "Code postal requis"),

    guestCount: z.coerce.number().min(1, "Nombre d'invités requis"),

    venueType: z.enum(["indoor", "outdoor"]),

    startTime: z.string().optional(),
    endTime: z.string().optional(),

    needs: z.string().optional(),

    consent: z.boolean().refine((val) => val === true, {
        message: "Vous devez accepter la politique de confidentialité",
    }),

    // Honeypot field (should remain empty)
    website: z.string().optional(),
});


export type QuoteFormData = z.infer<typeof quoteSchema>;
