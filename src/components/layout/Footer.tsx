import Link from 'next/link';
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-neutral-900 border-t border-white/5 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="block relative h-24 w-auto mb-6">
                            <img
                                src="/assets/logos/logo-white.webp"
                                alt="ACT Events"
                                className="w-full h-full object-contain"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Sonorisation, éclairage et animation DJ haut de gamme dans les Hautes-Alpes.
                            Pour vos mariages, événements privés et professionnels.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-heading text-lg font-bold mb-6 text-white">Navigation</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="/" className="hover:text-gold transition-colors">Accueil</Link></li>
                            <li><Link href="/prestations" className="hover:text-gold transition-colors">Nos Prestations</Link></li>
                            <li><Link href="/galerie" className="hover:text-gold transition-colors">Galerie</Link></li>
                            <li><Link href="/a-propos" className="hover:text-gold transition-colors">À Propos</Link></li>
                            <li><Link href="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-heading text-lg font-bold mb-6 text-white">Contact</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-gold shrink-0" />
                                <span>Hautes-Alpes • Région Sud • France</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-gold shrink-0" />
                                <a href="tel:+33600000000" className="hover:text-white transition-colors">06 00 00 00 00</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-gold shrink-0" />
                                <a href="mailto:contact@act-events.fr" className="hover:text-white transition-colors">contact@act-events.fr</a>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-heading text-lg font-bold mb-6 text-white">Suivez-nous</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all">
                                <Youtube size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} ACT Events. Tous droits réservés.</p>
                    <div className="flex gap-6">
                        <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions Légales</Link>
                        <Link href="/politique-de-confidentialite" className="hover:text-white transition-colors">Politique de Confidentialité</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
