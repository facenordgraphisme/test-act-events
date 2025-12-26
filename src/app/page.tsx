import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroBackground } from "@/components/ui/HeroBackground";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      {/* HERO SECTION */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Dynamic Background */}
        <HeroBackground />

        <Container className="relative z-20 text-center space-y-10 max-w-6xl">
          <div className="animate-fade-in-up space-y-4">
            <span className="text-gold font-bold tracking-widest uppercase text-sm md:text-base mb-4 block animate-fade-in-up">
              Hautes-Alpes • Région Sud • France
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold font-heading text-white uppercase leading-none tracking-tight mb-8 drop-shadow-lg">
            Créateurs <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold animate-gradient-x">
              d'Émotions
            </span>
          </h1>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-gray-200 text-lg md:text-2xl font-light tracking-wide uppercase">
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gold rounded-full"></span>Festivals</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gold rounded-full"></span>Concerts</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gold rounded-full"></span>Événementiel</span>
          </div>

          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            L'alliance unique d'une <span className="text-white font-medium">sensibilité artistique</span> et d'une <span className="text-white font-medium">rigueur technique</span>.
            <br className="hidden md:block" />
            Pour des événements qui ont une âme.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/devis" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:min-w-[220px] text-lg px-8 py-7 h-auto uppercase tracking-widest font-bold shadow-[0_0_30px_-5px_var(--color-gold)] hover:shadow-[0_0_50px_-5px_var(--color-gold)] transition-shadow duration-500">
                Demander un devis
              </Button>
            </Link>
            <Link href="#prestations" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:min-w-[220px] text-lg py-7 h-auto uppercase tracking-widest border-white/20 hover:bg-white/10 hover:border-white text-white">
                Nos PRESTATIONS
              </Button>
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

      {/* SERVICES SECTION - RENAMED from Domaines d'Intervention */}
      <section id="prestations" className="py-32 bg-background">
        <Container>
          <div className="text-center mb-24 space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold font-heading uppercase text-black tracking-tight">Nos Prestations</h2>
            <div className="h-1 w-32 bg-gold mx-auto" />
            <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">
              Découvrez nos solutions techniques et artistiques pour tous vos projets.
            </p>
          </div>

          {/* Using the 3 core services derived from prestations/page.tsx to ensure valid links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Soirée 100% Personnalisée",
                subtitle: "Clé en Main & Festivals",
                desc: "Sonorisation, éclairage & structure pour événements majeurs.",
                img: "/assets/image00001.jpeg",
                link: "/prestations/soiree-personnalisee"
              },
              {
                title: "Prestation DJ",
                subtitle: "Performance Artistique",
                desc: "Performance musicale sur-mesure pour votre événement.",
                img: "/assets/image00003.jpeg",
                link: "/prestations/prestation-dj"
              },
              {
                title: "Location Matériel",
                subtitle: "Son & Lumière",
                desc: "Location de matériel professionnel L-Acoustics / RCF.",
                img: "/assets/image00006.jpeg",
                link: "/prestations/location-materiel"
              }
            ].map((service, idx) => (
              <Link key={idx} href={service.link}>
                <div className="group relative h-[600px] overflow-hidden cursor-pointer grayscale hover:grayscale-0 transition-all duration-700 ease-out border border-black/5">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: `url(${service.img})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />

                  <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-4 group-hover:translate-x-0">
                    <span className="text-5xl font-heading text-white/20 font-bold">0{idx + 1}</span>
                  </div>

                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <div className="text-gold text-sm font-bold uppercase tracking-widest mb-2 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      {service.subtitle}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold font-heading text-white uppercase mb-4 leading-none tracking-wide">{service.title}</h3>
                    <div className="h-[1px] w-12 group-hover:w-full bg-gold mb-4 transition-all duration-500" />
                    <p className="text-gray-300 text-lg font-light leading-relaxed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                      {service.desc}
                    </p>
                    <div className="mt-8 flex items-center gap-2 text-white font-bold uppercase tracking-widest text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                      En savoir plus <span>→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* A PROPOS INTRO SECTION */}
      <section className="py-20 bg-[#F6F2E8] text-black overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <Container>
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Image Side */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gold/20 translate-x-4 translate-y-4 rounded-lg transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
              <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-xl aspect-[3/4] md:aspect-auto">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 z-10" />
                <div
                  className="w-full h-full bg-[url('/assets/image00004.jpeg')] bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Content Side */}
            <div className="space-y-8 relative z-20">
              <div className="space-y-4">
                <span className="text-gold font-bold uppercase tracking-widest text-sm animate-fade-in-up">
                  Notre Histoire
                </span>
                <h2 className="text-4xl md:text-5xl font-bold font-heading uppercase text-black leading-tight">
                  Plus qu'une agence,<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-600">
                    Une Passion
                  </span>
                </h2>
              </div>

              <div className="space-y-6 text-gray-700 text-lg font-light leading-relaxed">
                <p>
                  ACT Events est né d'une conviction simple : <strong>chaque événement mérite une âme.</strong>
                </p>
                <p>
                  De nos débuts à fabriquer nos propres enceintes jusqu'à la direction technique de grands festivals, nous avons forgé une double compétence rare.
                  Nous ne sommes pas seulement des techniciens, ni seulement des artistes. Nous sommes les deux.
                </p>
                <p>
                  Cette dualité nous permet de comprendre vos attentes artistiques tout en garantissant une exécution technique militaire.
                </p>
              </div>

              <div className="pt-4">
                <Link href="/a-propos">
                  <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                    Découvrir notre parcours
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* LOCATIONS SECTION */}
      <section id="locations" className="py-32 bg-white border-y border-black/5">
        <Container>
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold font-heading uppercase text-black mb-8 tracking-tight">Zones d'Intervention</h2>
            <p className="text-gray-600 max-w-4xl mx-auto text-xl font-light leading-relaxed">
              Basé dans les <strong className="text-black font-bold">Hautes-Alpes (05)</strong>, ACT Évent Pro rayonne sur tout le quart Sud-Est et se déplace dans toute la France pour vos projets d'ampleur.
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
              {["Gap", "Briançon", "Embrun", "Guillestre", "L'Argentière", "Veynes", "Tallard", "Chorges", "Serre Chevalier", "Montgenèvre", "La Grave", "Orcières", "Vars", "Risoul"].map(city => (
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
              {[
                { code: "04", name: "Alpes-de-Haute-Provence", cities: ["Digne-les-Bains", "Manosque", "Sisteron", "Barcelonnette", "Forcalquier"] },
                { code: "06", name: "Alpes-Maritimes", cities: ["Nice", "Cannes", "Antibes", "Grasse", "Menton"] },
                { code: "38", name: "Isère", cities: ["Grenoble", "Voiron", "Bourgoin-Jallieu", "Vienne"] },
                { code: "26", name: "Drôme", cities: ["Valence", "Montélimar", "Romans-sur-Isère", "Die"] },
                { code: "84", name: "Vaucluse", cities: ["Avignon", "Orange", "Carpentras", "Cavaillon"] },
                { code: "13", name: "Bouches-du-Rhône", cities: ["Marseille", "Aix-en-Provence", "Arles", "Martigues", "Salon-de-Provence"] },
                { code: "73", name: "Savoie", cities: ["Chambéry", "Albertville", "Moûtiers"] },
                { code: "74", name: "Haute-Savoie", cities: ["Annecy", "Thonon-les-Bains", "Annemasse"] },
              ].map((dept) => (
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
            <div className="absolute inset-0 bg-[url('/assets/image00005.jpeg')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-black/80" />

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

            <Container className="relative z-10 w-full">
              <div className="max-w-2xl">
                <span className="inline-block py-2 px-4 border border-gold/50 rounded-full text-gold uppercase tracking-widest text-xs font-bold mb-6 backdrop-blur-md">
                  Couverture Nationale
                </span>
                <h3 className="text-5xl md:text-7xl font-bold font-heading uppercase text-white mb-8 border-l-4 border-gold pl-8">
                  Intervention <br />Partout en France
                </h3>
                <p className="text-gray-300 mb-10 text-xl font-light leading-relaxed pl-8 border-l border-white/10">
                  Des solutions techniques dimensionnées pour les festivals, tournées et événements majeurs sur l'ensemble du territoire.
                </p>
                <div className="pl-8">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 mb-12">
                    {[
                      "Festivals électro & concerts",
                      "Tournées artistiques",
                      "Grands événements privés",
                      "Séminaires & événements d'entreprise",
                      "Installations techniques longue durée"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-200">
                        <div className="w-1.5 h-1.5 bg-gold rotate-45" />
                        <span className="uppercase tracking-wide text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/contact">
                    <Button className="bg-white text-black hover:bg-gold hover:text-white border-none text-lg px-10 py-6 h-auto tracking-widest uppercase font-bold transition-all duration-300">
                      Discuter de votre projet
                    </Button>
                  </Link>
                </div>
              </div>
            </Container>
          </div>

        </Container>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS OR TRUST INDICATORS */}
      <section className="py-24 bg-neutral-900 text-white">
        <Container className="text-center">
          <p className="uppercase tracking-[0.3em] text-gold text-sm mb-4">Confiance & Expertise</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Ils nous font confiance</h2>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale">
            {/* Logos would go here, using text for now */}
            <span className="text-2xl font-heading font-bold">A DEFINIR</span>
            <span className="text-2xl font-heading font-bold">A DEFINIR</span>
            <span className="text-2xl font-heading font-bold">A DEFINIR</span>
            <span className="text-2xl font-heading font-bold">A DEFINIR</span>
          </div>
        </Container>
      </section>

    </div>
  );
}
