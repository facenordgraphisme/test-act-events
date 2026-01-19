'use client';

import Image from 'next/image';
import Link from 'next/link';

// ... existing imports ...

// In Header component:
<Link href="/" className="relative h-12 w-auto md:h-16 transition-transform hover:scale-105 block aspect-[2/1]">
    <Image
        src="/assets/logos/icon.webp"
        alt="ACT Events"
        width={120} // Reduced from 200
        height={60} // Reduced from 100
        className="object-contain h-full w-auto"
        priority
        sizes="120px" // Hardcode size since it's a fixed logo essentially
    />
</Link>
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Pages with a dark hero section where the header should start transparent
    const isHomePage = pathname === '/';
    // Matches /prestations/something but NOT /prestations
    const isServiceDetail = pathname.startsWith('/prestations/') && pathname.split('/').length > 2;

    const isTransparentPage = isHomePage || isServiceDetail;
    const showSolidHeader = isScrolled || !isTransparentPage;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: 'Accueil' },
        { href: '/prestations', label: 'Prestations' },
        { href: '/galerie', label: 'Galerie' },
        { href: '/a-propos', label: 'À Propos' },

    ];

    return (
        <header
            className={clsx(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                showSolidHeader ? 'bg-[#F6F2E8]/90 backdrop-blur-md py-4 shadow-sm border-b border-black/5' : 'bg-transparent py-4 md:py-6'
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="relative h-10 w-auto md:h-16 transition-transform hover:scale-105" onClick={() => setIsMobileMenuOpen(false)}>
                    <Image
                        src="/assets/logos/icon.webp"
                        alt="ACT Events"
                        width={120}
                        height={60}
                        className="object-contain h-full w-auto"
                        sizes="120px"
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={clsx(
                                "text-sm font-medium hover:text-gold transition-colors uppercase tracking-wider",
                                showSolidHeader ? "text-black/80" : "text-white/80"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link href="/devis">
                        <Button variant="primary" size="sm">
                            Demander un devis
                        </Button>
                    </Link>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className={clsx("md:hidden z-50 relative p-2", (showSolidHeader || isMobileMenuOpen) ? "text-black" : "text-white")}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Menu"
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden absolute top-0 left-0 right-0 bg-[#F6F2E8] min-h-screen flex flex-col pt-24 px-6 z-40"
                    >
                        <div className="flex flex-col gap-6 items-center text-center">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + idx * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-black hover:text-gold text-2xl font-heading font-medium uppercase tracking-wider block py-2"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + navLinks.length * 0.1 }}
                                className="w-full max-w-xs mt-4"
                            >
                                <Link href="/devis" onClick={() => setIsMobileMenuOpen(false)} className="block w-full">
                                    <Button className="w-full text-lg h-12" size="lg">Demander un devis</Button>
                                </Link>
                            </motion.div>
                        </div>

                        {/* Decorative footer in menu */}
                        <div className="mt-auto pb-12 text-center text-sm text-gray-400">
                            <div className="w-12 h-1 bg-gold mx-auto mb-4 rounded-full" />
                            <p>&copy; {new Date().getFullYear()} ACT Events</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
