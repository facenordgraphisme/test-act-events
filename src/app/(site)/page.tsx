import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroBackground } from "@/components/ui/HeroBackground";
import ServiceCard from "@/components/home/ServiceCard";
import TrustSection from "@/components/home/TrustSection";
import FaqSection from "@/components/home/FaqSection";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";

import { generateSeoMetadata, generateStructuredData } from "@/lib/seo";

// --- CONSTANTS ---
const MAIN_ZONE_CITIES = ["Gap", "Briançon", "Embrun", "Guillestre", "L'Argentière", "Veynes", "Tallard", "Chorges", "Serre Chevalier", "Montgenèvre", "La Grave", "Orcières", "Vars", "Risoul"];

const DEPARTEMENTS = [
  { code: "04", name: "Alpes-de-Haute-Provence", cities: ["Digne-les-Bains", "Manosque", "Sisteron", "Barcelonnette", "Forcalquier"] },
  { code: "06", name: "Alpes-Maritimes", cities: ["Nice", "Cannes", "Antibes", "Grasse", "Menton"] },
  { code: "38", name: "Isère", cities: ["Grenoble", "Voiron", "Bourgoin-Jallieu", "Vienne"] },
  { code: "26", name: "Drôme", cities: ["Valence", "Montélimar", "Romans-sur-Isère", "Die"] },
  { code: "84", name: "Vaucluse", cities: ["Avignon", "Orange", "Carpentras", "Cavaillon"] },
  { code: "13", name: "Bouches-du-Rhône", cities: ["Marseille", "Aix-en-Provence", "Arles", "Martigues", "Salon-de-Provence"] },
  { code: "73", name: "Savoie", cities: ["Chambéry", "Albertville", "Moûtiers"] },
  { code: "74", name: "Haute-Savoie", cities: ["Annecy", "Thonon-les-Bains", "Annemasse"] },
];

const NATIONAL_ACTIVITIES = [
  "Festivals électro & concerts",
  "Tournées artistiques",
  "Grands événements privés",
  "Séminaires & événements d'entreprise",
  "Installations techniques longue durée"
];

// --- GROQ QUERY ---
const HOMEPAGE_QUERY = `*[_id == "homepage"][0]{
  _id,
  hero {
    backgroundImages,
    description
  },
  philosophy {
    introduction,
    title,
    text,
    quote,
    tags,
    grid
  },
  services {
    title,
    subtitle
  },
  "servicesList": *[_type == "service"] | order(order asc) {
    title,
    shortDescription,
    featuredImage,
    slug
  },
  story {
    intro,
    title,
    text,
    image,
    ctaText,
    ctaLink
  },
  trust {
    subtitle,
    title,
    logos[] {
      name,
      logo
    }
  },
  coverage {
    badge,
    title,
    description,
    activities,
    image,
    ctaText,
    ctaLink
  },
  "faqItems": *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer
  },
  seo
}`;

export async function generateMetadata() {
  const data = await client.fetch(HOMEPAGE_QUERY);
  return generateSeoMetadata(data?.seo, {
    title: "Act Events | Sonorisation, Éclairage et Événementiel 05",
    description: "Prestataire technique événementiel dans les Hautes-Alpes (05). Sonorisation, éclairage, DJ et organisation de festivals."
  });
}

