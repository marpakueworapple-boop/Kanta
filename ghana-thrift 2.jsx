import { useState } from "react";

const CATEGORIES = ["All", "Dresses", "Tops", "Bottoms", "Shoes", "Bags", "Accessories"];

const LISTINGS = [
  { id: 1, title: "Kente-trim Blazer", price: 85, location: "Accra", category: "Tops", size: "M", condition: "Good", seller: "Abena K.", image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4f01?w=400&q=80", badge: "Hot" },
  { id: 2, title: "Vintage Ankara Dress", price: 120, location: "Kumasi", category: "Dresses", size: "S", condition: "Excellent", seller: "Efua M.", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80", badge: "New" },
  { id: 3, title: "Leather Crossbody Bag", price: 60, location: "Tema", category: "Bags", size: "One Size", condition: "Fair", seller: "Kwame A.", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80", badge: null },
  { id: 4, title: "Wide-leg Trousers", price: 45, location: "Accra", category: "Bottoms", size: "L", condition: "Good", seller: "Ama S.", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=80", badge: null },
  { id: 5, title: "Platform Sandals", price: 70, location: "Takoradi", category: "Shoes", size: "39", condition: "Excellent", seller: "Nana O.", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80", badge: "Hot" },
  { id: 6, title: "Embroidered Blouse", price: 35, location: "Kumasi", category: "Tops", size: "XS", condition: "Good", seller: "Akua B.", image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&q=80", badge: null },
  { id: 7, title: "Beaded Necklace Set", price: 25, location: "Accra", category: "Accessories", size: "One Size", condition: "Excellent", seller: "Yaa F.", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80", badge: "New" },
  { id: 8, title: "Denim Midi Skirt", price: 55, location: "Tema", category: "Bottoms", size: "M", condition: "Fair", seller: "Adjoa P.", image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&q=80", badge: null },
];

const CONDITION_COLOR = {
  Excellent: "#1A7A4A",
  Good: "#2E6FA3",
  Fair: "#B45A00",
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState([]);
  const [view, setView] = useState("browse"); // browse | detail | sell
  const [selectedItem, setSelectedItem] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const toggleSave = (id) => {
    setSaved((s) => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  };

  const filtered = LISTINGS.filter(item => {
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#FAF7F2", minHeight: "100vh", color: "#1A1208" }}>
      {/* Header */}
      <header style={{ background: "#1A1208", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#F5C842", letterSpacing: "-0.5px" }}>thriftgh</span>
          <span style={{ fontSize: 11, color: "#888", background: "#2C2416", padding: "2px 8px", borderRadius: 20, letterSpacing: 1, textTransform: "uppercase" }}>GH</span>
        </div>
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <button onClick={() => setView("sell")} style={{ background: "#F5C842", color: "#1A1208", border: "none", borderRadius: 20, padding: "7px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
            + Sell
          </button>
          <div style={{ position: "relative", cursor: "pointer" }} onClick={() => showToast("Cart coming soon!")}>
            <span style={{ fontSize: 22 }}>🛒</span>
            {cartCount > 0 && <span style={{ position: "absolute", top: -4, right: -6, background: "#F5C842", color: "#1A1208", borderRadius: "50%", fontSize: 10, fontWeight: 800, width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</span>}
          </div>
        </div>
      </header>

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: 30, left: "50%", transform: "translateX(-50%)", background: "#1A1208", color: "#F5C842", padding: "10px 22px", borderRadius: 30, fontWeight: 600, fontSize: 14, zIndex: 999, boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
          {toast}
        </div>
      )}

      {/* Detail View */}
      {view === "detail" && selectedItem && (
        <div style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
          <button onClick={() => setView("browse")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 15, color: "#888", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
            ← Back
          </button>
          <img src={selectedItem.image} alt={selectedItem.title} style={{ width: "100%", height: 340, objectFit: "cover", borderRadius: 16 }} />
          <div style={{ marginTop: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>{selectedItem.title}</h2>
              <span style={{ fontSize: 22, fontWeight: 800, color: "#1A7A4A" }}>₵{selectedItem.price}</span>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
              <span style={{ background: "#F0EBE0", borderRadius: 20, padding: "4px 12px", fontSize: 13 }}>Size: {selectedItem.size}</span>
              <span style={{ background: CONDITION_COLOR[selectedItem.condition] + "20", color: CONDITION_COLOR[selectedItem.condition], borderRadius: 20, padding: "4px 12px", fontSize: 13, fontWeight: 600 }}>{selectedItem.condition}</span>
              <span style={{ background: "#F0EBE0", borderRadius: 20, padding: "4px 12px", fontSize: 13 }}>📍 {selectedItem.location}</span>
            </div>
            <div style={{ marginTop: 16, padding: "14px 16px", background: "#F0EBE0", borderRadius: 12, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#F5C842", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16 }}>
                {selectedItem.seller[0]}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{selectedItem.seller}</div>
                <div style={{ fontSize: 12, color: "#888" }}>Seller · {selectedItem.location}</div>
              </div>
              <button onClick={() => showToast("Message feature coming soon!")} style={{ marginLeft: "auto", background: "none", border: "1.5px solid #1A1208", borderRadius: 20, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Message</button>
            </div>
            <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
              <button
                onClick={() => { setCartCount(c => c + 1); showToast("Added to cart!"); }}
                style={{ flex: 1, background: "#1A1208", color: "#F5C842", border: "none", borderRadius: 12, padding: "14px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
                Add to Cart
              </button>
              <button
                onClick={() => toggleSave(selectedItem.id)}
                style={{ width: 52, background: saved.includes(selectedItem.id) ? "#F5C842" : "#F0EBE0", border: "none", borderRadius: 12, fontSize: 20, cursor: "pointer" }}>
                {saved.includes(selectedItem.id) ? "♥" : "♡"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sell View */}
      {view === "sell" && (
        <div style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
          <button onClick={() => setView("browse")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 15, color: "#888", marginBottom: 16 }}>← Back</button>
          <h2 style={{ fontWeight: 800, fontSize: 24, marginBottom: 4 }}>List an Item</h2>
          <p style={{ color: "#888", fontSize: 14, marginTop: 0, marginBottom: 24 }}>Snap, describe, and sell your thrift finds.</p>
          {[
            { label: "Item Title", placeholder: "e.g. Vintage Ankara Blouse" },
            { label: "Price (₵)", placeholder: "e.g. 80" },
            { label: "Location", placeholder: "e.g. Accra, Kumasi..." },
          ].map(field => (
            <div key={field.label} style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>{field.label}</label>
              <input placeholder={field.placeholder} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #E0D9CE", background: "#FFF", fontSize: 15, boxSizing: "border-box", outline: "none" }} />
            </div>
          ))}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Category</label>
            <select style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #E0D9CE", background: "#FFF", fontSize: 15, outline: "none" }}>
              {CATEGORIES.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Condition</label>
            <div style={{ display: "flex", gap: 8 }}>
              {["Excellent", "Good", "Fair"].map(c => (
                <button key={c} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "1.5px solid #E0D9CE", background: "#FFF", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{c}</button>
              ))}
            </div>
          </div>
          <div style={{ border: "2px dashed #D4CBB8", borderRadius: 12, padding: "30px 20px", textAlign: "center", marginBottom: 24, cursor: "pointer", background: "#FFF" }}>
            <div style={{ fontSize: 28 }}>📷</div>
            <div style={{ fontWeight: 600, marginTop: 8 }}>Upload Photos</div>
            <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>Tap to add up to 5 photos</div>
          </div>
          <button onClick={() => { showToast("Listing submitted!"); setView("browse"); }} style={{ width: "100%", background: "#1A1208", color: "#F5C842", border: "none", borderRadius: 12, padding: "15px", fontWeight: 800, fontSize: 16, cursor: "pointer" }}>
            Publish Listing
          </button>
        </div>
      )}

      {/* Browse View */}
      {view === "browse" && (
        <main style={{ maxWidth: 600, margin: "0 auto", padding: "0 16px 40px" }}>
          {/* Hero */}
          <div style={{ padding: "28px 0 16px" }}>
            <p style={{ fontSize: 12, color: "#B5914A", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, margin: "0 0 6px" }}>Pre-loved. Priced right.</p>
            <h1 style={{ fontSize: 30, fontWeight: 900, lineHeight: 1.1, margin: "0 0 4px", letterSpacing: "-0.5px" }}>Ghana's Thrift<br />Marketplace 🇬🇭</h1>
            <p style={{ color: "#888", fontSize: 14, margin: "8px 0 0" }}>{LISTINGS.length} items across Accra, Kumasi & more</p>
          </div>

          {/* Search */}
          <div style={{ position: "relative", marginBottom: 18 }}>
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search clothes, bags, shoes..."
              style={{ width: "100%", padding: "12px 14px 12px 40px", borderRadius: 12, border: "1.5px solid #E0D9CE", background: "#FFF", fontSize: 15, boxSizing: "border-box", outline: "none" }}
            />
          </div>

          {/* Categories */}
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 20, scrollbarWidth: "none" }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  whiteSpace: "nowrap", padding: "8px 16px", borderRadius: 20,
                  border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13,
                  background: activeCategory === cat ? "#1A1208" : "#F0EBE0",
                  color: activeCategory === cat ? "#F5C842" : "#1A1208",
                  transition: "all 0.15s"
                }}
              >{cat}</button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#888" }}>
              <div style={{ fontSize: 40 }}>🔎</div>
              <p style={{ fontWeight: 600, marginTop: 12 }}>No items found</p>
              <p style={{ fontSize: 13 }}>Try a different search or category</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {filtered.map(item => (
                <div
                  key={item.id}
                  onClick={() => { setSelectedItem(item); setView("detail"); }}
                  style={{ background: "#FFF", borderRadius: 14, overflow: "hidden", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", transition: "transform 0.15s" }}
                >
                  <div style={{ position: "relative" }}>
                    <img src={item.image} alt={item.title} style={{ width: "100%", height: 170, objectFit: "cover", display: "block" }} />
                    {item.badge && (
                      <span style={{ position: "absolute", top: 8, left: 8, background: item.badge === "Hot" ? "#E53E1A" : "#1A7A4A", color: "#FFF", fontSize: 10, fontWeight: 800, padding: "3px 8px", borderRadius: 20, textTransform: "uppercase", letterSpacing: 0.5 }}>
                        {item.badge}
                      </span>
                    )}
                    <button
                      onClick={e => { e.stopPropagation(); toggleSave(item.id); showToast(saved.includes(item.id) ? "Removed from saved" : "Saved!"); }}
                      style={{ position: "absolute", top: 8, right: 8, background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%", width: 30, height: 30, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      {saved.includes(item.id) ? "♥" : "♡"}
                    </button>
                  </div>
                  <div style={{ padding: "10px 12px 12px" }}>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</div>
                    <div style={{ fontWeight: 800, fontSize: 16, color: "#1A7A4A" }}>₵{item.price}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: "#888" }}>📍 {item.location}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: CONDITION_COLOR[item.condition] }}>{item.condition}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}
    </div>
  );
}
