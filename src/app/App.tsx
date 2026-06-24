import { useRef, useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import defaultPhoto from "@/imports/9d00eb210386307.Y3JvcCwyMDIwLDE1ODAsMCww.png";

type Page = "home" | "portfolio" | "contatos";

// ─── tipos ───────────────────────────────────────────────────────────────────
interface PdfItem {
  id: number;
  name: string;
  url: string;
}

// ─── ícones sociais ───────────────────────────────────────────────────────────
function IconInstagram() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function IconGithub() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
    </svg>
  );
}

// ─── seção de PDFs ────────────────────────────────────────────────────────────
function PdfSection({ title }: { title: string }) {
  const [items, setItems] = useState<PdfItem[]>([]);
  const nextId = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleAdd(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setItems((prev) => [...prev, { id: nextId.current++, name: file.name, url }]);
    e.target.value = "";
  }

  function handleRemove(id: number) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <div style={{ marginBottom: "3.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.4rem, 3vw, 2rem)",
            fontWeight: 400,
            color: "#f0ede8",
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </h2>
        <div style={{ flex: 1, height: "1px", background: "#1e1e1e" }} />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              width: "160px",
              height: "200px",
              background: "#111",
              border: "1px solid #222",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              position: "relative",
              transition: "border-color 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#4a4845")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#222")}
          >
            <button
              onClick={() => handleRemove(item.id)}
              style={{
                position: "absolute",
                top: "6px",
                right: "6px",
                background: "transparent",
                border: "none",
                color: "#4a4845",
                cursor: "pointer",
                padding: "2px",
                lineHeight: 1,
                fontSize: "1rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#f0ede8")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#4a4845")}
              title="Remover"
            >
              ×
            </button>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.75rem",
                textDecoration: "none",
                padding: "1rem",
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#a09e99" strokeWidth="1.2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <text x="6" y="19" fontSize="5" fill="#a09e99" stroke="none" fontFamily="sans-serif" fontWeight="bold">PDF</text>
              </svg>
              <span
                style={{
                  fontSize: "0.65rem",
                  color: "#7a7874",
                  letterSpacing: "0.04em",
                  textAlign: "center",
                  wordBreak: "break-word",
                  maxWidth: "120px",
                  lineHeight: 1.5,
                }}
              >
                {item.name}
              </span>
            </a>
          </div>
        ))}

        <button
          onClick={() => inputRef.current?.click()}
          style={{
            width: "160px",
            height: "200px",
            background: "transparent",
            border: "1px dashed #2a2a2a",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.6rem",
            cursor: "pointer",
            transition: "border-color 0.2s, background 0.2s",
            flexShrink: 0,
            color: "#3d3d3a",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#4a4845";
            (e.currentTarget as HTMLButtonElement).style.background = "#111";
            (e.currentTarget as HTMLButtonElement).style.color = "#a09e99";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#2a2a2a";
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "#3d3d3a";
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Adicionar PDF
          </span>
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          style={{ display: "none" }}
          onChange={handleAdd}
        />
      </div>
    </div>
  );
}

