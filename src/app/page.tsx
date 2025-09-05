"use client";

import ContactForm from "../components/ContactForm";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Menu,
  X,
  Shield,
  Lightbulb,
  House,
  Camera,
  Network,
  Hotel,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Zap,
} from "lucide-react";

/* LITIR & NEON (aðeins dökkt þema) */
const brand = {
  primary: "#45b4e8",
  neonPink: "#ff3df7",
  neonLime: "#a3ff12",
  neonViolet: "#8b5cf6",
};

export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="bg-slate-950 text-slate-100">
      <NeonBackdrop />

      {/* NAVBAR – stórt lógó */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/5 bg-white/10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between">
            <a href="#top" className="flex items-center" aria-label="Rafbakki – Heim">
              <img src="/logo.png" alt="Rafbakki logo" className="h-20 w-auto" />
            </a>

            <nav className="hidden md:flex items-center gap-8 text-xl font-medium">
              <a className="hover:opacity-80" href="#services">Þjónusta</a>
              <a className="hover:opacity-80" href="#about">Um okkur</a>
              <a className="hover:opacity-80" href="#projects">Verkefni</a>
              <a className="hover:opacity-80" href="#contact">Hafa samband</a>
            </nav>

            <button
              className="md:hidden p-2 rounded-xl border border-white/20"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Opna/loka valmynd"
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>

          {mobileOpen && (
            <div className="md:hidden pb-4 grid gap-2 text-base">
              {[
                { href: "#about", label: "Um okkur" },
                { href: "#services", label: "Þjónusta" },
                { href: "#projects", label: "Verkefni" },
                { href: "#contact", label: "Hafa samband" },
              ].map((item) => (
                <a key={item.href} href={item.href} className="px-3 py-2 rounded-xl hover:bg-white/10">
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full blur-3xl opacity-30"
          style={{ background: `radial-gradient(circle at 30% 30%, ${brand.neonPink}, transparent 60%)` }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full blur-3xl opacity-25"
          style={{ background: `radial-gradient(circle at 60% 60%, ${brand.neonLime}, transparent 60%)` }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl font-bold tracking-tight"
              >
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: `linear-gradient(90deg, ${brand.primary}, ${brand.neonPink}, ${brand.neonViolet})` }}
                >
                  Rafmagns- og snjallkerfi
                </span>
              </motion.h1>
              <p className="mt-4 text-base sm:text-lg opacity-80 max-w-xl">
                Rafmagn, snjallt heimili, CCTV, net og margt fleira – hönnun, uppsetning, þjónusta.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <NeonButton href="#contact" label="Hafðu samband" Icon={Sparkles} />
                <NeonGhostButton href="#projects" label="Verkefnin okkar" Icon={ArrowRight} />
              </div>
              <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
                {[
                  { k: "+8", l: "ára reynsla" },
                  { k: "50+", l: "verkefni" },
                  { k: "24/7", l: "Eftirlit & tækniaðstoð" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-4 text-center relative bg-white/5 border border-white/10 group"
                    style={{ boxShadow: `inset 0 0 0 1px #ffffff12, 0 0 30px ${brand.primary}11` }}
                  >
                    <div className="text-2xl font-bold group-hover:animate-pulse" style={{ color: brand.primary }}>
                      {s.k}
                    </div>
                    <div className="text-xs opacity-70">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
  className="aspect-[9/16] max-h-[600px] mx-auto rounded-3xl overflow-hidden relative border border-white/20"
  style={{ boxShadow: `0 0 60px ${brand.neonViolet}22, inset 0 0 60px ${brand.primary}15` }}
>
  <iframe
    title="Rafbakki — showreel"
    src="https://www.youtube.com/embed/h8A-Thn1iGU?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=h8A-Thn1iGU"
    className="w-full h-full"
    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
    referrerPolicy="no-referrer-when-downgrade"
  />
  <div className="absolute bottom-4 right-4 text-xs px-3 py-1 rounded-xl bg-black/40 border border-white/10" />
</div>

          </div>
        </div>
      </section>

      {/* ÞJÓNUSTA */}
      <section id="services" className="py-16 sm:py-24 relative">
        <NeonDivider />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold">Þjónusta</h2>
            <a href="#contact" className="text-sm inline-flex items-center gap-1 opacity-80 hover:opacity-100">
              Verðleggja verkefni <ChevronRight size={16} />
            </a>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard Icon={Shield} title="CCTV & viðvörun" desc="Dahua, Hikvision, greining með AI, ANPR, eftirlit allan sólarhringinn." />
            <ServiceCard Icon={House} title="Snjallt heimili" desc="Loxone, Shelly, Home Assistant, Grenton. Sjálfvirkni og senur." />
            <ServiceCard Icon={Network} title="Netkerfi" desc="Hönnun & innleiðing: VLAN, VPN, Wi-Fi 6/7, ljósleiðari." />
            <ServiceCard Icon={Lightbulb} title="LED & lýsing" desc="Lýsingarverkefni, DMX, addressable LED, svið/viðburðir." />
            <ServiceCard Icon={Camera} title="Mynddyrasímar" desc="IP/PoE, fjartenging, samþætting við öpp." />
            <ServiceCard Icon={Hotel} title="Hótel & veitingar" desc="Digital signage, HACCP-eftirlit, sjálfvirkni bakhúss." />
          </div>
        </div>
      </section>

      {/* UM OKKUR */}
      <section id="about" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6">
            <div
              className="lg:col-span-2 rounded-3xl border border-white/10 p-6 sm:p-8 bg-white/5"
              style={{ boxShadow: `0 0 60px ${brand.primary}14` }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Af hverju Rafbakki?</h3>
              <ul className="space-y-3 text-sm opacity-90">
                {[
                  "Reynsla úr heimilum, hótelum og atvinnuhúsnæði",
                  "Heill ferill: hönnun → framkvæmd → þjónusta → eftirlit",
                  "Örugg net og fjaraðgangur (VPN, VLAN-skipting)",
                  "Fegurð og afköst – létt, nútímaleg kerfi",
                ].map((x, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Bullet />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-3xl border border-white/10 p-6 sm:p-8 bg-white/5"
              style={{ boxShadow: `0 0 60px ${brand.neonPink}14` }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Vottanir & vörumerki</h3>
              <div className="grid grid-cols-2 gap-3 text-xs opacity-80">
                {["Loxone", "Grenton", "Shelly", "Dahua", "Hikvision", "Free@home", "UniFi", "Satel"].map((b) => (
                  <div
                    key={b}
                    className="rounded-xl border border-white/10 px-3 py-2 text-center bg-white/5"
                    style={{ boxShadow: `inset 0 0 0 1px #ffffff10, 0 0 20px ${brand.neonLime}0f` }}
                  >
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VERKEFNI */}
      <section id="projects" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold">Verkefni</h2>
            <div className="flex gap-2 text-xs">
              {["Allt", "Heimili", "Hótel", "Viðskipti", "Viðburðir"].map((f) => (
                <button key={f} className="px-3 py-1 rounded-xl border border-white/15 hover:bg-white/10">
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <article
                key={i}
                className="group rounded-3xl overflow-hidden border border-white/20 bg-white/5 relative"
                style={{ boxShadow: `0 0 40px ${brand.primary}0f` }}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={`/projects/project${i + 1}.jpg`}
                    alt={`Verkefni ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ boxShadow: `inset 0 0 30px ${brand.primary}22, 0 0 20px ${brand.neonPink}33` }}
                  />
                </div>
               
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HAFA SAMBAND */}
<section id="contact" className="py-16 sm:py-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
    {/* Karty kontaktów */}
    <div className="grid md:grid-cols-2 gap-6">
      {/* Aðalgeir */}
      <div
        className="rounded-3xl border border-white/10 p-6 bg-white/5"
        style={{ boxShadow: `0 0 40px ${brand.neonPink}18` }}
      >
        <h3 className="text-lg font-semibold mb-2">Aðalgeir Bjarki Þorsteinsson</h3>
        <ul className="space-y-2 text-sm opacity-90">
          <li className="flex items-center gap-3"><Phone size={16} /> +354 848 0153</li>
          <li className="flex items-center gap-3"><MapPin size={16} /> 810 Hveragerði</li>
          <li className="flex items-center gap-3"><Mail size={16} /> geiribjarki@gmail.com</li>
        </ul>
        <div className="mt-4 aspect-[4/3] rounded-2xl border border-white/10 overflow-hidden">
          <iframe
            title="Hveragerði – kort"
            src="https://www.google.com/maps?q=Hveragerði,Iceland&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full border-0"
            allowFullScreen
          />
        </div>
      </div>

      {/* Dominik */}
      <div
        className="rounded-3xl border border-white/10 p-6 bg-white/5"
        style={{ boxShadow: `0 0 40px ${brand.neonViolet}18` }}
      >
        <h3 className="text-lg font-semibold mb-2">Dominik Urzeniczok</h3>
        <ul className="space-y-2 text-sm opacity-90">
          <li className="flex items-center gap-3"><Phone size={16} /> +354 765 5233</li>
          <li className="flex items-center gap-3"><MapPin size={16} /> 340 Stykkishólmur</li>
          <li className="flex items-center gap-3"><Mail size={16} /> dominik-urzeniczok@wp.pl</li>
        </ul>
        <div className="mt-4 aspect-[4/3] rounded-2xl border border-white/10 overflow-hidden">
          <iframe
            title="Stykkishólmur – kort"
            src="https://www.google.com/maps?q=Stykkishólmur,Iceland&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full border-0"
            allowFullScreen
          />
        </div>
      </div>
    </div>

    {/* FORMULARZ */}
    <div
      className="rounded-3xl border border-white/10 p-6 sm:p-8 bg-white/5"
      style={{ boxShadow: `0 0 60px ${brand.primary}18` }}
    >
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Hafa samband</h2>
      <ContactForm />
    </div>
  </div>
</section>


      {/* FÓTUR */}
      <footer className="border-t border-white/10 py-10 relative">
        <NeonDivider />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm opacity-70">© 2026 Rafbakki — Öll réttindi áskilin</div>
            <div className="flex items-center gap-4 text-sm opacity-80">
              <a href="#">Meðferð persónuupplýsinga</a>
              <a href="#">Vafrakökur</a>
              <a href="#">Skilmálar</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* --- HJÁLPARHLUTAR --- */
type ServiceCardProps = { Icon: React.ComponentType<{ size?: number }>; title: string; desc: string };
function ServiceCard({ Icon, title, desc }: ServiceCardProps) {
  return (
    <div
      className="rounded-3xl p-5 bg-white/5 border border-white/10 transition-all hover:-translate-y-0.5 hover:scale-[1.02]"
      style={{ boxShadow: `inset 0 0 0 1px #ffffff12, 0 0 35px ${brand.neonPink}14` }}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-2xl border border-white/15 group-hover:animate-pulse" style={{ background: "rgba(69,180,232,0.08)", boxShadow: `0 0 15px ${brand.primary}33` }}>
          <Icon size={18} />
        </div>
        <div className="font-semibold">{title}</div>
      </div>
      <p className="text-sm opacity-80 mt-2">{desc}</p>
      <a href="#contact" className="mt-4 inline-flex items-center gap-1 text-sm opacity-90 hover:opacity-100">
        Spyrja <ArrowRight size={16} />
      </a>
    </div>
  );
}

function Bullet() {
  return (
    <span
      className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full text-[12px] animate-pulse"
      style={{ background: `linear-gradient(180deg, ${brand.primary}33, ${brand.neonPink}22)`, color: brand.primary, boxShadow: `0 0 12px ${brand.primary}55` }}
    >
      •
    </span>
  );
}

function PlayIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
    </svg>
  );
}

type NeonButtonProps = {
  href?: string;
  onClick?: () => void;
  label: string;
  Icon?: React.ComponentType<{ size?: number }>;
  full?: boolean;
  gradient?: [string, string];
  type?: "button" | "submit" | "reset";
};
function NeonButton({
  href,
  onClick,
  label,
  Icon,
  full = false,
  gradient = [brand.primary, brand.neonPink],
  type,
}: NeonButtonProps) {
  const content = (
    <span className="relative inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold">
      {Icon ? <Icon size={18} /> : <Zap size={18} />} {label}
    </span>
  );
  const style: React.CSSProperties = {
    backgroundImage: `linear-gradient(90deg, ${gradient[0]}, ${gradient[1]})`,
    color: "#0b0f14",
    boxShadow: `0 0 24px ${gradient[0]}66, 0 0 40px ${gradient[1]}33`,
  };
  if (href) {
    return (
      <a href={href} className={full ? "w-full inline-flex justify-center" : "inline-flex"} style={style}>
        {content}
      </a>
    );
  }
  return (
    <button type={type || "button"} onClick={onClick} className={full ? "w-full inline-flex justify-center" : "inline-flex"} style={style}>
      {content}
    </button>
  );
}

type NeonGhostButtonProps = { href: string; label: string; Icon?: React.ComponentType<{ size?: number }> };
function NeonGhostButton({ href, label, Icon }: NeonGhostButtonProps) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold border border-white/20 hover:bg-white/10"
      style={{ boxShadow: `0 0 20px ${brand.primary}22` }}
    >
      {label} {Icon ? <Icon size={18} /> : null}
    </a>
  );
}

function NeonDivider() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 -top-2 h-px"
      style={{ background: `linear-gradient(90deg, transparent, ${brand.primary}, ${brand.neonPink}, ${brand.neonViolet}, transparent)` }}
    />
  );
}

function NeonBackdrop() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* línunet */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(${brand.primary}11 1px, transparent 1px), linear-gradient(90deg, ${brand.primary}11 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      {/* gradientblettir */}
      <div
        className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-30"
        style={{ background: `radial-gradient(circle, ${brand.primary}, transparent 60%)` }}
      />
      <div
        className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-25"
        style={{ background: `radial-gradient(circle, ${brand.neonPink}, transparent 60%)` }}
      />
    </div>
  );
}

