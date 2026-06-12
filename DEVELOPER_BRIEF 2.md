# ThriftGH — React Native Developer Brief

## Project Overview
**ThriftGH** is a thrift clothes marketplace app for Ghana, similar to Depop or Vinted but built for the Ghanaian market. Users can browse, buy, and sell second-hand fashion across Accra, Kumasi, Tema, Takoradi, and other cities.

---

## What We Have
A fully designed **React web app** (provided as `App.jsx`) with:
- Browse/search listings with category filters
- Item detail page
- Seller listing form
- Save/wishlist functionality
- Cart flow (UI only)

**Your job:** Convert this into a production React Native app on Expo, connect a real backend, and integrate local payment.

---

## Tech Stack (Required)

| Layer | Tool | Why |
|---|---|---|
| Mobile Framework | React Native + Expo | Fast build, iOS + Android from one codebase |
| Backend & Database | Supabase | Free tier, real-time, easy image storage |
| Authentication | Supabase Auth | Phone number (OTP) login — important for Ghana |
| Payments | Paystack | Ghana's #1 payment gateway, supports MTN MoMo + card |
| Image Storage | Supabase Storage | For seller product photo uploads |
| Push Notifications | Expo Notifications | For new messages, order updates |

---

## Core Features to Build

### 1. Authentication
- Sign up / login via **phone number + OTP** (most Ghanaian users don't use email regularly)
- Optional: Google sign-in as secondary option
- User profile: name, phone, location (city), profile photo

### 2. Listings / Browse
- Grid view of listings (2 columns) — see design in App.jsx
- Filters: category, city, price range, condition
- Search by title or location
- Infinite scroll / pagination (load 20 items at a time)

### 3. Item Detail
- Photo gallery (swipeable, up to 5 photos)
- Item info: title, price (₵), size, condition, category
- Seller profile card with "Message Seller" button
- Add to cart / Buy Now buttons
- Save to wishlist

### 4. Sell / List an Item
- Photo upload (camera or gallery, up to 5 photos)
- Form: title, price, category, size, condition, location, description
- Submit → saved to Supabase, visible on marketplace

### 5. Messaging
- Simple in-app chat between buyer and seller per listing
- Push notification when new message arrives

### 6. Payments (Paystack)
- Buyer taps "Buy Now" → Paystack checkout
- Supports: MTN Mobile Money, Vodafone Cash, AirtelTigo Money, Visa/Mastercard
- On success: order created, seller notified
- Seller receives payout (manual transfer initially, automate later)

### 7. Orders & Profile
- Buyer: order history, saved items
- Seller: active listings, sold items, earnings summary

---

## Database Schema (Supabase)

```sql
-- Users
users: id, phone, name, city, avatar_url, created_at

-- Listings
listings: id, seller_id, title, price, category, size, condition, 
          location, description, images (array), status (active/sold), created_at

-- Orders
orders: id, listing_id, buyer_id, seller_id, amount, payment_ref, 
        status (pending/paid/complete), created_at

-- Messages
messages: id, listing_id, sender_id, receiver_id, content, read, created_at

-- Saved
saved: id, user_id, listing_id, created_at
```

---

## Design Tokens (from existing design)

```
Background:   #FAF7F2
Dark:         #1A1208
Gold accent:  #F5C842
Green:        #1A7A4A
Text muted:   #888888
Card bg:      #FFFFFF
Border:       #E0D9CE
```

Font: **Inter** (system font fallback on React Native)

---

## Screens List

1. Splash / Onboarding (3 slides)
2. Phone login + OTP verify
3. Home / Browse (main tab)
4. Search & Filters
5. Item Detail
6. Sell — photo upload + form
7. Messages list
8. Message thread (chat)
9. Profile / My listings
10. Order history
11. Checkout (Paystack WebView)
12. Order confirmation

---

## Localisation Notes
- Currency: Ghana Cedi (₵ / GHS)
- Phone format: +233 XX XXX XXXX
- Cities to pre-populate: Accra, Kumasi, Tema, Takoradi, Cape Coast, Tamale, Sunyani
- Language: English (no translation needed for v1)
- Low data mode consideration: compress images on upload, lazy load

---

## Deliverables

- [ ] Expo project (iOS + Android builds via EAS)
- [ ] Supabase project set up with schema above
- [ ] Paystack integration (test + live keys)
- [ ] App submitted to Google Play Store
- [ ] App submitted to Apple App Store (TestFlight first)
- [ ] Admin view (simple Supabase dashboard is fine for v1)
- [ ] README with setup instructions

---

## Timeline Estimate
| Phase | Work | Time |
|---|---|---|
| Setup & Auth | Expo setup, Supabase, phone OTP | 3 days |
| Browse & Listings | Home, detail, search, filters | 4 days |
| Sell flow | Upload, form, submit | 2 days |
| Messaging | Chat UI + push notifications | 3 days |
| Payments | Paystack integration | 2 days |
| Profile & Orders | Buyer/seller dashboards | 2 days |
| Testing & Polish | Bug fixes, store submission | 3 days |
| **Total** | | **~3 weeks** |

---

## Budget Guide
| Scope | Est. Cost (USD) |
|---|---|
| Freelancer (Upwork / Tonaton) | $600 – $1,500 |
| Small agency (Ghana-based) | $1,500 – $3,000 |
| Ongoing maintenance | $100 – $200/month |

---

## Questions for Developer
Before starting, confirm:
1. Have you built with Supabase + React Native before?
2. Do you have experience with Paystack or similar payment gateway?
3. Can you handle App Store + Google Play submission?
4. Will you provide source code ownership to the client?

---

## Contact / Project Owner
**App Name:** ThriftGH  
**Country:** Ghana 🇬🇭  
**Stage:** MVP — get to market fast, iterate based on users  
*Fill in your contact details here before sending to a developer.*
