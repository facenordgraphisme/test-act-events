import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Facebook, Map, Phone, Mail, MapPin } from 'lucide-react';
import { client } from '@/sanity/lib/client';

async function getSiteSettings() {
    return await client.fetch(`*[_type == "siteSettings"][0]{
        phoneNumber,
        email,
        address,
        socialLinks {
            instagram,
            facebook,
            googleMyBusiness
        }
    }`);
}

export async function Footer() {
    const settings = await getSiteSettings();

    return (
        <footer className="bg-neutral-900 border-t border-white/5 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="block relative h-24 w-auto mb-6 aspect-[3/1]">
                            <Image
                                src="/assets/logos/logo-white.webp"
                                alt="ACT Events"
                                width={200}
                                height={100}
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
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-heading text-lg font-bold mb-6 text-white">Contact</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-gold shrink-0" />
                                <span>{settings?.address || "Hautes-Alpes • Région Sud • France"}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-gold shrink-0" />
                                <a href={`tel:${settings?.phoneNumber}`} className="hover:text-white transition-colors">
                                    {settings?.phoneNumber || "06 00 00 00 00"}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-gold shrink-0" />
                                <a href={`mailto:${settings?.email}`} className="hover:text-white transition-colors">
                                    {settings?.email || "contact@act-events.fr"}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-heading text-lg font-bold mb-6 text-white">Suivez-nous</h4>
                        <div className="flex gap-4">
                            {settings?.socialLinks?.instagram && (
                                <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all">
                                    <Instagram size={20} />
                                </a>
                            )}
                            {settings?.socialLinks?.facebook && (
                                <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all">
                                    <Facebook size={20} />
                                </a>
                            )}
                            {settings?.socialLinks?.googleMyBusiness && (
                                <a href={settings.socialLinks.googleMyBusiness} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all" title="Avis Google">
                                    <Map size={20} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <p>© {new Date().getFullYear()} ACT Events. Tous droits réservés.</p>
                        <a href="https://www.facenordgraphisme.fr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                            Propulsé par <span className="font-bold text-gray-400 hover:text-gold transition-colors">Face Nord Graphisme</span>
                        </a>
                    </div>
                    <div className="flex gap-6">
                        <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions Légales</Link>
                        <Link href="/politique-de-confidentialite" className="hover:text-white transition-colors">Politique de Confidentialité</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