// ─── navbar compartilhada ─────────────────────────────────────────────────────
function Navbar({ onNavClick, page }: { onNavClick: (p: Page) => void; page: Page }) {
  const navLinks: { label: string; target: Page }[] = [
    { label: "Sobre", target: "home" },
    { label: "Portfólio", target: "portfolio" },
    { label: "Serviços", target: "home" },
    { label: "Blog", target: "home" },
  ];

  return (
    <nav className="flex items-center justify-between px-8 md:px-16 py-6">
      <button
        onClick={() => onNavClick("home")}
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.1rem",
          letterSpacing: "0.02em",
          color: "#f0ede8",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        Weslieny
      </button>

      <div className="hidden md:flex items-center gap-10">
        {navLinks.map(({ label, target }) => {
          const active = page === target && target !== "home";
          return (
            <button
              key={label}
              onClick={() => onNavClick(target)}
              style={{
                fontSize: "0.82rem",
                letterSpacing: "0.08em",
                color: active ? "#f0ede8" : "#a09e99",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#f0ede8")}
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color = active ? "#f0ede8" : "#a09e99")
              }
            >
              {label}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onNavClick("contatos")}
        style={{
          border: page === "contatos" ? "1px solid #f0ede8" : "1px solid #a09e99",
          color: "#f0ede8",
          background: page === "contatos" ? "#f0ede8" : "transparent",
          borderRadius: "9999px",
          padding: "0.4rem 1.4rem",
          fontSize: "0.78rem",
          letterSpacing: "0.12em",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          transition: "background 0.2s, color 0.2s, border-color 0.2s",
          color: page === "contatos" ? "#0c0c0c" : "#f0ede8",
        } as React.CSSProperties}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#f0ede8";
          (e.currentTarget as HTMLButtonElement).style.color = "#0c0c0c";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = page === "contatos" ? "#f0ede8" : "transparent";
          (e.currentTarget as HTMLButtonElement).style.color = page === "contatos" ? "#0c0c0c" : "#f0ede8";
        }}
      >
        CONTATO
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </nav>
  );
}

// ─── footer compartilhado ─────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="flex items-center justify-between px-8 md:px-16 py-6"
      style={{ borderTop: "1px solid #1c1c1c" }}
    >
      <span style={{ fontSize: "0.72rem", color: "#3d3d3a", letterSpacing: "0.06em" }}>2026</span>
      <a
        href="#"
        style={{
          fontSize: "0.68rem",
          letterSpacing: "0.1em",
          color: "#4a4845",
          textDecoration: "none",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#a09e99")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#4a4845")}
      >
        INSTAGRAM
      </a>
      <span style={{ fontSize: "0.68rem", color: "#3d3d3a", letterSpacing: "0.08em" }}>
        WESLIENY VITORIA
      </span>
    </footer>
  );
}

// ─── página de contatos ───────────────────────────────────────────────────────
function ContatosPage({ onNav }: { onNav: (p: Page) => void }) {
  const socials = [
    {
      label: "Instagram",
      handle: "@weslieny",
      href: "https://www.instagram.com/weslienyvitoria/",
      icon: <IconInstagram />,
      color: "#E1306C",
    },
    {
      label: "Facebook",
      handle: "weslieny-vitória",
      href: "https://www.facebook.com/weslieny-vitória/",
      icon: <IconFacebook />,
      color: "#1877F2",
    },
    {
      label: "GitHub",
      handle: "weslienyvitoria",
      href: "https://github.com/weslienyvitoria",
      icon: <IconGithub />,
      color: "#f0ede8",
    },
  ];

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: "#0c0c0c", fontFamily: "'Inter', sans-serif", color: "#f0ede8" }}
    >
      <Navbar onNavClick={onNav} page="contatos" />

      <main
        className="flex-1 flex flex-col items-center justify-center px-8 md:px-16 py-16"
      >
        <p
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.18em",
            color: "#4a4845",
            marginBottom: "0.75rem",
            textTransform: "uppercase",
          }}
        >
          Fale Comigo
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 400,
            color: "#f0ede8",
            letterSpacing: "-0.01em",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Contatos
        </h1>
        <p
          style={{
            fontSize: "0.82rem",
            color: "#7a7874",
            marginBottom: "4rem",
            textAlign: "center",
            maxWidth: "36ch",
            lineHeight: 1.8,
          }}
        >
          Me encontre nas redes sociais será um prazer trocar ideias!
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            justifyContent: "center",
          }}
        >
          {socials.map(({ label, handle, href, icon, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: "220px",
                height: "220px",
                background: "#111",
                border: "1px solid #1e1e1e",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                textDecoration: "none",
                color: "#a09e99",
                transition: "border-color 0.25s, background 0.25s, color 0.25s",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = color;
                el.style.color = color;
                el.style.background = "#161616";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "#1e1e1e";
                el.style.color = "#a09e99";
                el.style.background = "#111";
              }}
            >
              <span style={{ transition: "color 0.25s" }}>{icon}</span>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    color: "#f0ede8",
                    marginBottom: "0.25rem",
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    letterSpacing: "0.04em",
                    color: "#4a4845",
                  }}
                >
                  {handle}
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#3d3d3a",
                }}
              >
                Acessar
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

