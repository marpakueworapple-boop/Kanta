import { useState } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────
// Palette: Bold green + cream, Gen Z energy
const T = {
  green:      "#0B6E4F",   // deep forest green — primary
  greenLight: "#12A073",   // mid green — accents
  lime:       "#CAFF4B",   // electric lime — signature pop
  cream:      "#FDF8EE",   // warm off-white background
  sand:       "#EEE6D0",   // card borders, muted surfaces
  cardBg:     "#FFFFFF",
  ink:        "#0F1A14",   // near-black text
  muted:      "#7A8C82",   // secondary text
  red:        "#E8383B",   // Hot badge
  teal:       "#0ABFBC",   // New badge
};

const CATEGORIES = ["All", "Dresses", "Tops", "Bottoms", "Shoes", "Bags", "Accessories"];

const LISTINGS = [
  { id: 1, title: "Kente-trim Blazer", price: 85, location: "Accra, GH", category: "Tops", size: "M", condition: "Good", seller: "Abena K.", image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4f01?w=400&q=80", badge: "Hot" },
  { id: 2, title: "Vintage Ankara Dress", price: 120, location: "Kumasi, GH", category: "Dresses", size: "S", condition: "Excellent", seller: "Efua M.", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80", badge: "New" },
  { id: 3, title: "Leather Crossbody Bag", price: 60, location: "Lagos, NG", category: "Bags", size: "One Size", condition: "Fair", seller: "Chidi A.", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80", badge: null },
  { id: 4, title: "Wide-leg Trousers", price: 45, location: "Nairobi, KE", category: "Bottoms", size: "L", condition: "Good", seller: "Amara S.", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=80", badge: null },
  { id: 5, title: "Platform Sandals", price: 70, location: "Accra, GH", category: "Shoes", size: "39", condition: "Excellent", seller: "Nana O.", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80", badge: "Hot" },
  { id: 6, title: "Embroidered Blouse", price: 35, location: "Abuja, NG", category: "Tops", size: "XS", condition: "Good", seller: "Zainab B.", image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&q=80", badge: null },
  { id: 7, title: "Beaded Necklace Set", price: 25, location: "Accra, GH", category: "Accessories", size: "One Size", condition: "Excellent", seller: "Yaa F.", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80", badge: "New" },
  { id: 8, title: "Denim Midi Skirt", price: 55, location: "Nairobi, KE", category: "Bottoms", size: "M", condition: "Fair", seller: "Aisha P.", image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&q=80", badge: null },
];

const CONDITION_COLOR = {
  Excellent: T.greenLight,
  Good:      T.green,
  Fair:      "#C47B2B",
};

// ─── LOGO ──────────────────────────────────────────────────────────
function KantaLogo({ size = 1 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 * size }}>
      {/* K icon mark */}
      <div style={{
        width: 32 * size, height: 32 * size, borderRadius: 8 * size,
        background: T.lime, display: "flex", alignItems: "center",
        justifyContent: "center", flexShrink: 0,
      }}>
        <span style={{ fontWeight: 900, fontSize: 18 * size, color: T.ink, letterSpacing: -1, fontFamily: "system-ui" }}>K</span>
      </div>
      <span style={{ fontWeight: 900, fontSize: 20 * size, color: "#fff", letterSpacing: "-0.5px", fontFamily: "system-ui" }}>kanta</span>
    </div>
  );
}

// ─── BADGE ─────────────────────────────────────────────────────────
function Badge({ label }) {
  const bg = label === "Hot" ? T.red : T.teal;
  return (
    <span style={{
      background: bg, color: "#fff", fontSize: 10, fontWeight: 800,
      padding: "3px 8px", borderRadius: 20, textTransform: "uppercase", letterSpacing: 0.8,
    }}>{label}</span>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────────
export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState([]);
  const [view, setView] = useState("browse");
  const [selectedItem, setSelectedItem] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState("browse");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const toggleSave = (id) => setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const filtered = LISTINGS.filter(item => {
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const goTo = (v, tab) => { setView(v); if (tab) setActiveTab(tab); };

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: T.cream, minHeight: "100vh", color: T.ink, maxWidth: 480, margin: "0 auto", position: "relative" }}>

      {/* ── HEADER ── */}
      <header style={{
        background: T.green, padding: "0 18px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        height: 58, position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 2px 12px rgba(11,110,79,0.18)"
      }}>
        <KantaLogo />
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button
            onClick={() => goTo("sell", "sell")}
            style={{
              background: T.lime, color: T.ink, border: "none",
              borderRadius: 20, padding: "7px 15px", fontWeight: 800,
              fontSize: 13, cursor: "pointer", letterSpacing: 0.2,
            }}>+ Sell</button>
          <div style={{ position: "relative", cursor: "pointer" }} onClick={() => showToast("Cart coming soon! 🛒")}>
            <span style={{ fontSize: 22 }}>🛒</span>
            {cartCount > 0 && (
              <span style={{
                position: "absolute", top: -4, right: -6, background: T.lime,
                color: T.ink, borderRadius: "50%", fontSize: 10, fontWeight: 900,
                width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center"
              }}>{cartCount}</span>
            )}
          </div>
        </div>
      </header>

      {/* ── TOAST ── */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 90, left: "50%", transform: "translateX(-50%)",
          background: T.ink, color: T.lime, padding: "10px 22px", borderRadius: 30,
          fontWeight: 700, fontSize: 14, zIndex: 999, boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
          whiteSpace: "nowrap",
        }}>{toast}</div>
      )}

      {/* ══ BROWSE VIEW ══════════════════════════════════════════════ */}
      {view === "browse" && (
        <main style={{ padding: "0 16px 100px" }}>

          {/* Hero banner */}
          <div style={{
            background: T.green, margin: "16px -16px 0", padding: "22px 20px 20px",
            position: "relative", overflow: "hidden",
          }}>
            {/* Decorative circles */}
            <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: T.lime, opacity: 0.12 }} />
            <div style={{ position: "absolute", bottom: -20, right: 40, width: 70, height: 70, borderRadius: "50%", background: T.lime, opacity: 0.18 }} />

            <p style={{ fontSize: 11, color: T.lime, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, margin: "0 0 6px" }}>
              Pre-loved · Pan-African
            </p>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: "#fff", lineHeight: 1.15, margin: "0 0 10px", letterSpacing: "-0.5px" }}>
              Africa's thrift<br />marketplace ✨
            </h1>
            <div style={{ display: "flex", gap: 8 }}>
              {["🇬🇭 Ghana", "🇳🇬 Nigeria", "🇰🇪 Kenya"].map(flag => (
                <span key={flag} style={{
                  background: "rgba(255,255,255,0.12)", color: "#fff",
                  fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20,
                }}>{flag}</span>
              ))}
            </div>
          </div>

          {/* Search */}
          <div style={{ position: "relative", margin: "16px 0 14px" }}>
            <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search clothes, city, seller..."
              style={{
                width: "100%", padding: "12px 14px 12px 38px", borderRadius: 12,
                border: `1.5px solid ${T.sand}`, background: "#fff",
                fontSize: 15, boxSizing: "border-box", outline: "none",
                color: T.ink,
              }}
            />
          </div>

          {/* Categories */}
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6, marginBottom: 18, scrollbarWidth: "none" }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  whiteSpace: "nowrap", padding: "7px 15px", borderRadius: 20,
                  border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13,
                  background: activeCategory === cat ? T.green : T.sand,
                  color: activeCategory === cat ? T.lime : T.ink,
                  transition: "all 0.15s",
                }}
              >{cat}</button>
            ))}
          </div>

          {/* Section label */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontWeight: 800, fontSize: 16 }}>
              {activeCategory === "All" ? "Just dropped 🔥" : activeCategory}
            </span>
            <span style={{ fontSize: 12, color: T.muted }}>{filtered.length} items</span>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: T.muted }}>
              <div style={{ fontSize: 40 }}>🔎</div>
              <p style={{ fontWeight: 700, marginTop: 12, color: T.ink }}>Nothing here yet</p>
              <p style={{ fontSize: 13 }}>Try a different search or category</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {filtered.map(item => (
                <div
                  key={item.id}
                  onClick={() => { setSelectedItem(item); setView("detail"); }}
                  style={{
                    background: T.cardBg, borderRadius: 14, overflow: "hidden",
                    cursor: "pointer", border: `1px solid ${T.sand}`,
                    boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <img src={item.image} alt={item.title} style={{ width: "100%", height: 165, objectFit: "cover", display: "block" }} />
                    {item.badge && (
                      <span style={{ position: "absolute", top: 8, left: 8 }}>
                        <Badge label={item.badge} />
                      </span>
                    )}
                    <button
                      onClick={e => { e.stopPropagation(); toggleSave(item.id); showToast(saved.includes(item.id) ? "Removed ✓" : "Saved! ♥"); }}
                      style={{
                        position: "absolute", top: 8, right: 8,
                        background: saved.includes(item.id) ? T.lime : "rgba(255,255,255,0.92)",
                        border: "none", borderRadius: "50%", width: 30, height: 30,
                        cursor: "pointer", fontSize: 15, display: "flex",
                        alignItems: "center", justifyContent: "center",
                      }}
                    >{saved.includes(item.id) ? "♥" : "♡"}</button>
                  </div>
                  <div style={{ padding: "9px 11px 11px" }}>
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</div>
                    <div style={{ fontWeight: 900, fontSize: 15, color: T.green }}>₵{item.price}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5, alignItems: "center" }}>
                      <span style={{ fontSize: 10, color: T.muted }}>📍 {item.location}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: CONDITION_COLOR[item.condition] }}>{item.condition}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      {/* ══ DETAIL VIEW ══════════════════════════════════════════════ */}
      {view === "detail" && selectedItem && (
        <div style={{ padding: "0 0 100px" }}>
          <div style={{ position: "relative" }}>
            <img src={selectedItem.image} alt={selectedItem.title} style={{ width: "100%", height: 320, objectFit: "cover", display: "block" }} />
            <button
              onClick={() => setView("browse")}
              style={{
                position: "absolute", top: 14, left: 14,
                background: "rgba(255,255,255,0.92)", border: "none",
                borderRadius: "50%", width: 38, height: 38, cursor: "pointer",
                fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
              }}>←</button>
            {selectedItem.badge && (
              <span style={{ position: "absolute", top: 14, right: 14 }}>
                <Badge label={selectedItem.badge} />
              </span>
            )}
          </div>

          <div style={{ padding: "18px 18px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <h2 style={{ fontSize: 22, fontWeight: 900, margin: 0, flex: 1, paddingRight: 12 }}>{selectedItem.title}</h2>
              <span style={{ fontSize: 24, fontWeight: 900, color: T.green, whiteSpace: "nowrap" }}>₵{selectedItem.price}</span>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              {[
                `Size: ${selectedItem.size}`,
                selectedItem.condition,
                `📍 ${selectedItem.location}`
              ].map(tag => (
                <span key={tag} style={{
                  background: T.sand, borderRadius: 20, padding: "5px 12px",
                  fontSize: 12, fontWeight: 600, color: T.ink,
                }}>{tag}</span>
              ))}
            </div>

            {/* Seller */}
            <div style={{
              marginTop: 16, padding: "14px 16px", background: T.sand,
              borderRadius: 14, display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: T.green, display: "flex", alignItems: "center",
                justifyContent: "center", fontWeight: 900, fontSize: 17, color: T.lime,
              }}>{selectedItem.seller[0]}</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 14 }}>{selectedItem.seller}</div>
                <div style={{ fontSize: 12, color: T.muted }}>Seller · {selectedItem.location}</div>
              </div>
              <button
                onClick={() => showToast("Messages coming soon! 💬")}
                style={{
                  marginLeft: "auto", background: T.green, color: T.lime,
                  border: "none", borderRadius: 20, padding: "7px 14px",
                  fontSize: 12, fontWeight: 700, cursor: "pointer",
                }}>Chat</button>
            </div>

            {/* Actions */}
            <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
              <button
                onClick={() => { setCartCount(c => c + 1); showToast("Added to cart! 🛍️"); }}
                style={{
                  flex: 1, background: T.green, color: T.lime, border: "none",
                  borderRadius: 14, padding: "15px", fontWeight: 900,
                  fontSize: 15, cursor: "pointer", letterSpacing: 0.2,
                }}>Add to Cart</button>
              <button
                onClick={() => { toggleSave(selectedItem.id); showToast(saved.includes(selectedItem.id) ? "Removed ✓" : "Saved! ♥"); }}
                style={{
                  width: 52, background: saved.includes(selectedItem.id) ? T.lime : T.sand,
                  border: "none", borderRadius: 14, fontSize: 20, cursor: "pointer",
                }}>{saved.includes(selectedItem.id) ? "♥" : "♡"}</button>
            </div>
          </div>
        </div>
      )}

      {/* ══ SELL VIEW ════════════════════════════════════════════════ */}
      {view === "sell" && (
        <div style={{ padding: "20px 18px 100px" }}>
          <button onClick={() => goTo("browse", "browse")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 15, color: T.muted, marginBottom: 16 }}>← Back</button>

          {/* Header */}
          <div style={{ background: T.green, borderRadius: 16, padding: "20px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: T.lime, opacity: 0.15 }} />
            <p style={{ fontSize: 11, color: T.lime, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, margin: "0 0 4px" }}>New listing</p>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: "#fff", margin: 0 }}>What are you selling?</h2>
          </div>

          {/* Photo upload */}
          <div style={{
            border: `2px dashed ${T.greenLight}`, borderRadius: 14,
            padding: "28px 20px", textAlign: "center", marginBottom: 20,
            cursor: "pointer", background: "#fff",
          }}>
            <div style={{ fontSize: 30 }}>📷</div>
            <div style={{ fontWeight: 700, marginTop: 8, color: T.ink }}>Add photos</div>
            <div style={{ fontSize: 12, color: T.muted, marginTop: 4 }}>Up to 5 photos · tap to upload</div>
          </div>

          {/* Form fields */}
          {[
            { label: "Item Title", placeholder: "e.g. Vintage Ankara Blouse" },
            { label: "Price (₵)", placeholder: "e.g. 80" },
            { label: "Location", placeholder: "e.g. Accra, Lagos, Nairobi..." },
          ].map(field => (
            <div key={field.label} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 6, color: T.ink }}>{field.label}</label>
              <input
                placeholder={field.placeholder}
                style={{
                  width: "100%", padding: "12px 14px", borderRadius: 10,
                  border: `1.5px solid ${T.sand}`, background: "#fff",
                  fontSize: 15, boxSizing: "border-box", outline: "none", color: T.ink,
                }} />
            </div>
          ))}

          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 6 }}>Category</label>
            <select style={{
              width: "100%", padding: "12px 14px", borderRadius: 10,
              border: `1.5px solid ${T.sand}`, background: "#fff",
              fontSize: 15, outline: "none", color: T.ink,
            }}>
              {CATEGORIES.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 8 }}>Condition</label>
            <div style={{ display: "flex", gap: 8 }}>
              {["Excellent", "Good", "Fair"].map(c => (
                <button key={c} style={{
                  flex: 1, padding: "10px", borderRadius: 10,
                  border: `1.5px solid ${T.sand}`, background: "#fff",
                  fontSize: 13, fontWeight: 700, cursor: "pointer", color: T.ink,
                }}>{c}</button>
              ))}
            </div>
          </div>

          <button
            onClick={() => { showToast("Listing published! 🎉"); goTo("browse", "browse"); }}
            style={{
              width: "100%", background: T.green, color: T.lime,
              border: "none", borderRadius: 14, padding: "16px",
              fontWeight: 900, fontSize: 16, cursor: "pointer", letterSpacing: 0.3,
            }}>Publish Listing</button>
        </div>
      )}

      {/* ══ SAVED VIEW ═══════════════════════════════════════════════ */}
      {view === "saved" && (
        <div style={{ padding: "20px 18px 100px" }}>
          <h2 style={{ fontWeight: 900, fontSize: 22, margin: "0 0 18px" }}>Saved Items ♥</h2>
          {saved.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: T.muted }}>
              <div style={{ fontSize: 40 }}>🤍</div>
              <p style={{ fontWeight: 700, marginTop: 12, color: T.ink }}>Nothing saved yet</p>
              <p style={{ fontSize: 13 }}>Tap ♡ on any item to save it here</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {LISTINGS.filter(i => saved.includes(i.id)).map(item => (
                <div key={item.id} onClick={() => { setSelectedItem(item); setView("detail"); }}
                  style={{ background: T.cardBg, borderRadius: 14, overflow: "hidden", cursor: "pointer", border: `1px solid ${T.sand}` }}>
                  <img src={item.image} alt={item.title} style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }} />
                  <div style={{ padding: "9px 11px 11px" }}>
                    <div style={{ fontWeight: 700, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</div>
                    <div style={{ fontWeight: 900, fontSize: 15, color: T.green }}>₵{item.price}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ══ BOTTOM NAV ═══════════════════════════════════════════════ */}
      <nav style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 480, background: "#fff",
        borderTop: `1px solid ${T.sand}`, display: "flex",
        padding: "8px 0 12px", zIndex: 100,
        boxShadow: "0 -4px 16px rgba(0,0,0,0.07)",
      }}>
        {[
          { id: "browse", icon: "🏠", label: "Home" },
          { id: "saved",  icon: "♥",  label: "Saved" },
          { id: "sell",   icon: "➕", label: "Sell" },
          { id: "profile",icon: "👤", label: "Profile" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { goTo(tab.id === "profile" ? "browse" : tab.id, tab.id); if (tab.id === "profile") showToast("Profile coming soon! 👤"); }}
            style={{
              flex: 1, background: "none", border: "none", cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              padding: "4px 0",
            }}
          >
            <span style={{ fontSize: tab.id === "sell" ? 20 : 18, lineHeight: 1 }}>{tab.icon}</span>
            <span style={{
              fontSize: 10, fontWeight: 700,
              color: activeTab === tab.id ? T.green : T.muted,
            }}>{tab.label}</span>
            {activeTab === tab.id && (
              <div style={{ width: 20, height: 3, borderRadius: 2, background: T.lime, marginTop: 1 }} />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
