import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function About() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const stats = [
    { value: "10+", label: "Pays exportés" },
    { value: "100%", label: "Qualité certifiée" },
    { value: "2",   label: "Zones de pêche" },
    { value: "24/7",label: "Disponibilité" },
  ];

  return (
    <section id="about" style={{ background: "var(--bg-alt)", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: "-150px", right: "-150px",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(13,115,119,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <h2 className="section-title">{t("about.title")}</h2>
          <div className="section-line" />
        </motion.div>

        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "var(--text-muted)", marginBottom: "1.5rem" }}>
              {t("about.p1")}
            </p>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "var(--text-muted)", marginBottom: "2.5rem" }}>
              {t("about.p2")}
            </p>
            <div style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <span style={{ color: "var(--text)", fontSize: "0.95rem", fontWeight: 700 }}>MA DREAM SARL</span>
              <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{t("about.rc")}</span>
              <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{t("about.address")}</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            {stats.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                style={{
                  background: "var(--bg)", border: "1.5px solid var(--border)",
                  borderRadius: "12px", padding: "1.75rem 1.25rem",
                  textAlign: "center", transition: "border-color 0.3s, box-shadow 0.3s",
                  boxShadow: "0 2px 12px var(--shadow)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(13,115,119,0.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "0 2px 12px var(--shadow)"; }}
              >
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2.5rem", fontWeight: 700,
                  background: "linear-gradient(135deg, var(--primary), var(--accent))",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  marginBottom: "0.4rem",
                }}>
                  {s.value}
                </div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.78rem", letterSpacing: "0.05em", fontWeight: 500 }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  );
}
