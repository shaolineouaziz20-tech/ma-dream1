import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ALL_PRODUCTS = [
  "Mackerel / Maquereau / Caballa",
  "Horse Mackerel / Chinchard / Jurel",
  "Mullet / Mulet / Mújol",
  "Bonito",
  "Sepia / Seiche",
  "Pulpo / Poulpe",
  "Calamar / Squid",
  "Crevettes / Gambas / Shrimp",
  "Sole / Lenguado",
  "Crabe Bleu / Blue Crab / Cangrejo Azul",
];

const WA_NUMBERS = ["212657419947", "212625743105"];

export default function QuoteForm() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", country: "", product: "", quantity: "", message: "" });

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = [
      `🐟 *MA DREAM SARL — Demande d'Offre*`, ``,
      `👤 *Nom:* ${form.name}`,
      form.company  ? `🏢 *Société:* ${form.company}` : null,
      form.email    ? `📧 *Email:* ${form.email}` : null,
      `📞 *Téléphone:* ${form.phone}`,
      form.country  ? `🌍 *Pays:* ${form.country}` : null,
      `🐠 *Produit:* ${form.product}`,
      form.quantity ? `⚖️ *Quantité:* ${form.quantity} tonnes` : null,
      form.message  ? `💬 *Message:* ${form.message}` : null,
    ].filter(Boolean).join("\n");

    const encoded = encodeURIComponent(msg);
    // Open first number immediately, second after a short delay
    window.open(`https://wa.me/${WA_NUMBERS[0]}?text=${encoded}`, "_blank");
    setTimeout(() => {
      window.open(`https://wa.me/${WA_NUMBERS[1]}?text=${encoded}`, "_blank");
    }, 1500);
  };

  const inputStyle = {
    width: "100%", background: "#fff",
    border: "1.5px solid var(--border)", borderRadius: "8px",
    padding: "0.85rem 1rem", color: "var(--text)",
    fontSize: "0.9rem", outline: "none",
    transition: "border-color 0.3s, box-shadow 0.3s",
    fontFamily: "'Inter', sans-serif",
  };
  const labelStyle = {
    display: "block", color: "var(--text-muted)",
    fontSize: "0.75rem", letterSpacing: "0.08em",
    textTransform: "uppercase", marginBottom: "0.4rem", fontWeight: 600,
  };
  const onFocus = (e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(13,115,119,0.1)"; };
  const onBlur  = (e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; };

  const fields = [
    { name: "name",     label: t("form.name"),     required: true,  type: "text" },
    { name: "company",  label: t("form.company"),  required: false, type: "text" },
    { name: "email",    label: t("form.email"),    required: false, type: "email" },
    { name: "phone",    label: t("form.phone"),    required: true,  type: "tel" },
    { name: "country",  label: t("form.country"),  required: false, type: "text" },
    { name: "quantity", label: t("form.quantity"), required: false, type: "number" },
  ];

  return (
    <section id="quote" style={{ background: "var(--bg)", position: "relative" }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(13,115,119,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container" ref={ref} style={{ maxWidth: "780px" }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <h2 className="section-title">{t("form.title")}</h2>
          <div className="section-line" />
          <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "3rem", fontSize: "0.95rem", lineHeight: 1.7 }}>
            {t("form.sub")}
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          style={{
            background: "#fff", border: "1.5px solid var(--border)",
            borderRadius: "16px", padding: "2.5rem",
            boxShadow: "0 4px 30px var(--shadow-lg)",
          }}
        >
          <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            {fields.map((f) => (
              <div key={f.name}>
                <label style={labelStyle}>{f.label}{f.required && " *"}</label>
                <input name={f.name} type={f.type} required={f.required}
                  value={form[f.name]} onChange={handleChange}
                  style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>
            ))}
          </div>

          <div style={{ marginTop: "1.25rem" }}>
            <label style={labelStyle}>{t("form.product")} *</label>
            <select name="product" required value={form.product} onChange={handleChange}
              style={{ ...inputStyle, cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}>
              <option value="">{t("form.selectProduct")}</option>
              {ALL_PRODUCTS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div style={{ marginTop: "1.25rem" }}>
            <label style={labelStyle}>{t("form.message")}</label>
            <textarea name="message" rows={4} value={form.message} onChange={handleChange}
              style={{ ...inputStyle, resize: "vertical" }} onFocus={onFocus} onBlur={onBlur} />
          </div>

          <motion.button type="submit" whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.97 }}
            style={{
              marginTop: "2rem", width: "100%", padding: "1rem",
              background: "linear-gradient(135deg, #25D366, #128C7E)",
              color: "#fff", border: "none", borderRadius: "8px",
              fontSize: "0.95rem", fontWeight: 700, letterSpacing: "0.08em",
              textTransform: "uppercase", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
              fontFamily: "'Inter', sans-serif",
              boxShadow: "0 6px 20px rgba(37,211,102,0.3)",
            }}>
            <WaIcon />
            {t("form.submit")}
          </motion.button>
        </motion.form>
      </div>

      <style>{`@media (max-width: 600px) { .form-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

function WaIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