export default async function Home() {
  const data = await client.fetch(HOMEPAGE_QUERY);
  // console.log("Homepage Data (ID & Trust):", data?._id, JSON.stringify(data?.trust, null, 2));

  // Prepare Hero Images
  const heroImages = data?.hero?.backgroundImages?.map((img: any) => urlFor(img).url()) || [];

  // Prepare Services
  // Prefer dynamic "servicesList" from Sanity "service" documents
  // Fallback to "services.items" (manual list in Homepage) if needed (for backward compat), 
  // or hardcoded items if absolutely nothing exists.
  let servicesToDisplay = [];

  if (data?.servicesList && data.servicesList.length > 0) {
    servicesToDisplay = data.servicesList.map((svc: any) => ({
      title: svc.title,
      subtitle: "Prestation", // Generic subtitle since schema doesn't have one yet, or could use a category if added later
      description: svc.shortDescription,
      image: svc.featuredImage,
      link: svc.slug?.current ? `/prestations/${svc.slug.current}` : '#'
    }));
  } else if (data?.services?.items && data.services.items.length > 0) {
    servicesToDisplay = data.services.items;
  } else {
    // Hardcoded fallback
    servicesToDisplay = [
      {
        title: "Soirée 100% Personnalisée",
        subtitle: "Clé en Main & Festivals",
        description: "Sonorisation, éclairage & structure pour événements majeurs.",
        img: "/assets/image00001.jpeg",
        link: "/prestations/soiree-personnalisee"
      },
      {
        title: "Prestation DJ",
        subtitle: "Performance Artistique",
        description: "Performance musicale sur-mesure pour votre événement.",
        img: "/assets/image00003.jpeg",
        link: "/prestations/prestation-dj"
      },
      {
        title: "Location Matériel",
        subtitle: "Son & Lumière",
        description: "Location de matériel professionnel Horn / Alto.",
        img: "/assets/image00006.jpeg",
        link: "/prestations/location-materiel"
      }
    ];
  }

  return (
    <div className="flex flex-col gap-0">
      {/* HERO SECTION */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Dynamic Background */}
        <HeroBackground images={heroImages.length > 0 ? heroImages : undefined} />

        <Container className="relative z-20 text-center space-y-10 max-w-6xl">
          <div className="mb-8 delay-100">
            <Image
              src="/assets/logos/logo-white.webp"
              alt="ACT Events - Créateurs d'émotions"
              width={600}
              height={225}
              priority
              className="w-full max-w-xs md:max-w-4xl h-auto max-h-[20vh] md:max-h-[40vh] object-contain mx-auto" // Reduced size on mobile
              sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-gray-200 text-lg md:text-2xl font-light tracking-wide uppercase">
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gold rounded-full"></span>Mariages</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gold rounded-full"></span>Festivals</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gold rounded-full"></span>Concerts</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gold rounded-full"></span>Événementiel</span>
          </div>

          <div className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            {data?.hero?.description ? (
              <p>{data.hero.description}</p>
            ) : (
              <p>
                L&apos;alliance unique d&apos;une <span className="text-white font-medium">sensibilité artistique</span> et d&apos;une <span className="text-white font-medium">rigueur technique</span>.
                <br className="hidden md:block" />
                Intervention dans les <span className="text-gold">Hautes-Alpes</span> et en <span className="text-gold">Région Sud</span>.
              </p>
            )}
          </div>

          <div className="pt-8 flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/devis" className="w-full sm:w-auto">
              <span className="inline-flex items-center justify-center rounded-sm font-medium transition-colors cursor-pointer bg-gold text-black hover:bg-[#A3863C] w-full sm:min-w-[180px] text-sm md:text-base px-6 py-4 h-auto uppercase tracking-widest font-bold shadow-[0_0_30px_-5px_var(--color-gold)] hover:shadow-[0_0_50px_-5px_var(--color-gold)] transition-shadow duration-500">
                Demander un devis
              </span>
            </Link>
            <Link href="#prestations" className="w-full sm:w-auto">
              <span className="inline-flex items-center justify-center rounded-sm font-medium transition-colors cursor-pointer border border-gold text-gold hover:bg-gold hover:text-black w-full sm:min-w-[180px] text-sm md:text-base py-4 h-auto uppercase tracking-widest border-white/20 hover:bg-white/70 hover:border-white text-white">
                Nos PRESTATIONS
              </span>
            </Link>
          </div>
        </Container>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-gold mt-2 rounded-full" />
          </div>
        </div>
      </section>

      {/* INTRO / ABOUT SUMMARY SECTION (PHILOSOPHY) */}
      <section className="py-24 bg-neutral-900 text-white border-b border-white/5 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <div>
                <span className="text-gold font-bold uppercase tracking-widest text-sm mb-2 block">
                  {data?.philosophy?.introduction || "Notre Philosophie"}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold font-heading uppercase leading-tight">
                  {data?.philosophy?.title ? (
                    data.philosophy.title
                  ) : (
                    <>
                      Plus qu'un prestataire,<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200">
                        Un Partenaire Créatif
                      </span>
                    </>
                  )}
                </h2>
              </div>

              <div className="space-y-6 text-gray-300 text-lg font-light leading-relaxed">
                {data?.philosophy?.text ? (
                  <div className="prose prose-invert prose-lg">
                    <PortableText value={data.philosophy.text} />
                  </div>
                ) : (
                  <>
                    <p>
                      Né d&apos;une passion viscérale pour le son et la musique, <strong className="text-white">ACT Events</strong> est le fruit d&apos;un parcours atypique : celui d&apos;un artiste DJ habitué aux exigences du dancefloor et d&apos;un technicien rigoureux.
                    </p>
                    <p>
                      De la fabrication de nos premières enceintes à la direction technique de festivals majeurs, nous avons forgé une expertise unique. Nous ne nous contentons pas d&apos;installer du matériel ; nous créons une <strong className="text-white">expérience immersive</strong>.
                    </p>
                  </>
                )}

                {(data?.philosophy?.quote) && (
                  <p className="border-l-4 border-gold pl-6 italic text-white/90">
                    "{data.philosophy.quote}"
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                {(data?.philosophy?.tags || ["Mariages", "Corporates", "Festivals", "Soirées Privées", "Concerts"]).map((tag: string) => (
                  <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm uppercase tracking-wider text-gold hover:bg-gold hover:text-black transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Stats / Visual - Grid */}
            <div className="grid grid-cols-2 gap-4">
              {(data?.philosophy?.grid || [
                { label: "Sonorisation", desc: "Systèmes Haute Fidélité", icon: "🔊" },
                { label: "Éclairage", desc: "Architecture & Show", icon: "💡" },
                { label: "Coordination", desc: "Suivi de A à Z", icon: "📋" },
                { label: "Expertise", desc: "Technique & Artistique", icon: "✨" },
              ]).map((item: any, idx: number) => (
                <div key={idx} className="bg-white/5 p-6 rounded-lg border border-white/5 hover:border-gold/30 hover:bg-white/10 transition-all duration-300 group">
                  <div className="text-3xl md:text-4xl mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                  <h3 className="text-base md:text-xl font-bold font-heading uppercase text-white mb-1 group-hover:text-gold transition-colors">{item.label}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* SERVICES SECTION */}
      <section id="prestations" className="py-32 bg-background">
        <Container>
          <div className="text-center mb-24 space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold font-heading uppercase text-black tracking-tight">{data?.services?.title || "Nos Prestations"}</h2>
            <div className="h-1 w-32 bg-gold mx-auto" />
            <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">
              {data?.services?.subtitle || "Découvrez nos solutions techniques et artistiques pour tous vos projets."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicesToDisplay.map((service: any, idx: number) => (
              <ServiceCard key={idx} service={service} index={idx} />
            ))}
          </div>
        </Container>
      </section>

      {/* A PROPOS INTRO SECTION (STORY) */}
      <section className="py-20 bg-[#F6F2E8] text-black overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <Container>
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Image Side */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gold/20 translate-x-4 translate-y-4 rounded-lg transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
              <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-xl aspect-[3/4] md:aspect-auto">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 z-10" />
                <Image
                  src={data?.story?.image ? urlFor(data.story.image).url() : '/assets/image00004.jpeg'}
                  alt="Notre histoire - ACT Events"
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Content Side */}
            <div className="space-y-8 relative z-20">
              <div className="space-y-4">
                <span className="text-gold font-bold uppercase tracking-widest text-sm animate-fade-in-up">
                  {data?.story?.intro || "Notre Histoire"}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold font-heading uppercase text-black leading-tight">
                  {data?.story?.title ? data.story.title : (
                    <>
                      Plus qu&apos;une agence,<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-600">
                        Une Passion
                      </span>
                    </>
                  )}
                </h2>
              </div>

              <div className="space-y-6 text-gray-700 text-lg font-light leading-relaxed">
                {data?.story?.text ? (
                  <div className="prose prose-lg">
                    <PortableText value={data.story.text} />
                  </div>
                ) : (
                  <>
                    <p>
                      ACT Events est né d&apos;une conviction simple : <strong>chaque événement mérite une âme.</strong>
                    </p>
                    <p>
                      De nos débuts à fabriquer nos propres enceintes jusqu&apos;à la direction technique de grands festivals, nous avons forgé une double compétence rare.
                      Nous ne sommes pas seulement des techniciens, ni seulement des artistes. Nous sommes les deux.
                    </p>
                    <p>
                      Cette dualité nous permet de comprendre vos attentes artistiques tout en garantissant une exécution technique militaire.
                    </p>
                  </>
                )}
              </div>

              <div className="pt-4">
                <Link href={data?.story?.ctaLink || "/a-propos"}>
                  <span className="inline-flex items-center justify-center rounded-sm font-medium transition-colors cursor-pointer h-11 px-8 text-base border border-gold text-gold hover:bg-gold hover:text-black border-black text-black hover:bg-black hover:text-white">
                    {data?.story?.ctaText || "Découvrir notre parcours"}
                  </span>
                </Link>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* LOCATIONS SECTION (HARDCODED as requested) */}
      <section id="locations" className="py-32 bg-white border-y border-black/5">
        <Container>
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold font-heading uppercase text-black mb-8 tracking-tight">Zones d'Intervention</h2>
            <p className="text-gray-600 max-w-4xl mx-auto text-xl font-light leading-relaxed">
              Basé dans les <strong className="text-black font-bold">Hautes-Alpes (05)</strong>, ACT Évent Pro rayonne sur tout le quart Sud-Est et se déplace dans toute la France pour vos projets d&apos;ampleur.
            </p>
          </div>

          {/* ZONE PRINCIPALE - 05 */}
          <div className="mb-24">
            <div className="flex items-center gap-6 mb-12">
              <div className="h-px flex-1 bg-black/10" />
              <h3 className="text-2xl md:text-4xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600 px-4">Zone Principale • Hautes-Alpes (05)</h3>
              <div className="h-px flex-1 bg-black/10" />
            </div>

            <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-gray-400 text-sm">
              {MAIN_ZONE_CITIES.map(city => (
                <li key={city} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-gold rounded-full" /> {city}
                </li>
              ))}
            </ul>
          </div>

          {/* DÉPARTEMENTS LIMITROPHES */}
          <div className="mb-24">
            <div className="flex items-center gap-6 mb-12">
              <div className="h-px flex-1 bg-black/10" />
              <h3 className="text-2xl md:text-4xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600 px-4">Région Sud & Alpes</h3>
              <div className="h-px flex-1 bg-black/10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {DEPARTEMENTS.map((dept) => (
                <div key={dept.code} className="bg-white p-8 border border-black/5 hover:border-gold/30 hover:shadow-xl transition-all duration-300 group">
                  <div className="flex justify-between items-start mb-6">
                    <h4 className="text-lg font-bold text-black uppercase leading-tight group-hover:text-gold transition-colors">{dept.name}</h4>
                    <span className="text-5xl font-bold text-neutral-100 group-hover:text-gold/10 transition-colors -mt-4 -mr-4">{dept.code}</span>
                  </div>
                  <ul className="space-y-1">
                    {dept.cities.map(city => (
                      <li key={city} className="text-gray-400 text-sm flex items-center gap-2">
                        <span className="w-1 h-1 bg-white/20 rounded-full" /> {city}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* NATIONAL COVERAGE */}
          <div className="relative rounded-none lg:rounded-[2rem] overflow-hidden min-h-[600px] flex items-center">
            <Image
              src={data?.coverage?.image ? urlFor(data.coverage.image).url() : "/assets/image00005.jpeg"}
              alt="Couverture Nationale"
              fill
              className="object-cover z-0"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/80 z-0" />

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

            <Container className="relative z-10 w-full">
              <div className="max-w-2xl py-4">
                <span className="inline-block py-2 px-4 border border-gold/50 rounded-full text-gold uppercase tracking-widest text-xs font-bold mb-6 backdrop-blur-md">
                  {data?.coverage?.badge || "Couverture Nationale"}
                </span>
                <h3 className="text-3xl md:text-6xl font-bold font-heading uppercase text-white mb-6 border-l-4 border-gold pl-6 md:pl-8">
                  {data?.coverage?.title ? (
                    data.coverage.title
                  ) : (
                    <>Intervention <br />Partout en France</>
                  )}
                </h3>
                <p className="text-gray-300 mb-10 text-xl font-light leading-relaxed pl-8 border-l border-white/10">
                  {data?.coverage?.description || "Des solutions techniques dimensionnées pour les festivals, tournées et événements majeurs sur l'ensemble du territoire."}
                </p>
                <div className="pl-8">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 mb-12">
                    {(data?.coverage?.activities || NATIONAL_ACTIVITIES).map((item: string, i: number) => (
                      <li key={i} className="flex items-center gap-3 text-gray-200">
                        <div className="w-1.5 h-1.5 bg-gold rotate-45" />
                        <span className="uppercase tracking-wide text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={data?.coverage?.ctaLink || "/devis"}>
                    <span className="inline-flex items-center justify-center rounded-sm font-medium transition-colors cursor-pointer bg-gold text-black hover:bg-[#A3863C] bg-white text-black hover:bg-gold hover:text-white border-none text-sm md:text-base px-6 py-4 h-auto tracking-widest uppercase font-bold transition-all duration-300">
                      {data?.coverage?.ctaText || "Discuter de votre projet"}
                    </span>
                  </Link>
                </div>
              </div>
            </Container>
          </div>

        </Container>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS OR TRUST INDICATORS (TRUST) */}
      <TrustSection data={data?.trust || {}} />

      {/* FAQ SECTION */}
      <FaqSection items={data?.faqItems || []} />

    </div >
  );
}
