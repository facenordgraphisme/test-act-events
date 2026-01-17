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
        // { href: '/contact', label: 'Contact' },
    ];

    return (
        <header
            className={clsx(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                showSolidHeader ? 'bg-[#F6F2E8]/90 backdrop-blur-md py-4 shadow-sm border-b border-black/5' : 'bg-transparent py-6'
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="relative h-12 w-auto md:h-16 transition-transform hover:scale-105">
                    {/* Using standard img tag temporarily if Next Image has issues with external/local paths in some setups, but prefer Image */}
                    <Image
                        src="/assets/logos/icon.webp"
                        alt="ACT Events"
                        width={120}
                        height={60}
                        className="object-contain h-full w-auto" // Adjusted to match styling
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
                    className={clsx("md:hidden", showSolidHeader ? "text-black" : "text-white")}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-[#F6F2E8] border-t border-black/5 p-4 flex flex-col gap-4 shadow-xl">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-black hover:text-gold text-lg font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link href="/devis" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full">Demander un devis</Button>
                    </Link>
                </div>
            )}
        </header>
    );
}
