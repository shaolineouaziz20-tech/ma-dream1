import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const MOROCCO_PRODUCTS = [
  {
    key: "mackerel", seasonal: false,
    imgs: ["/maroc/Maquereau/image_1.jpeg", "/maroc/Maquereau/image_2.jpeg", "/maroc/Maquereau/image_3.jpeg", "/maroc/Maquereau/image_4.jpeg"],
    origin: "Atlantique Nord — Dakhla",
    specs: ["Scomber scombrus", "Congelé entier / en filet", "Calibres: 200-300g, 300-500g, 500g+"],
  },
  {
    key: "horseMackerel", seasonal: false,
    imgs: ["/maroc/Chinchard/image_1.jpeg"],
    origin: "Atlantique — Côte Marocaine",
    specs: ["Trachurus trachurus", "Congelé entier / en filet", "Calibres: 100-200g, 200-400g"],
  },
  {
    key: "mullet", seasonal: false,
    imgs: ["/maroc/Mulet/image_1.jpeg", "/maroc/Mulet/image_2.jpeg", "/maroc/Mulet/image_3.jpeg"],
    origin: "Côtes Atlantiques — Maroc",
    specs: ["Mugil cephalus", "Frais / Congelé entier", "Calibres: 300-500g, 500g-1kg"],
  },
  {
    key: "bonito", seasonal: false,
    imgs: ["/maroc/Bonite/image_1.jpeg", "/maroc/Bonite/image_2.jpeg", "/maroc/Bonite/image_3.jpeg", "/maroc/Bonite/image_4.jpeg", "/maroc/Bonite/image_5.jpeg", "/maroc/Bonite/image_6.jpeg"],
    origin: "Atlantique — Eaux Marocaines",
    specs: ["Sarda sarda", "Congelé entier / en filet", "Calibres: 500g-1kg, 1kg+"],
  },
  {
    key: "sepia", seasonal: true,
    imgs: ["/maroc/Sepia/image_1.jpeg", "/maroc/Sepia/image_2.jpeg", "/maroc/Sepia/image_3.jpeg", "/maroc/Sepia/image_4.jpeg", "/maroc/Sepia/image_5.jpeg"],
    origin: "Atlantique Sud — Dakhla",
    specs: ["Sepia officinalis", "Congelée entière / nettoyée", "Calibres: 100-300g, 300-500g, 500g+"],
  },
  {
    key: "pulpo", seasonal: true,
    imgs: ["/maroc/Poulpe/image_1.jpeg", "/maroc/Poulpe/image_2.jpeg", "/maroc/Poulpe/image_3.jpeg", "/maroc/Poulpe/image_4.jpeg", "/maroc/Poulpe/image_5.jpeg", "/maroc/Poulpe/image_6.jpeg", "/maroc/Poulpe/image_7.jpeg", "/maroc/Poulpe/image_8.jpeg", "/maroc/Poulpe/image_9.jpeg"],
    origin: "Atlantique — Dakhla / Laâyoune",
    specs: ["Octopus vulgaris", "Congelé entier / en morceaux", "Calibres: 1-2kg, 2-4kg, 4kg+"],
  },
  {
    key: "calamar", seasonal: true,
    imgs: ["/maroc/Calamar/image_1.jpeg", "/maroc/Calamar/image_2.jpeg", "/maroc/Calamar/image_3.jpeg", "/maroc/Calamar/image_4.jpeg", "/maroc/Calamar/image_5.jpeg", "/maroc/Calamar/image_6.jpeg", "/maroc/Calamar/image_7.jpeg", "/maroc/Calamar/image_8.jpeg", "/maroc/Calamar/image_9.jpeg"],
    origin: "Atlantique — Côte Marocaine",
    specs: ["Loligo vulgaris", "Congelé entier / nettoyé", "Calibres: 100-200g, 200-400g"],
  },
];

