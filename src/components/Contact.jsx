import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const CONTACTS = [
  { name: "+212 625 743 105", role: "commercial", wa: "212625743105" },
  { name: "+212 649 046 690", role: "commercial", wa: "212649046690" },
  { name: "+212 657 419 947", role: "director",   wa: "212657419947" },
  { name: "+212 628 117 316", role: "director",   wa: "212628117316" },
];

export default function Contact() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="contact" style={{ background: "var(--bg-alt)", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "3px",
        background: "linear-gradient(90deg, var(--primary), var(--accent), var(--primary))",
      }} />

      <div className="container" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <h2 className="section-title">{t("contact.title")}</h2>
          <div className="section-line" />
        </motion.div>

        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem", marginBottom: "2.5rem" }}>
          {CONTACTS.map((c, i) => (
            <motion.a key={i} href={`https://wa.me/${c.wa}`}
              target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              style={{
                display: "block", background: "#fff",
                border: "1.5px solid var(--border)", borderRadius: "12px",
                padding: "1.5rem 1.25rem", textDecoration: "none",
                boxShadow: "0 2px 12px var(--shadow)",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#25D366"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,211,102,0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "0 2px 12px var(--shadow)"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: "rgba(37,211,102,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <WaIcon />
                </div>
                <span style={{
                  fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700,
                  color: c.role === "director" ? "var(--accent)" : "var(--primary)",
                }}>
                  {t(`contact.${c.role}`)}
                </span>
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: "var(--text)", fontWeight: 700 }}>
                {c.name}
              </div>
              <div style={{ marginTop: "0.75rem", fontSize: "0.72rem", color: "#25D366", fontWeight: 600, letterSpacing: "0.05em" }}>
                WhatsApp →
              </div>
            </motion.a>
          ))}
        </div>

        {/* Address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            background: "var(--bg)", border: "1.5px solid var(--border)",
            borderRadius: "12px", padding: "1.75rem 2rem",
            display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap",
            boxShadow: "0 2px 12px var(--shadow)",
          }}
        >
          <div style={{
            width: "48px", height: "48px", borderRadius: "50%",
            background: "rgba(13,115,119,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.8">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
          </div>
          <div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.3rem", fontWeight: 600 }}>
              {t("contact.address")}
            </div>
            <div style={{ color: "var(--text)", fontSize: "1rem", fontWeight: 600 }}>
              Hay Ennahda 01, N° 1452 — Dakhla, Maroc
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.82rem", marginTop: "0.2rem" }}>
              RC : 28657 · MA DREAM SARL
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) { .contact-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 500px) { .contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function WaIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="#25D366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
