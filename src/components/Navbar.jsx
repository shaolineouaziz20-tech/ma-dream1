import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
// Place your logo as /public/logo.png
const logoImg = "/logo.png";

const LANGS = ["fr", "en", "es"];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { key: "home",     href: "#home" },
    { key: "about",    href: "#about" },
    { key: "products", href: "#products" },
    { key: "contact",  href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? "0.6rem 1.5rem" : "1rem 1.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
        transition: "all 0.4s ease",
        boxSizing: "border-box",
        width: "100%",
        overflow: "visible",
      }}
    >
      {/* Logo */}
      <a href="#home" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <img
          src={logoImg}
          alt="MA DREAM Logo"
          style={{ height: scrolled ? "44px" : "52px", width: "auto", transition: "height 0.4s ease", objectFit: "contain" }}
        />
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.3rem", fontWeight: 700,
          color: scrolled ? "var(--text)" : "#fff",
          letterSpacing: "0.06em",
          transition: "color 0.4s ease",
        }}>
          MA DREAM
        </span>
      </a>

      {/* Desktop links */}
      <div style={{ display: "flex", gap: "1.75rem", alignItems: "center" }} className="desktop-nav">
        {links.map((l) => (
          <a key={l.key} href={l.href}
            style={{
              color: scrolled ? "var(--text-muted)" : "rgba(255,255,255,0.85)",
              fontSize: "0.8rem", letterSpacing: "0.1em",
              textTransform: "uppercase", fontWeight: 500,
              transition: "color 0.3s", position: "relative",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = scrolled ? "var(--text-muted)" : "rgba(255,255,255,0.85)")}
          >
            {t(`nav.${l.key}`)}
          </a>
        ))}

        <a href="#quote" style={{
          background: "linear-gradient(135deg, var(--primary), #14a085)",
          color: "#fff", padding: "0.55rem 1.4rem", borderRadius: "4px",
          fontSize: "0.78rem", letterSpacing: "0.08em",
          textTransform: "uppercase", fontWeight: 700,
          boxShadow: "0 4px 14px rgba(13,115,119,0.3)",
          transition: "opacity 0.3s, transform 0.2s",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          {t("nav.quote")}
        </a>

        {/* Lang switcher */}
        <div style={{ display: "flex", gap: "0.3rem" }}>
          {LANGS.map((l) => (
            <button key={l} onClick={() => i18n.changeLanguage(l)} style={{
              background: i18n.language === l ? "var(--accent)" : "transparent",
              color: i18n.language === l ? "#fff" : (scrolled ? "var(--text-muted)" : "rgba(255,255,255,0.7)"),
              border: `1px solid ${i18n.language === l ? "var(--accent)" : (scrolled ? "var(--border)" : "rgba(255,255,255,0.3)")}`,
              borderRadius: "3px", padding: "0.2rem 0.45rem",
              fontSize: "0.68rem", cursor: "pointer", fontWeight: 700,
              textTransform: "uppercase", transition: "all 0.3s",
            }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="hamburger"
        aria-label="Menu"
        style={{
          display: "none", background: "none", border: "none",
          cursor: "pointer", flexDirection: "column", gap: "5px", padding: "4px",
        }}
      >
        {[0, 1, 2].map((i) => (
          <span key={i} style={{
            display: "block", width: "24px", height: "2px",
            background: scrolled ? "var(--text)" : "#fff",
            borderRadius: "2px", transition: "all 0.3s",
          }} />
        ))}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{
              position: "fixed", top: scrolled ? "56px" : "72px", left: 0, right: 0,
              background: "rgba(255,255,255,0.98)", backdropFilter: "blur(16px)",
              padding: "1.25rem 1.5rem 1.75rem",
              display: "flex", flexDirection: "column", gap: "1.1rem",
              boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
              zIndex: 999,
              width: "100vw",
              boxSizing: "border-box",
            }}
          >
            {links.map((l) => (
              <a key={l.key} href={l.href} onClick={() => setOpen(false)}
                style={{ color: "var(--text)", fontSize: "1.1rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {t(`nav.${l.key}`)}
              </a>
            ))}
            <a href="#quote" onClick={() => setOpen(false)} style={{
              background: "linear-gradient(135deg, var(--primary), #14a085)",
              color: "#fff", padding: "0.75rem 1.5rem", borderRadius: "4px",
              fontSize: "0.9rem", textAlign: "center", fontWeight: 700,
            }}>
              {t("nav.quote")}
            </a>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {LANGS.map((l) => (
                <button key={l} onClick={() => { i18n.changeLanguage(l); setOpen(false); }} style={{
                  background: i18n.language === l ? "var(--accent)" : "transparent",
                  color: i18n.language === l ? "#fff" : "var(--text-muted)",
                  border: "1px solid var(--border)",
                  borderRadius: "3px", padding: "0.3rem 0.65rem",
                  fontSize: "0.75rem", cursor: "pointer", fontWeight: 700, textTransform: "uppercase",
                }}>
                  {l}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}
