import { useState, useRef, useEffect } from "react";

const AGENT_PROMPT = `Eres la asistente de IA de Bossgirlsystem, una marca de productos digitales para mujeres emprendedoras.
Tu especialidad es ayudar a crear contenido que venda cursos online, ebooks, guías y membresías digitales.

REGLAS:
1. Responde siempre en español latino, cálido y directo
2. Entrega contenido listo para publicar, no solo ideas
3. Adapta el tono al canal: Instagram (emocional/visual), Email (profundo), WhatsApp (íntimo/conversacional), TikTok (directo/entretenido)
4. Incluye siempre un CTA claro
5. Sugiere cómo reutilizar el contenido en otros canales
6. Usa emojis con criterio, no en exceso
7. Cada respuesta termina con una acción concreta que la usuaria puede hacer HOY

PRODUCTOS QUE MANEJA LA MARCA:
- Mapa Digital (gratis)
- Workbook BGS ($17 USD)
- Canal VIP Telegram (comunidad)
- PLR Power Kit (productos con licencia para revender)
- Kit Gratuito Automático (gratis)
- BGS Digital Pro (curso completo premium)

CANALES: Instagram, TikTok, Email marketing, WhatsApp/Telegram`;

const QUICK_PROMPTS = [
  { emoji: "📸", label: "Post Instagram", prompt: "Crea un post de Instagram para promocionar mi producto digital de Boss Girl System. Que sea emocional, con un hook potente y CTA claro." },
  { emoji: "📧", label: "Email de venta", prompt: "Escribe un email de venta para mi curso o producto digital de Boss Girl System. Que conecte emocionalmente y lleve a la acción." },
  { emoji: "💬", label: "WhatsApp broadcast", prompt: "Dame un mensaje de WhatsApp para reactivar a mi lista y vender mi producto digital hoy. Corto, íntimo y con urgencia." },
  { emoji: "🎬", label: "Ideas TikTok", prompt: "Dame 3 ideas de videos TikTok para posicionar mi marca Boss Girl System y atraer clientas ideales." },
  { emoji: "📅", label: "Plan semanal", prompt: "Crea un plan de contenido de 7 días para mis redes sociales. Quiero vender mis productos digitales sin parecer que solo vendo." },
  { emoji: "⚡", label: "Hook viral", prompt: "Dame 5 hooks poderosos para reels o posts que paren el scroll y conecten con mujeres emprendedoras." },
];