const SENEGAL_PRODUCTS = [
  {
    key: "crevettes", seasonal: false,
    imgs: ["/senegal/Crevettes/image_1.jpeg", "/senegal/Crevettes/image_2.jpeg", "/senegal/Crevettes/image_3.jpeg", "/senegal/Crevettes/image_4.jpeg"],
    origin: "Côtes Sénégalaises — Dakar",
    specs: ["Penaeus notialis", "Entières / Décortiquées / Cuites", "Calibres: 16/20, 21/25, 26/30"],
  },
  {
    key: "sole", seasonal: false,
    imgs: ["/senegal/Sole/image_1.jpeg", "/senegal/Sole/image_2.jpeg", "/senegal/Sole/image_3.jpeg", "/senegal/Sole/image_4.jpeg", "/senegal/Sole/image_5.jpeg", "/senegal/Sole/image_6.jpeg", "/senegal/Sole/image_7.jpeg"],
    origin: "Atlantique Est — Sénégal",
    specs: ["Cynoglossus senegalensis", "Fraîche / Congelée entière", "Calibres: 200-400g, 400-600g"],
  },
  {
    key: "crabBlue", seasonal: false,
    imgs: ["/senegal/Crabe Bleu/image_1.jpeg", "/senegal/Crabe Bleu/image_2.jpeg", "/senegal/Crabe Bleu/image_3.jpeg", "/senegal/Crabe Bleu/image_4.jpeg", "/senegal/Crabe Bleu/image_5.jpeg", "/senegal/Crabe Bleu/image_6.jpeg", "/senegal/Crabe Bleu/image_7.jpeg"],
    origin: "Côtes Atlantiques — Sénégal",
    specs: ["Callinectes sapidus", "Entier / Pinces / Chair", "Calibres: 150-250g, 250g+"],
  },
];

const FALLBACK = "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=700&q=80&fit=crop";

export default function Products() {
  const { t } = useTranslation();
  const [tab, setTab] = useState("morocco");
  const [selected, setSelected] = useState(null);
  const [lightbox, setLightbox] = useState(null); // { imgs, idx }
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const products = tab === "morocco" ? MOROCCO_PRODUCTS : SENEGAL_PRODUCTS;

  return (
    <section id="products" style={{ background: "var(--bg)", position: "relative" }}>
      <div className="container" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <h2 className="section-title">{t("products.title")}</h2>
          <div className="section-line" />
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: "flex", justifyContent: "center", margin: "0 auto 3rem", width: "fit-content", borderRadius: "8px", overflow: "hidden", border: "1.5px solid var(--border)", boxShadow: "0 2px 12px var(--shadow)" }}
        >
          {["morocco", "senegal"].map((key) => (
            <button key={key} onClick={() => setTab(key)} style={{
              padding: "0.8rem 2.5rem",
              background: tab === key ? "var(--primary)" : "#fff",
              color: tab === key ? "#fff" : "var(--text-muted)",
              border: "none", cursor: "pointer",
              fontSize: "0.82rem", letterSpacing: "0.1em",
              textTransform: "uppercase", fontWeight: 700,
              transition: "all 0.3s",
            }}>
              {t(`products.${key}`)}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.75rem" }}
          >
            {products.map((p, i) => (
              <ProductCard key={p.key} product={p} index={i} inView={inView} onDetails={() => setSelected(p)} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selected && (
          <ProductModal
            product={selected}
            onClose={() => setSelected(null)}
            onLightbox={(imgs, idx) => setLightbox({ imgs, idx })}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            imgs={lightbox.imgs}
            startIdx={lightbox.idx}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProductCard({ product, index, inView, onDetails }) {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const coverImg = product.imgs.length > 0 && !imgError ? product.imgs[0] : FALLBACK;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "14px", overflow: "hidden", background: "#fff",
        border: `1.5px solid ${hovered ? "var(--primary)" : "var(--border)"}`,
        boxShadow: hovered ? "0 16px 40px rgba(13,115,119,0.12)" : "0 2px 16px var(--shadow)",
        transition: "all 0.35s ease",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        display: "flex", flexDirection: "column",
      }}
    >
      <div style={{ position: "relative", height: "210px", overflow: "hidden", background: "#e8f0f5", flexShrink: 0 }}>
        <motion.img
          src={coverImg}
          alt={t(`products.items.${product.key}.name`)}
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          loading="lazy"
          onError={() => setImgError(true)}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.35) 100%)" }} />
        {product.seasonal && (
          <span style={{
            position: "absolute", top: "0.75rem", left: "0.75rem",
            background: "var(--accent)", color: "#fff",
            fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase",
            padding: "0.28rem 0.7rem", borderRadius: "20px", fontWeight: 700,
            boxShadow: "0 2px 8px rgba(201,168,76,0.4)",
          }}>
            {t("products.seasonal")}
          </span>
        )}
        {product.imgs.length > 1 && (
          <span style={{
            position: "absolute", top: "0.75rem", right: "0.75rem",
            background: "rgba(0,0,0,0.55)", color: "#fff",
            fontSize: "0.62rem", padding: "0.22rem 0.55rem",
            borderRadius: "20px", fontWeight: 600,
            display: "flex", alignItems: "center", gap: "0.3rem",
          }}>
            <IconCamera size={11} /> {product.imgs.length}
          </span>
        )}
        <span style={{
          position: "absolute", bottom: "0.75rem", left: "0.75rem",
          background: "rgba(255,255,255,0.92)", color: "var(--primary)",
          fontSize: "0.62rem", letterSpacing: "0.06em",
          padding: "0.22rem 0.6rem", borderRadius: "20px", fontWeight: 600,
          backdropFilter: "blur(4px)",
        }}>
          📍 {product.origin}
        </span>
      </div>

      <div style={{ padding: "1.4rem 1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.5rem" }}>
          {t(`products.items.${product.key}.name`)}
        </h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.7, flex: 1, marginBottom: "1.25rem" }}>
          {t(`products.items.${product.key}.desc`)}
        </p>
        <button onClick={onDetails} style={{
          width: "100%", padding: "0.7rem 1rem",
          background: hovered ? "var(--primary)" : "transparent",
          color: hovered ? "#fff" : "var(--primary)",
          border: "1.5px solid var(--primary)", borderRadius: "6px", cursor: "pointer",
          fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700,
          transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
          fontFamily: "'Inter', sans-serif",
        }}>
          <IconSearch size={14} /> Voir les détails
        </button>
      </div>

      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ height: "3px", flexShrink: 0, background: "linear-gradient(90deg, var(--primary), var(--accent))", transformOrigin: "left" }}
      />
    </motion.div>
  );
}

