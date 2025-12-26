"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteSchema, QuoteFormData } from "@/lib/validations/quoteSchema";
import { submitQuote } from "@/app/actions/submitQuote";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function QuotePage() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<QuoteFormData>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(quoteSchema) as any,
        defaultValues: {
            guestCount: 50,
            consent: false,
        },
    });

    const onSubmit = async (data: QuoteFormData) => {
        setIsSubmitting(true);
        const result = await submitQuote(data);
        setIsSubmitting(false);

        if (result.success) {
            setIsSuccess(true);
            reset();
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            alert("Une erreur est survenue. Veuillez vérifier tous les champs.");
        }
    };

    if (isSuccess) {
        return (
            <Container className="py-32 text-center max-w-2xl">

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-12 border border-gold/20 rounded-lg shadow-md"
                >
                    <div className="flex justify-center mb-6">
                        <CheckCircle2 className="text-gold w-20 h-20" />
                    </div>
                    <h1 className="text-4xl font-bold font-heading text-black mb-4">Demande Reçue !</h1>
                    <p className="text-gray-600 text-lg mb-8">
                        Merci de nous avoir contactés. Nous avons bien reçu votre demande de devis et nous reviendrons vers vous sous 24h avec une proposition personnalisée.
                    </p>
                    <Link href="/">
                        <Button variant="outline">Retour à l'accueil</Button>
                    </Link>
                </motion.div>
            </Container>
        );
    }

    return (
        <div className="py-20">
            <Container className="max-w-4xl">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading uppercase text-black">
                        Demander un <span className="text-gold">Devis</span>
                    </h1>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        Dites-nous en plus sur votre événement. Nous nous engageons à vous répondre rapidement (sous 24h).
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 bg-white p-8 md:p-12 rounded-lg border border-black/5 shadow-md">
                    {/* Honeypot */}
                    <input type="text" {...register("website")} className="hidden" aria-hidden="true" autoComplete="off" />

                    {/* Contact Info */}
                    <section className="space-y-6">
                        <h3 className="text-xl font-bold text-black border-b border-black/10 pb-2">Vos Coordonnées</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Nom complet *"
                                placeholder="Votre nom"
                                {...register("fullName")}
                                error={errors.fullName?.message}
                            />
                            <Input
                                label="Email *"
                                type="email"
                                placeholder="email@exemple.com"
                                {...register("email")}
                                error={errors.email?.message}
                            />
                            <Input
                                label="Téléphone *"
                                type="tel"
                                placeholder="06 00 00 00 00"
                                {...register("phone")}
                                error={errors.phone?.message}
                            />
                            <Input
                                label="Ville de résidence"
                                placeholder="ex: Gap"
                                {...register("city")} // Using 'city' loosely here
                                error={errors.city?.message}
                            />
                        </div>
                    </section>

                    {/* Event Details */}
                    <section className="space-y-6">
                        <h3 className="text-xl font-bold text-black border-b border-black/10 pb-2">L'Événement</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Select
                                label="Type d'événement *"
                                placeholder="Sélectionner..."
                                options={[
                                    { label: "Mariage", value: "wedding" },
                                    { label: "Anniversaire", value: "birthday" },
                                    { label: "Soirée d'entreprise / Séminaire", value: "corporate" },
                                    { label: "Autre", value: "other" },
                                ]}
                                {...register("eventType")}
                                error={errors.eventType?.message}
                            />
                            <Select
                                label="Prestation souhaitée *"
                                placeholder="Sélectionner..."
                                options={[
                                    { label: "Formule Complète (DJ + Son + Lumière)", value: "full" },
                                    { label: "DJ Set Uniquement", value: "dj" },
                                    { label: "Location Matériel Seul", value: "rental" },
                                ]}
                                {...register("serviceType")}
                                error={errors.serviceType?.message}
                            />

                            <Input
                                label="Date de l'événement *"
                                type="date"
                                {...register("eventDate")}
                                error={errors.eventDate?.message}
                            />
                            <Input
                                label="Lieu (Ville/Code postal) *"
                                placeholder="ex: Château de Tallard, 05130"
                                {...register("postcode")} // Putting location details here
                                error={errors.postcode?.message}
                            />

                            <Input
                                label="Nombre d'invités (estimé) *"
                                type="number"
                                {...register("guestCount")}
                                error={errors.guestCount?.message}
                            />
                            <Select
                                label="Type de lieu *"
                                placeholder="Sélectionner..."
                                options={[
                                    { label: "Intérieur", value: "indoor" },
                                    { label: "Extérieur", value: "outdoor" },
                                ]}
                                {...register("venueType")}
                                error={errors.venueType?.message}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Début (h)" type="time" {...register("startTime")} />
                                <Input label="Fin (h)" type="time" {...register("endTime")} />
                            </div>
                        </div>
                    </section>

                    {/* Message */}
                    <section className="space-y-6">
                        <h3 className="text-xl font-bold text-black border-b border-black/10 pb-2">Message & Besoins</h3>
                        <Textarea
                            label="Détails supplémentaires"
                            placeholder="Parlez-nous de vos goûts musicaux, besoins spécifiques ou questions..."
                            {...register("needs")}
                            rows={5}
                        />
                    </section>

                    {/* Consent */}
                    <div className="space-y-4">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                className="mt-1 w-4 h-4 rounded border-gray-600 bg-neutral-800 text-gold focus:ring-gold"
                                {...register("consent")}
                            />
                            <span className="text-sm text-gray-400">
                                J'accepte que mes données soient traitées pour répondre à ma demande de devis. (Promis, pas de spam).
                                {errors.consent && <span className="block text-red-500 mt-1">{errors.consent.message}</span>}
                            </span>
                        </label>

                    </div>

                    <Button
                        type="submit"
                        size="lg"
                        className="w-full md:w-auto px-12 text-lg"
                        isLoading={isSubmitting} // Need to add isLoading to Button prop if not there
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                    </Button>

                </form>
            </Container>
        </div>
    );
}