export default function BossgirlSystem() {
  const [view, setView] = useState("landing");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "¡Hola Boss! 🔥 Soy tu asistente de contenido de Bossgirlsystem.\n\nEstoy aquí para ayudarte a crear contenido que venda tus productos digitales — posts, emails, scripts, planes de contenido y más.\n\n¿Qué necesitas crear hoy?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const formatMsg = (text) =>
    text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br/>");

  const sendMessage = async (userText) => {
    if (!userText.trim() || loading) return;
    const userMsg = { role: "user", content: userText };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: AGENT_PROMPT,
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Intenta de nuevo, algo falló.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Error de conexión. Intenta de nuevo." }]);
    } finally {
      setLoading(false);
    }
  };

  // ─── LANDING ───────────────────────────────────────────────────────────────
  if (view === "landing") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0d0010",
        color: "#fff",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        overflowX: "hidden",
      }}>
        <div style={{
          position: "fixed", top: "-200px", left: "-200px",
          width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "fixed", bottom: "-100px", right: "-100px",
          width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* NAV */}
        <nav style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "20px 40px",
          borderBottom: "1px solid rgba(168,85,247,0.15)",
          backdropFilter: "blur(10px)",
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(13,0,16,0.8)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "22px" }}>🔥</span>
            <span style={{
              fontSize: "18px", fontWeight: "bold", letterSpacing: "2px",
              background: "linear-gradient(90deg, #d946ef, #a855f7)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>BOSSGIRLSYSTEM</span>
          </div>
          <button onClick={() => setView("agent")} style={{
            background: "linear-gradient(135deg, #a855f7, #ec4899)",
            border: "none", color: "#fff",
            padding: "10px 22px", borderRadius: "30px",
            fontSize: "13px", fontWeight: "bold",
            cursor: "pointer", letterSpacing: "1px",
            boxShadow: "0 4px 20px rgba(168,85,247,0.4)",
          }}>
            Probar Boss AI ✨
          </button>
        </nav>

        {/* HERO */}
        <section style={{ textAlign: "center", padding: "90px 24px 70px" }}>
          <div style={{
            display: "inline-block",
            background: "rgba(168,85,247,0.12)",
            border: "1px solid rgba(168,85,247,0.3)",
            borderRadius: "30px", padding: "6px 18px",
            fontSize: "12px", letterSpacing: "2px", color: "#d8b4fe",
            marginBottom: "28px", textTransform: "uppercase",
          }}>
            ✦ Tu sistema de contenido con IA ✦
          </div>
          <h1 style={{
            fontSize: "clamp(38px, 7vw, 72px)",
            fontWeight: "bold", lineHeight: "1.1",
            margin: "0 auto 24px", maxWidth: "800px",
          }}>
            Deja de quedarte{" "}
            <span style={{
              background: "linear-gradient(135deg, #d946ef, #a855f7, #ec4899)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>en blanco.</span>
            <br />Empieza a vender.
          </h1>
          <p style={{
            fontSize: "18px", color: "#c4b5fd",
            maxWidth: "540px", margin: "0 auto 44px",
            lineHeight: "1.7", fontStyle: "italic",
          }}>
            Bossgirlsystem te da el sistema de contenido con IA para vender tus cursos, ebooks y membresías — sin bloquearte, sin agotarte.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setView("agent")} style={{
              background: "linear-gradient(135deg, #a855f7, #ec4899)",
              border: "none", color: "#fff",
              padding: "16px 36px", borderRadius: "50px",
              fontSize: "16px", fontWeight: "bold",
              cursor: "pointer", letterSpacing: "1px",
              boxShadow: "0 8px 30px rgba(168,85,247,0.5)",
            }}>
              Hablar con Boss AI 🔥
            </button>
            <button onClick={() => document.getElementById("productos").scrollIntoView({ behavior: "smooth" })} style={{
              background: "transparent",
              border: "1px solid rgba(168,85,247,0.5)", color: "#d8b4fe",
              padding: "16px 36px", borderRadius: "50px",
              fontSize: "16px", cursor: "pointer",
            }}>
              Ver productos
            </button>
          </div>
        </section>

        {/* SOCIAL PROOF STRIP */}
        <div style={{
          background: "rgba(168,85,247,0.08)",
          borderTop: "1px solid rgba(168,85,247,0.15)",
          borderBottom: "1px solid rgba(168,85,247,0.15)",
          padding: "16px 24px",
          display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap",
        }}>
          {["📚 Cursos Online", "📖 Ebooks & Guías", "🔥 Membresías", "📱 Instagram · TikTok · Email · WhatsApp"].map((t) => (
            <span key={t} style={{ color: "#c4b5fd", fontSize: "13px", letterSpacing: "1px" }}>{t}</span>
          ))}
        </div>

        {/* FEATURES */}
        <section style={{ padding: "90px 24px", maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{
            textAlign: "center", fontSize: "clamp(28px, 4vw, 44px)",
            marginBottom: "60px", fontWeight: "bold",
          }}>
            Todo lo que necesitas para{" "}
            <span style={{
              background: "linear-gradient(90deg, #d946ef, #a855f7)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>vender más</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {[
              { icon: "✍️", title: "Contenido listo para publicar", desc: "Posts, reels, emails y mensajes de WhatsApp creados para ti en segundos. Sin bloqueos creativos." },
              { icon: "🎯", title: "Diseñado para vender", desc: "Cada pieza de contenido tiene un propósito: atraer, conectar y convertir a tu cliente ideal." },
              { icon: "♻️", title: "Un contenido, 4 canales", desc: "Te decimos cómo reutilizar cada pieza en Instagram, TikTok, Email y WhatsApp sin repetirte." },
              { icon: "⚡", title: "Estrategia de lanzamiento", desc: "Planea el lanzamiento de tu próximo producto con un sistema probado paso a paso." },
              { icon: "📅", title: "Plan semanal en minutos", desc: "Genera tu calendario de contenido completo para la semana antes de que empiece el lunes." },
              { icon: "💜", title: "Habla como tú", desc: "La IA aprende tu tono y tu audiencia para que el contenido suene auténtico, no genérico." },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(168,85,247,0.2)",
                borderRadius: "20px", padding: "28px",
                transition: "border-color 0.3s",
              }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(168,85,247,0.5)"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(168,85,247,0.2)"}
              >
                <div style={{ fontSize: "32px", marginBottom: "14px" }}>{icon}</div>
                <h3 style={{ fontSize: "17px", fontWeight: "bold", marginBottom: "10px", color: "#e9d5ff" }}>{title}</h3>
                <p style={{ color: "#9d7ec9", fontSize: "14px", lineHeight: "1.7", margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PRODUCTOS */}
        <section id="productos" style={{ padding: "80px 24px", maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={{
            textAlign: "center", fontSize: "clamp(26px, 4vw, 40px)",
            marginBottom: "16px", fontWeight: "bold",
          }}>
            Explora la{" "}
            <span style={{
              background: "linear-gradient(90deg, #d946ef, #a855f7)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Biblioteca Digital</span>
          </h2>
          <p style={{ textAlign: "center", color: "#9d7ec9", fontSize: "15px", marginBottom: "50px", fontStyle: "italic" }}>
            Recursos para lanzar y automatizar tu negocio digital — sin cámara, sin excusas.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[
              {
                tag: "GRATIS", tagColor: "#4ade80", tagBg: "rgba(74,222,128,0.1)",
                icon: "🗺️", title: "Mapa Digital",
                desc: "Tu hoja de ruta visual para entender cómo funciona el negocio digital. El primer paso para tener claridad total.",
                price: "Gratis",
                btnText: "Descargar Gratis →",
                btnStyle: { background: "transparent", border: "1px solid rgba(168,85,247,0.5)", color: "#d8b4fe" },
                href: "https://bossgirlsystem.systeme.io/8f83dd16",
                note: "Descarga inmediata · Sin tarjeta requerida",
              },
              {
                tag: "RECURSO", tagColor: "#f9a8d4", tagBg: "rgba(249,168,212,0.1)",
                icon: "📓", title: "Workbook BGS",
                desc: "Un workbook práctico con plantillas listas para usar. Define tu negocio, tu oferta y tu estrategia con claridad.",
                price: "$17 USD",
                btnText: "Acceso Inmediato →",
                btnStyle: { background: "linear-gradient(135deg, #a855f7, #ec4899)", border: "none", color: "#fff", boxShadow: "0 6px 20px rgba(168,85,247,0.4)" },
                href: "https://bossgirlsystem.systeme.io/ef3270c5-1672d620",
                note: "Acceso inmediato · Pago único",
              },
              {
                tag: "COMUNIDAD", tagColor: "#fbbf24", tagBg: "rgba(251,191,36,0.1)",
                icon: "💬", title: "Canal VIP Telegram",
                desc: "Únete a la comunidad exclusiva. Recursos extra, actualizaciones, tips y una red de mujeres construyendo su libertad digital.",
                btnText: "Quiero unirme al Canal VIP →",
                btnStyle: { background: "linear-gradient(135deg, #d97706, #fbbf24)", border: "none", color: "#fff", boxShadow: "0 6px 20px rgba(251,191,36,0.3)" },
                href: "https://t.me/+aQELyZoH8dkwZjdh",
                note: "Canal en Telegram · Comunidad activa",
              },
              {
                tag: "KIT DIGITAL", tagColor: "#f9a8d4", tagBg: "rgba(249,168,212,0.1)",
                icon: "⚡", title: "PLR Power Kit",
                desc: "Productos digitales listos para vender con licencia PLR. Personalízalos, ponles tu marca y empieza a generar ingresos.",
                btnText: "¡Lo quiero ahora! →",
                btnStyle: { background: "linear-gradient(135deg, #a855f7, #ec4899)", border: "none", color: "#fff", boxShadow: "0 6px 20px rgba(168,85,247,0.4)" },
                href: "https://bossgirlsystem.systeme.io/ef3270c5",
                note: "Licencia PLR incluida · Vende como tuyo",
              },
              {
                tag: "GRATIS", tagColor: "#4ade80", tagBg: "rgba(74,222,128,0.1)",
                icon: "🎁", title: "Kit Gratuito Automático",
                desc: "Kit completo para comenzar a automatizar tu negocio digital. Herramientas y guías para que tu sistema trabaje solo.",
                price: "Gratis",
                btnText: "Descargar Kit Gratis →",
                btnStyle: { background: "transparent", border: "1px solid rgba(168,85,247,0.5)", color: "#d8b4fe" },
                href: "https://bossgirlsysteme.io/3c9a30a9",
                note: "Descarga inmediata · Sin tarjeta requerida",
              },
              {
                tag: "🤖 PRÓXIMAMENTE", tagColor: "#a855f7", tagBg: "rgba(168,85,247,0.1)",
                icon: "🤖", title: "BossBot — Agente IA",
                desc: "Tu asistente de inteligencia artificial personalizado para automatizar respuestas, contenido y estrategias de tu negocio digital.",
                btnText: "Muy pronto… 🔒",
                btnStyle: { background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)", color: "#9d7ec9", cursor: "not-allowed" },
                href: null,
                note: "En desarrollo · Únete al canal VIP para ser la primera en acceder",
                disabled: true,
              },
              {
                tag: "⭐ PREMIUM", tagColor: "#d946ef", tagBg: "rgba(217,70,239,0.1)",
                icon: "🚀", title: "BGS Digital Pro",
                desc: "El curso completo + todos los recursos del sistema. Todo lo que necesitas para lanzar, automatizar y escalar en un solo lugar.",
                btnText: "Acceder al Curso Completo →",
                btnStyle: { background: "linear-gradient(135deg, #a855f7, #ec4899)", border: "none", color: "#fff", boxShadow: "0 8px 30px rgba(168,85,247,0.5)" },
                href: "https://bossgirlsysteme.io/da160178",
                note: "Acceso completo · El sistema entero en un solo paso",
                featured: true,
              },
            ].map((p) => (
              <div key={p.title} style={{
                background: p.featured ? "linear-gradient(135deg, rgba(168,85,247,0.12), rgba(236,72,153,0.08))" : "rgba(255,255,255,0.03)",
                border: p.featured ? "1px solid rgba(168,85,247,0.4)" : "1px solid rgba(168,85,247,0.15)",
                borderRadius: "20px", padding: "28px",
                display: "flex", flexDirection: "column", gap: "14px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                  <span style={{
                    background: p.tagBg, color: p.tagColor,
                    fontSize: "10px", fontWeight: "700", letterSpacing: "2px",
                    padding: "4px 12px", borderRadius: "50px", textTransform: "uppercase",
                  }}>{p.tag}</span>
                  {p.price && <span style={{ color: "#d946ef", fontWeight: "bold", fontSize: "16px" }}>{p.price}</span>}
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                  <span style={{ fontSize: "28px", flexShrink: 0 }}>{p.icon}</span>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "19px", fontWeight: "bold", color: "#f3e8ff", marginBottom: "8px" }}>{p.title}</h3>
                    <p style={{ color: "#9d7ec9", fontSize: "14px", lineHeight: "1.7", margin: 0 }}>{p.desc}</p>
                  </div>
                </div>
                <a
                  href={p.href || "#"}
                  onClick={p.disabled ? (e) => e.preventDefault() : undefined}
                  target={p.href ? "_blank" : undefined}
                  rel="noreferrer"
                  style={{
                    display: "block", textAlign: "center",
                    padding: "14px 24px", borderRadius: "50px",
                    fontSize: "14px", fontWeight: "bold",
                    textDecoration: "none", letterSpacing: "0.5px",
                    transition: "all 0.2s",
                    ...p.btnStyle,
                  }}>
                  {p.btnText}
                </a>
                <p style={{ color: "rgba(168,85,247,0.5)", fontSize: "12px", textAlign: "center", margin: 0 }}>● {p.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section style={{
          textAlign: "center", padding: "80px 24px 100px",
          background: "linear-gradient(180deg, transparent, rgba(168,85,247,0.08))",
        }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", marginBottom: "16px", fontWeight: "bold" }}>
            Tu sistema empieza{" "}
            <span style={{
              background: "linear-gradient(135deg, #d946ef, #a855f7)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>hoy.</span>
          </h2>
          <p style={{ color: "#c4b5fd", fontSize: "17px", marginBottom: "40px", fontStyle: "italic" }}>
            El contenido que no publicas no vende nada.
          </p>
          <button onClick={() => setView("agent")} style={{
            background: "linear-gradient(135deg, #a855f7, #ec4899)",
            border: "none", color: "#fff",
            padding: "18px 48px", borderRadius: "50px",
            fontSize: "18px", fontWeight: "bold",
            cursor: "pointer", letterSpacing: "1px",
            boxShadow: "0 10px 40px rgba(168,85,247,0.5)",
          }}>
            Empezar con Boss AI 🔥
          </button>
        </section>

        {/* FOOTER */}
        <footer style={{
          textAlign: "center", padding: "24px",
          borderTop: "1px solid rgba(168,85,247,0.1)",
          color: "rgba(168,85,247,0.5)", fontSize: "12px", letterSpacing: "1px",
        }}>
          © 2026 BOSSGIRLSYSTEM — Todos los derechos reservados
        </footer>
      </div>
    );
  }

  // ─── AGENT CHAT ────────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: "100vh", background: "#0d0010", color: "#fff",
      fontFamily: "'Georgia', serif", display: "flex", flexDirection: "column",
    }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 24px", background: "rgba(13,0,16,0.9)",
        borderBottom: "1px solid rgba(168,85,247,0.2)", backdropFilter: "blur(10px)",
      }}>
        <button onClick={() => setView("landing")} style={{
          background: "transparent", border: "none", color: "#a855f7", cursor: "pointer", fontSize: "14px",
        }}>← Volver</button>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "18px" }}>🔥</span>
          <span style={{
            fontWeight: "bold", letterSpacing: "2px", fontSize: "15px",
            background: "linear-gradient(90deg, #d946ef, #a855f7)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>BOSS AI</span>
        </div>
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80" }} />
      </div>

      <div style={{
        display: "flex", gap: "8px", padding: "14px 20px",
        overflowX: "auto", borderBottom: "1px solid rgba(168,85,247,0.1)", scrollbarWidth: "none",
      }}>
        {QUICK_PROMPTS.map((qp) => (
          <button key={qp.label} onClick={() => sendMessage(qp.prompt)} disabled={loading} style={{
            flexShrink: 0, background: "rgba(168,85,247,0.12)",
            border: "1px solid rgba(168,85,247,0.3)", color: "#e9d5ff",
            padding: "7px 16px", borderRadius: "20px", fontSize: "12px",
            cursor: loading ? "not-allowed" : "pointer", whiteSpace: "nowrap", fontFamily: "inherit",
          }}>
            {qp.emoji} {qp.label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "24px 20px", display: "flex", flexDirection: "column", gap: "16px" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-end", gap: "10px" }}>
            {msg.role === "assistant" && (
              <div style={{
                width: "30px", height: "30px", borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(135deg, #a855f7, #ec4899)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px",
              }}>🔥</div>
            )}
            <div style={{
              maxWidth: "78%", padding: "13px 18px",
              borderRadius: msg.role === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
              background: msg.role === "user" ? "linear-gradient(135deg, #7c3aed, #a855f7)" : "rgba(255,255,255,0.05)",
              border: msg.role === "assistant" ? "1px solid rgba(168,85,247,0.2)" : "none",
              color: "#f3e8ff", fontSize: "14px", lineHeight: "1.7",
              boxShadow: msg.role === "user" ? "0 4px 20px rgba(124,58,237,0.3)" : "none",
            }}
              dangerouslySetInnerHTML={{ __html: formatMsg(msg.content) }}
            />
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "30px", height: "30px", borderRadius: "50%",
              background: "linear-gradient(135deg, #a855f7, #ec4899)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px",
            }}>🔥</div>
            <div style={{
              padding: "12px 20px", borderRadius: "20px 20px 20px 4px",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(168,85,247,0.2)",
              color: "#a855f7", fontSize: "18px", letterSpacing: "4px",
            }}>···</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{
        padding: "16px 20px", borderTop: "1px solid rgba(168,85,247,0.15)",
        background: "rgba(13,0,16,0.9)", display: "flex", gap: "10px", alignItems: "flex-end",
      }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
          placeholder="Cuéntame qué necesitas crear hoy..."
          rows={2}
          style={{
            flex: 1, background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(168,85,247,0.3)", borderRadius: "14px",
            padding: "12px 16px", color: "#f3e8ff", fontSize: "14px",
            resize: "none", outline: "none", fontFamily: "inherit", lineHeight: "1.5",
          }}
        />
        <button onClick={() => sendMessage(input)} disabled={loading || !input.trim()} style={{
          background: loading || !input.trim() ? "rgba(168,85,247,0.2)" : "linear-gradient(135deg, #a855f7, #ec4899)",
          border: "none", borderRadius: "14px", width: "46px", height: "46px",
          cursor: loading || !input.trim() ? "not-allowed" : "pointer",
          fontSize: "18px", flexShrink: 0,
          boxShadow: (!loading && input.trim()) ? "0 4px 20px rgba(168,85,247,0.4)" : "none",
          transition: "all 0.2s",
        }}>
          🔥
        </button>
      </div>
    </div>
  );
}
