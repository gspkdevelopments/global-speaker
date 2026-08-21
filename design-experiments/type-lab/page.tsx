import {
  Fraunces,
  Inter,
  Newsreader,
  Work_Sans,
  Instrument_Serif,
  Manrope,
} from "next/font/google";

// Preserved as a local design experiment; this file is intentionally outside src/app.

const fraunces = Fraunces({ subsets: ["latin"], variable: "--a-serif", axes: ["opsz", "SOFT", "WONK"] });
const inter = Inter({ subsets: ["latin"], variable: "--a-sans" });

const newsreader = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], variable: "--b-serif" });
const workSans = Work_Sans({ subsets: ["latin"], variable: "--b-sans" });

const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--c-serif" });
const manrope = Manrope({ subsets: ["latin"], variable: "--c-sans" });

const HERO = "Speak more of the world.";
const SECTION_HEADING = "Your life is already full of lessons.";
const NAV = ["Learn", "Method", "Resources", "Culture", "About"];
const ARTICLE = `The words "see," "look," and "watch" all describe using your eyes, but they don't describe the same relationship with attention. See is passive — it happens to you. Look is a choice — you direct your eyes toward something. Watch implies duration — you stay with it as it unfolds.`;

type System = {
  id: "A" | "B" | "C";
  name: string;
  pairing: string;
  serifVar: string;
  sansVar: string;
  serifFamily: string;
  sansFamily: string;
  note: string;
};

const systems: System[] = [
  {
    id: "A",
    name: "Editorial Warm",
    pairing: "Fraunces + Inter",
    serifVar: "--a-serif",
    sansVar: "--a-sans",
    serifFamily: fraunces.style.fontFamily,
    sansFamily: inter.style.fontFamily,
    note: "Fraunces is a soft, expressive display serif built for editorial/cultural brands — warm without being decorative. Inter is a neutral, highly legible interface face that stays out of the way.",
  },
  {
    id: "B",
    name: "Literary Journal",
    pairing: "Newsreader + Work Sans",
    serifVar: "--b-serif",
    sansVar: "--b-sans",
    serifFamily: newsreader.style.fontFamily,
    sansFamily: workSans.style.fontFamily,
    note: "Newsreader is optimized for long-form reading with a literary, journal-like character and elegant italics. Work Sans is a humanist grotesque with warmer curves than a typical UI sans.",
  },
  {
    id: "C",
    name: "Expressive Voice",
    pairing: "Instrument Serif + Manrope",
    serifVar: "--c-serif",
    sansVar: "--c-sans",
    serifFamily: instrument.style.fontFamily,
    sansFamily: manrope.style.fontFamily,
    note: "Instrument Serif has a calligraphic, high-contrast personality that gives hero moments real voice. Manrope's rounded terminals keep the interface friendly and human rather than sterile/SaaS.",
  },
];

