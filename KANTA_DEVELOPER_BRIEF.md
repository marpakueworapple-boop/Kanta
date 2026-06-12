# Kanta — React Native Developer Brief

## About Kanta
**Kanta** is a pan-African thrift fashion marketplace — think Depop meets Kantamanto, built for the African continent. Users buy and sell pre-loved clothes, shoes, bags, and accessories across Ghana, Nigeria, Kenya, and beyond.

The name nods to Kantamanto (Ghana's legendary second-hand market) but is designed to scale across all of Africa.

**Brand:** Bold green + cream, Gen Z energy, fun & youthful  
**Stage:** MVP — get to market fast, iterate with real users

---

## What We Have
A fully designed **React web app** (`App.jsx`) with:
- Browse + search + category filter
- Item detail page with seller card
- Sell / listing form
- Save/wishlist
- Bottom navigation

**Your job:** Convert to React Native (Expo), wire up a real backend, integrate payments.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Mobile | React Native + Expo (iOS + Android) |
| Backend & DB | Supabase |
| Auth | Supabase Auth — phone OTP (priority) + Google |
| Payments | Paystack (MoMo, Flutterwave as fallback for Nigeria/Kenya) |
| Images | Supabase Storage |
| Push | Expo Notifications |

---

## Design Tokens

```
Background:    #FDF8EE   (warm cream)
Primary:       #0B6E4F   (deep forest green)
Accent green:  #12A073
Signature pop: #CAFF4B   (electric lime — buttons, active states)
Text:          #0F1A14
Muted:         #7A8C82
Card border:   #EEE6D0
```

Font: System UI (Inter fallback)

---

## Screens

1. Splash + 3-slide onboarding
2. Phone login + OTP
3. Home / Browse (main tab)
4. Search & Filters (price, city, condition, category)
5. Item Detail + photo gallery
6. Sell — photo upload + form
7. Messages list + chat thread
8. Profile / My listings / Earnings
9. Order history
10. Checkout (Paystack WebView)
11. Order confirmation

---

## Database (Supabase)

```sql
users:    id, phone, name, country, city, avatar_url, created_at
listings: id, seller_id, title, price, currency, category, size,
          condition, location, country, description, images[], status, created_at
orders:   id, listing_id, buyer_id, seller_id, amount, currency,
          payment_ref, status, created_at
messages: id, listing_id, sender_id, receiver_id, content, read, created_at
saved:    id, user_id, listing_id, created_at
```

---

## Multi-Country Notes

- **Currency:** Show local currency based on seller country (₵ GHS / ₦ NGN / KSh KES)
- **Payments:** Paystack covers Ghana + Nigeria. Use Flutterwave for Kenya
- **Phone login:** Support +233 (GH), +234 (NG), +254 (KE) — and all African codes
- **Cities:** Pre-populate by country. GH: Accra, Kumasi, Tema. NG: Lagos, Abuja, PH. KE: Nairobi, Mombasa
- **Language:** English for v1. French (Senegal/Côte d'Ivoire) in v2

---

## Timeline

| Phase | Days |
|---|---|
| Setup, auth, Supabase | 3 |
| Browse, listings, search | 4 |
| Sell flow + image upload | 2 |
| Messaging + push notifications | 3 |
| Payments (Paystack + Flutterwave) | 3 |
| Profile + orders | 2 |
| Testing + App Store submission | 3 |
| **Total** | **~3 weeks** |

---

## Budget

| Option | USD |
|---|---|
| Freelancer (Upwork / Toptal) | $800 – $1,800 |
| Ghana/Nigeria agency | $1,500 – $3,500 |
| Maintenance | $100 – $200/month |

---

## Deliverables Checklist
- [ ] Expo project (EAS builds for iOS + Android)
- [ ] Supabase project configured
- [ ] Paystack + Flutterwave integrated
- [ ] Google Play Store submission
- [ ] Apple App Store (TestFlight first)
- [ ] Source code ownership transferred to client
- [ ] README with full setup guide

---

## Find a Developer
- **Upwork.com** → search "React Native Supabase Africa"
- **Toptal.com** → vetted senior developers
- **LinkedIn** → "React Native developer Lagos / Accra / Nairobi"
- **Tonaton.com** → Ghana-based developers

**Questions to ask any developer:**
1. Have you shipped a React Native + Supabase app before?
2. Experience with Paystack or Flutterwave?
3. Can you handle App Store + Play Store submission?
4. Will full source code ownership transfer to me?

---

**Project:** Kanta  
**Tagline:** Africa's Thrift Marketplace  
**Website target:** kanta.app  
*Add your contact info before sending.*