// ─── página de portfólio ──────────────────────────────────────────────────────
function PortfolioPage({ onNav }: { onNav: (p: Page) => void }) {
  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: "#0c0c0c", fontFamily: "'Inter', sans-serif", color: "#f0ede8" }}
    >
      <Navbar onNavClick={onNav} page="portfolio" />

      <main className="flex-1 px-8 md:px-16 py-10">
        <div style={{ marginBottom: "3.5rem" }}>
          <p
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              color: "#4a4845",
              marginBottom: "0.75rem",
              textTransform: "uppercase",
            }}
          >
            Meus Trabalhos
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 400,
              color: "#f0ede8",
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
            }}
          >
            Portfólio
          </h1>
        </div>

        <PdfSection title="Seminários" />
        <PdfSection title="Artigos" />
        <PdfSection title="Diplomas de Cursos" />
      </main>

      <Footer />
    </div>
  );
}

// ─── página inicial ───────────────────────────────────────────────────────────
function HomePage({ onNav }: { onNav: (p: Page) => void }) {
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(URL.createObjectURL(file));
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: "#0c0c0c", fontFamily: "'Inter', sans-serif", color: "#f0ede8" }}
    >
      <Navbar onNavClick={onNav} page="home" />

      <main
        className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 md:px-12 pb-6 gap-4 md:gap-6"
        style={{ minHeight: "calc(100vh - 160px)" }}
      >
        <div className="flex-1 flex flex-col justify-center items-center md:items-start max-w-2xl gap-0.5">
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              fontWeight: 400,
              lineHeight: 1.08,
              color: "#f0ede8",
              marginBottom: "0.25rem",
              letterSpacing: "-0.01em",
              textAlign: "center md:text-left",
            }}
          >
            Weslieny
            <br />
            Vitoria
          </h1>
          <p
            style={{
              maxWidth: "32ch",
              fontSize: "0.82rem",
              lineHeight: 1.8,
              color: "#7a7874",
              marginBottom: "1rem",
              textAlign: "center md:text-left",
            }}
          >
            Estudante de Ciências da Religião, 20 anos, cursando o 2º ano
            na Universidade do Estado do Rio Grande do Norte — UERN.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNav("portfolio")}
              style={{
                background: "#f0ede8",
                color: "#0c0c0c",
                border: "none",
                padding: "0.75rem 2rem",
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
              }}
            >
              VER PORTFÓLIO
            </button>
            <a
              href="#"
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                color: "#7a7874",
                textDecoration: "none",
                borderBottom: "1px solid #7a7874",
                paddingBottom: "1px",
              }}
            >
              SOBRE MIM
            </a>
          </div>
        </div>

        <div
          className="relative flex-shrink-0 mt-1 md:mt-0"
          style={{ width: "clamp(260px, 38vw, 520px)", height: "clamp(340px, 55vw, 680px)" }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
          {photo ? (
            <img
              src={photo}
              alt="Weslieny Vitoria"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(30%)" }}
            />
          ) : (
            <ImageWithFallback
              src={defaultPhoto}
              alt="Weslieny Vitoria"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(30%)" }}
            />
          )}
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              position: "absolute",
              inset: 0,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 3,
              transition: "background 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(12,12,12,0.55)";
              const span = e.currentTarget.querySelector(".edit-hint") as HTMLElement;
              if (span) span.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              const span = e.currentTarget.querySelector(".edit-hint") as HTMLElement;
              if (span) span.style.opacity = "0";
            }}
            title="Clique para trocar a foto"
          >
            <span
              className="edit-hint"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
                opacity: 0,
                transition: "opacity 0.3s",
                color: "#f0ede8",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 2.828L11.828 15.828a4 4 0 01-1.414.95l-3.414.95.95-3.414A4 4 0 019 13z" />
              </svg>
              <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Trocar Foto
              </span>
            </span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handlePhotoChange}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-14px",
              right: "-14px",
              width: "60px",
              height: "60px",
              border: "1px solid #2a2a2a",
              zIndex: 0,
            }}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

// ─── raiz ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");

  if (page === "portfolio") return <PortfolioPage onNav={setPage} />;
  if (page === "contatos") return <ContatosPage onNav={setPage} />;
  return <HomePage onNav={setPage} />;
}