function SystemBlock({ s }: { s: System }) {
  return (
    <section
      style={{
        borderTop: "1px solid var(--ink)",
        paddingBlock: "3.5rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "2.5rem" }}>
        <span style={{ fontFamily: "var(--sans)", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--terracotta)" }}>
          System {s.id}
        </span>
        <h2 style={{ margin: 0, fontFamily: "var(--sans)", fontSize: "1.1rem", fontWeight: 700 }}>{s.name}</h2>
        <span style={{ fontFamily: "var(--sans)", fontSize: ".78rem", color: "var(--ink-soft)" }}>{s.pairing}</span>
      </div>

      <p style={{ maxWidth: 680, marginTop: 0, marginBottom: "3rem", fontFamily: "var(--sans)", fontSize: ".85rem", lineHeight: 1.6, color: "var(--ink-soft)" }}>
        {s.note}
      </p>

      {/* Nav test */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.6rem", alignItems: "center", marginBottom: "3rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--line)" }}>
        <span style={{ fontFamily: s.sansFamily, fontSize: ".76rem", fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase" }}>
          Global Speaker
        </span>
        {NAV.map((n) => (
          <span key={n} style={{ fontFamily: s.sansFamily, fontSize: ".78rem", fontWeight: 700 }}>{n}</span>
        ))}
        <span style={{ marginLeft: "auto", fontFamily: s.sansFamily, fontSize: ".72rem", fontWeight: 800, borderBottom: "1px solid var(--ink)", paddingBottom: 3 }}>
          Start Learning
        </span>
      </div>

      {/* Hero test - desktop scale */}
      <h1
        style={{
          margin: "0 0 .5rem",
          maxWidth: 780,
          fontFamily: s.serifFamily,
          fontWeight: 400,
          fontSize: "clamp(4.2rem, 8vw, 8rem)",
          letterSpacing: "-.055em",
          lineHeight: 0.95,
        }}
      >
        {HERO}
      </h1>
      <p style={{ margin: "1.5rem 0 3rem", maxWidth: 460, fontFamily: s.serifFamily, fontStyle: s.id === "A" ? "normal" : "italic", fontSize: "1.4rem", lineHeight: 1.4, color: "var(--ink-soft)" }}>
        Learn the language through the life you already live.
      </p>

      {/* Hero test - mobile wrap, 375px frame */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", marginBottom: "3rem" }}>
        <div>
          <div style={{ fontFamily: "var(--sans)", fontSize: ".62rem", fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: ".6rem" }}>
            Mobile — 375px frame
          </div>
          <div style={{ width: 375, border: "1px solid var(--ink)", padding: "1.5rem", background: "var(--surface)" }}>
            <h1 style={{ margin: 0, fontFamily: s.serifFamily, fontWeight: 400, fontSize: "clamp(2.6rem, 13vw, 3.4rem)", letterSpacing: "-.04em", lineHeight: 1 }}>
              {HERO}
            </h1>
          </div>
        </div>

        {/* Section heading test */}
        <div>
          <div style={{ fontFamily: "var(--sans)", fontSize: ".62rem", fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: ".6rem" }}>
            Section heading
          </div>
          <div style={{ width: 375, border: "1px solid var(--line)", padding: "1.5rem", background: "var(--surface)" }}>
            <h2 style={{ margin: 0, fontFamily: s.serifFamily, fontWeight: 400, fontSize: "2.4rem", letterSpacing: "-.04em", lineHeight: 1 }}>
              {SECTION_HEADING}
            </h2>
          </div>
        </div>
      </div>

      {/* Article reading test */}
      <div style={{ maxWidth: 620 }}>
        <div style={{ fontFamily: "var(--sans)", fontSize: ".62rem", fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: ".6rem" }}>
          Article body — 17px equivalent
        </div>
        <p style={{ margin: 0, fontFamily: s.serifFamily, fontSize: "1.15rem", lineHeight: 1.65 }}>
          {ARTICLE}
        </p>
      </div>
    </section>
  );
}

export default function TypeLabPage() {
  return (
    <div
      className={`${fraunces.variable} ${inter.variable} ${newsreader.variable} ${workSans.variable} ${instrument.variable} ${manrope.variable}`}
      style={{ background: "var(--paper)", minHeight: "100vh", padding: "3rem 0 8rem" }}
    >
      <div className="container">
        <p style={{ fontFamily: "var(--sans)", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--terracotta)", marginBottom: ".5rem" }}>
          Internal — Typography Lab
        </p>
        <h1 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: "clamp(2.5rem,5vw,4rem)", letterSpacing: "-.03em", margin: "0 0 1rem" }}>
          Three type systems
        </h1>
        <p style={{ maxWidth: 640, fontFamily: "var(--sans)", fontSize: ".95rem", color: "var(--ink-soft)", lineHeight: 1.6 }}>
          Not linked from navigation. Compare each system on the hero line, nav, section heading, mobile wrap, and article body before propagating a winner across the site.
        </p>

        {systems.map((s) => (
          <SystemBlock key={s.id} s={s} />
        ))}
      </div>
    </div>
  );
}
