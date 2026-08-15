import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

// Free stock video — "Fishing Boat, Sea, Offshore, Blue" — Pixabay #182082 (4K, Editor's Choice)
// Source: https://pixabay.com/videos/fishing-boat-sea-offshore-blue-182082/
const HERO_VIDEO = "https://cdn.pixabay.com/video/2023/09/24/182082-867762198_large.mp4";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section id="home" style={{
      minHeight: "100vh", position: "relative",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
    }}>
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute", inset: 0, zIndex: 0,
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center",
        }}
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: "linear-gradient(180deg, rgba(10,20,30,0.45) 0%, rgba(10,20,30,0.65) 50%, rgba(10,20,30,0.85) 100%)",
      }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 3,
        textAlign: "center", padding: "0 1.5rem",
        maxWidth: "860px", width: "100%",
      }}>
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ marginBottom: "1.75rem", display: "flex", justifyContent: "center" }}
        >
          <img
              src="/logo.png"
              alt="MA DREAM"
              style={{
                height: "clamp(70px, 12vw, 110px)",
                width: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            fontSize: "clamp(0.65rem, 1.5vw, 0.78rem)",
            letterSpacing: "0.35em", textTransform: "uppercase",
            color: "var(--accent-light)", marginBottom: "1.25rem", fontWeight: 500,
          }}
        >
          MA DREAM SARL — DAKHLA, MAROC
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.9 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.2rem, 6.5vw, 5rem)",
            fontWeight: 300, lineHeight: 1.12,
            color: "#fff", marginBottom: "1.25rem",
          }}
        >
          {t("hero.tagline")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          style={{
            fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
            color: "rgba(255,255,255,0.72)",
            marginBottom: "2.75rem", letterSpacing: "0.03em",
          }}
        >
          {t("hero.sub")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          <a href="#products" style={{
            padding: "0.85rem 2.25rem",
            border: "1.5px solid rgba(255,255,255,0.6)",
            color: "#fff", borderRadius: "4px",
            fontSize: "0.8rem", letterSpacing: "0.12em",
            textTransform: "uppercase", fontWeight: 600,
            transition: "all 0.3s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.borderColor = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)"; }}
          >
            {t("hero.cta")}
          </a>
          <a href="#quote" style={{
            padding: "0.85rem 2.25rem",
            background: "linear-gradient(135deg, var(--primary), #14a085)",
            color: "#fff", borderRadius: "4px",
            fontSize: "0.8rem", letterSpacing: "0.12em",
            textTransform: "uppercase", fontWeight: 700,
            boxShadow: "0 6px 20px rgba(13,115,119,0.45)",
            transition: "all 0.3s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(13,115,119,0.5)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(13,115,119,0.45)"; }}
          >
            {t("hero.cta2")}
          </a>
        </motion.div>
      </div>

      {/* Scroll line */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
        style={{
          position: "absolute", bottom: "2rem", right: "2rem", zIndex: 4,
          display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
        }}
      >
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", writingMode: "vertical-rl" }}>
          Scroll
        </span>
        <div style={{ width: "1px", height: "40px", background: "linear-gradient(180deg, rgba(255,255,255,0.4), transparent)" }} />
      </motion.div>
    </section>
  );
}