// ── Responsive hook ──────────────────────────────────────────────────────────
function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 700);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 700);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
}

function ProductModal({ product, onClose, onLightbox }) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [activeIdx, setActiveIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const touchStartX = useRef(null);
  const imgs = product.imgs.length > 0 ? product.imgs : [FALLBACK];

  const prev = useCallback(() => setActiveIdx((i) => (i - 1 + imgs.length) % imgs.length), [imgs.length]);
  const next = useCallback(() => setActiveIdx((i) => (i + 1) % imgs.length), [imgs.length]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: t(`products.items.${product.key}.name`), url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = imgs[activeIdx];
    a.download = `${product.key}_${activeIdx + 1}.jpeg`;
    a.click();
  };

  // ── layout differs mobile vs desktop ──
  const backdropAlign = isMobile ? "flex-end" : "center";
  const sheetStyle = isMobile
    ? {
        borderRadius: "20px 20px 0 0",
        width: "100%", maxWidth: "100%",
        height: "92dvh",
        boxShadow: "0 -8px 40px rgba(0,0,0,0.3)",
      }
    : {
        borderRadius: "18px",
        width: "92%", maxWidth: "680px",
        maxHeight: "90vh",
        boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
      };

  const motionProps = isMobile
    ? { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" }, transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] } }
    : { initial: { opacity: 0, scale: 0.94, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.94, y: 20 }, transition: { duration: 0.3, ease: "easeOut" } };

  const imgHeight = isMobile ? "48vw" : "260px";

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 2000,
        background: "rgba(10,20,30,0.7)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: backdropAlign, justifyContent: "center",
        padding: 0,
      }}
    >
      <motion.div
        {...motionProps}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{
          background: "#fff",
          display: "flex", flexDirection: "column",
          overflow: "hidden",
          ...sheetStyle,
        }}
      >
        {/* drag handle — mobile only */}
        {isMobile && (
          <div style={{ flexShrink: 0, display: "flex", justifyContent: "center", padding: "0.6rem 0 0.2rem" }}>
            <div style={{ width: "36px", height: "4px", borderRadius: "2px", background: "#ddd" }} />
          </div>
        )}

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>

          {/* Image */}
          <div style={{ position: "relative", height: imgHeight, minHeight: "180px", maxHeight: "320px", overflow: "hidden", background: "#e8f0f5", flexShrink: 0 }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIdx}
                src={imgs[activeIdx]}
                alt={t(`products.items.${product.key}.name`)}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </AnimatePresence>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 25%, rgba(0,0,0,0.6) 100%)" }} />

            {imgs.length > 1 && (
              <>
                <button onClick={prev} style={arrowBtn("left")}>‹</button>
                <button onClick={next} style={arrowBtn("right")}>›</button>
              </>
            )}

            {/* Icon bar top-right */}
            <div style={{ position: "absolute", top: "0.6rem", right: "0.6rem", display: "flex", gap: "0.35rem", zIndex: 10 }}>
              <IconBtn title="Plein écran" onClick={() => onLightbox(imgs, activeIdx)}><IconExpand size={14} /></IconBtn>
              <IconBtn title="Télécharger" onClick={handleDownload}><IconDownload size={14} /></IconBtn>
              <IconBtn title={copied ? "Copié !" : "Partager"} onClick={handleShare}>{copied ? <IconCheck size={14} /> : <IconShare size={14} />}</IconBtn>
              <IconBtn title="Fermer" onClick={onClose}><IconX size={14} /></IconBtn>
            </div>

            {/* Title overlay */}
            <div style={{ position: "absolute", bottom: "0.75rem", left: "1rem", right: "9rem" }}>
              {product.seasonal && (
                <span style={{ display: "inline-block", marginBottom: "0.25rem", background: "var(--accent)", color: "#fff", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.2rem 0.55rem", borderRadius: "20px", fontWeight: 700 }}>
                  {t("products.seasonal")}
                </span>
              )}
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.3rem, 4.5vw, 1.9rem)", fontWeight: 700, color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.5)", margin: 0, lineHeight: 1.2 }}>
                {t(`products.items.${product.key}.name`)}
              </h2>
            </div>

            {imgs.length > 1 && (
              <span style={{ position: "absolute", bottom: "0.75rem", right: "0.6rem", background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: "0.68rem", padding: "0.18rem 0.55rem", borderRadius: "20px" }}>
                {activeIdx + 1} / {imgs.length}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {imgs.length > 1 && (
            <div style={{ display: "flex", gap: "0.4rem", padding: "0.55rem 0.75rem", overflowX: "auto", background: "#f8f9fa", borderBottom: "1px solid var(--border)", scrollbarWidth: "none" }}>
              {imgs.map((src, i) => (
                <button key={i} onClick={() => setActiveIdx(i)} style={{ flexShrink: 0, width: "52px", height: "40px", borderRadius: "5px", overflow: "hidden", border: i === activeIdx ? "2px solid var(--primary)" : "2px solid transparent", cursor: "pointer", padding: 0, background: "none", transition: "border-color 0.2s" }}>
                  <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          )}

          {/* Body */}
          <div style={{ padding: "1.1rem 1.25rem 2rem" }}>
            <div style={{ marginBottom: "0.9rem" }}>
              <span style={{ background: "rgba(13,115,119,0.08)", color: "var(--primary)", fontSize: "0.75rem", fontWeight: 600, padding: "0.28rem 0.7rem", borderRadius: "20px", border: "1px solid rgba(13,115,119,0.15)" }}>
                📍 {product.origin}
              </span>
            </div>

            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.75, marginBottom: "1.1rem" }}>
              {t(`products.items.${product.key}.desc`)}
            </p>

            <div style={{ marginBottom: "1.4rem" }}>
              <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.55rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Spécifications
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                {product.specs.map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.45rem 0.75rem", background: i % 2 === 0 ? "var(--bg)" : "#fff", borderRadius: "6px", fontSize: "0.82rem", color: "var(--text)" }}>
                    <span style={{ color: "var(--primary)", fontWeight: 700 }}>—</span> {s}
                  </div>
                ))}
              </div>
            </div>

            <a href="#quote" onClick={onClose} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem", width: "100%", padding: "0.85rem", background: "linear-gradient(135deg, var(--primary), #14a085)", color: "#fff", borderRadius: "10px", fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, boxShadow: "0 6px 20px rgba(13,115,119,0.3)", transition: "all 0.3s" }}>
              <WaIcon /> Demander une offre
            </a>
          </div>

        </div>{/* end scroll */}
      </motion.div>
    </motion.div>
  );
}

