"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function CookieBanner() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem("cookie_consent");
        if (!consent) {
            setShowBanner(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie_consent", "accepted");
        setShowBanner(false);
        // Here you could initialize analytics
    };

    const handleDecline = () => {
        localStorage.setItem("cookie_consent", "declined");
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-black/10 p-4 md:p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600 max-w-2xl">
                    <p>
                        Nous utilisons des cookies pour améliorer votre expérience sur notre site.
                        En continuant votre navigation, vous acceptez notre utilisation des cookies.
                        Pour en savoir plus, consultez notre{" "}
                        <Link href="/politique-de-confidentialite" className="text-gold hover:underline">
                            politique de confidentialité
                        </Link>.
                    </p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDecline}
                        className="w-full md:w-auto whitespace-nowrap"
                    >
                        Refuser
                    </Button>
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={handleAccept}
                        className="w-full md:w-auto whitespace-nowrap"
                    >
                        Accepter
                    </Button>
                </div>
            </div>
        </div>
    );
}
