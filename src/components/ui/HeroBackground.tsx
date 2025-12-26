"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const images = [
    "/assets/image00004.jpeg",
    "/assets/image00022.jpeg",
    "/assets/image00015.jpeg",
    "/assets/image00019.jpeg",
];

export function HeroBackground() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 6000); // Change image every 6 seconds
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden bg-neutral-900">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    {/* Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${images[index]})` }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Overlay - Gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-10" />
            <div className="absolute inset-0 bg-black/20 z-10" /> {/* General darkening */}
        </div>
    );
}