// ── Fullscreen Lightbox ──────────────────────────────────────────────────────
function Lightbox({ imgs, startIdx, onClose }) {
  const [idx, setIdx] = useState(startIdx);
  const [zoomed, setZoomed] = useState(false);
  const [copied, setCopied] = useState(false);
  const touchStartX = useRef(null);

  const prev = useCallback(() => { setZoomed(false); setIdx((i) => (i - 1 + imgs.length) % imgs.length); }, [imgs.length]);
  const next = useCallback(() => { setZoomed(false); setIdx((i) => (i + 1) % imgs.length); }, [imgs.length]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, onClose]);

  // Swipe support
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = imgs[idx];
    a.download = `photo_${idx + 1}.jpeg`;
    a.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
      style={{
        position: "fixed", inset: 0, zIndex: 3000,
        background: "rgba(0,0,0,0.96)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}
    >
      {/* Top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1rem 1.5rem", zIndex: 10,
        background: "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%)",
      }}>
        <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem", letterSpacing: "0.1em" }}>
          {idx + 1} / {imgs.length}
        </span>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <IconBtn light title="Zoom" onClick={() => setZoomed((z) => !z)}>
            {zoomed ? <IconZoomOut size={16} /> : <IconZoomIn size={16} />}
          </IconBtn>
          <IconBtn light title="Télécharger" onClick={handleDownload}>
            <IconDownload size={16} />
          </IconBtn>
          <IconBtn light title={copied ? "Copié !" : "Partager"} onClick={handleShare}>
            {copied ? <IconCheck size={16} /> : <IconShare size={16} />}
          </IconBtn>
          <IconBtn light title="Fermer" onClick={onClose}>
            <IconX size={16} />
          </IconBtn>
        </div>
      </div>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={idx}
          src={imgs[idx]}
          alt=""
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: zoomed ? 1.8 : 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.25 }}
          onClick={() => setZoomed((z) => !z)}
          style={{
            maxWidth: zoomed ? "none" : "92vw",
            maxHeight: zoomed ? "none" : "82vh",
            objectFit: "contain",
            cursor: zoomed ? "zoom-out" : "zoom-in",
            borderRadius: zoomed ? 0 : "8px",
            userSelect: "none",
          }}
        />
      </AnimatePresence>

      {/* Arrows */}
      {imgs.length > 1 && (
        <>
          <button onClick={prev} style={lightboxArrow("left")}>‹</button>
          <button onClick={next} style={lightboxArrow("right")}>›</button>
        </>
      )}

      {/* Bottom filmstrip */}
      {imgs.length > 1 && (
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          display: "flex", gap: "0.4rem", justifyContent: "center",
          padding: "1rem 1.5rem",
          background: "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 100%)",
          overflowX: "auto",
        }}>
          {imgs.map((src, i) => (
            <button key={i} onClick={() => { setZoomed(false); setIdx(i); }} style={{
              flexShrink: 0, width: "52px", height: "38px",
              borderRadius: "4px", overflow: "hidden", padding: 0, background: "none",
              border: i === idx ? "2px solid #fff" : "2px solid rgba(255,255,255,0.2)",
              cursor: "pointer", opacity: i === idx ? 1 : 0.55,
              transition: "all 0.2s",
            }}>
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function IconBtn({ children, onClick, title, light = false }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      title={title}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "32px", height: "32px", borderRadius: "50%", border: "none",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        background: light
          ? (hov ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.12)")
          : (hov ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.9)"),
        color: light ? "#fff" : "var(--text)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        transition: "all 0.2s",
      }}
    >
      {children}
    </button>
  );
}

function arrowBtn(side) {
  return {
    position: "absolute", top: "50%", transform: "translateY(-50%)",
    [side]: "0.75rem", width: "36px", height: "36px", borderRadius: "50%",
    background: "rgba(255,255,255,0.85)", border: "none", cursor: "pointer",
    fontSize: "1.4rem", lineHeight: 1,
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)", color: "var(--text)", zIndex: 10,
  };
}

function lightboxArrow(side) {
  return {
    position: "absolute", top: "50%", transform: "translateY(-50%)",
    [side]: "1.25rem", width: "48px", height: "48px", borderRadius: "50%",
    background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
    cursor: "pointer", fontSize: "1.8rem", color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 10, transition: "background 0.2s",
  };
}

// ── Inline SVG Icons ─────────────────────────────────────────────────────────
const IconExpand = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
    <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
  </svg>
);
const IconDownload = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const IconShare = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);
const IconX = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconCheck = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconZoomIn = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
  </svg>
);
const IconZoomOut = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    <line x1="8" y1="11" x2="14" y2="11"/>
  </svg>
);
const IconCamera = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);
const IconSearch = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

function WaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
