# EduLens 🎓

**AI-onderwijsdashboard voor basisscholen**

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-18+-blue.svg)

## 📋 Inhoudsopgave

- [Over EduLens](#over-edulens)
- [Features](#features)
- [Technologie Stack](#technologie-stack)
- [Installatie](#installatie)
- [Configuratie](#configuratie)
- [Gebruik](#gebruik)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Licentie](#licentie)

## 🎯 Over EduLens

EduLens is een intelligent dashboard dat onderwijzers en directeuren helpt bij het monitoren en analyseren van leerresultaten. Met AI-gestuurde inzichten kunt u gemakkelijk trends identificeren, gerichte interventies plannen en de schoolkwaliteit verbeteren.

### Doelgroep
- 🏫 Basisscholen (groep 1-8)
- 👨‍🏫 Leerkrachten en docenten
- 📊 Directeuren en schoolleiders
- 📈 Onderwijscoördinatoren

## ✨ Features

### 🔐 Authenticatie & Gebruikersbeheer
- ✅ Veilige login en registratie
- ✅ Rol-gebaseerde toegangsverlening (Directeur, Leraar, Leerkracht)
- ✅ Wachtwoordbeveiliging
- ✅ Sessiemanagement
- ✅ "Onthoud mij" functionaliteit

### 📊 Dashboard
- ✅ Realtime leerresultaten overzicht
- ✅ Snelle statistieken (totaal leerlingen, interventies, scores)
- ✅ AI-gestuurde aanbevelingen
- ✅ Recente activiteitsoverzicht
- ✅ Trend visualisaties

### 👥 Leerlingenmanagement
- ✅ Volledige leerlingenmonitor
- ✅ Gedetailleerde leerlingprofielen
- ✅ Individuele scoregeschiedenis
- ✅ Sterke punten en verbeterpunten
- ✅ Oudercontactgegevens
- ✅ Leerlingen toevoegen/bewerken/verwijderen

### 🎯 Interventies
- ✅ Geplande interventies aanmaken
- ✅ Voortgang tracking
- ✅ Status monitoring (Actief, Gepland, Afgerond)
- ✅ Effectiviteitsmeting
- ✅ Interventie budget tracking

### 📈 Data Analyses
- ✅ Interactieve grafieken (Line, Bar, Pie)
- ✅ Trend analyses over tijd
- ✅ Prestatie per groep vergelijken
- ✅ AI-gegenereerde inzichten
- ✅ Predictieve analytics

### 📋 Rapportages
- ✅ Automatische rapportgeneratie
- ✅ Verschillende rapporttypes
- ✅ PDF export functionaliteit
- ✅ Geplande rapportage (wekelijks, maandelijks)
- ✅ Archief van alle rapporten

## 🛠️ Technologie Stack

### Frontend
- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Visualisatie**: Recharts
- **State Management**: React Hooks
- **Storage**: LocalStorage (Browser)

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Next.js API Routes
- **Database**: LocalStorage (Development)

### DevOps
- **Package Manager**: npm / yarn
- **Version Control**: Git
- **Deployment**: Vercel, Docker, Traditional Server

## 🚀 Installatie

### Vereisten

- Node.js 18 of hoger
- npm 9 of hoger (of yarn)
- Git
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Stap 1: Repository klonen

```bash
git clone https://github.com/MeesterDo-byte/edulens.git
cd edulens
```

### Stap 2: Dependencies installeren

```bash
npm install
# of met yarn
yarn install
```

### Stap 3: Development server starten

```bash
npm run dev
# of met yarn
yarn dev
```

### Stap 4: Browser openen

Ga naar: **http://localhost:3000**

## ⚙️ Configuratie

### Environment Variabelen

Maak een `.env.local` bestand in de root directory:

```env
# Development
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=EduLens

# Production (wanneer gedeployeerd)
NEXT_PUBLIC_API_URL=https://edulens.example.com
NEXT_PUBLIC_APP_NAME=EduLens
```

### Tailwind CSS Configuratie

De configuratie staat al in `tailwind.config.js`. Wijzig indien nodig:

```javascript
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 📖 Gebruik

### 1️⃣ Inloggen

**URL**: `http://localhost:3000/login`

**Demo Credentials**:
```
Email: marieke@horizonschool.nl
Wachtwoord: wachtwoord123
```

Of registreer een nieuw account via `/register`

### 2️⃣ Dashboard

Na inloggen zie je:
- Welkomstbericht met je naam
- Statistieken (leerlingen, interventies, scores)
- AI-aanbevelingen
- Snelle links naar andere secties

### 3️⃣ Leerlingen Beheren

**URL**: `http://localhost:3000/leerlingen`

1. Klik "+ Leerling toevoegen"
2. Vul gegevens in:
   - Naam
   - Groep (bijv. 5A)
   - Geboortedatum
   - E-mail
   - Telefoonnummer
   - Ouders
3. Klik "Toevoegen"

**Leerlingdetails bekijken**:
- Klik op "Details" achter een leerling
- Bekijk profiel, scores, sterke punten
- Zie scoregeschiedenis

### 4️⃣ Interventies Plannen

**URL**: `http://localhost:3000/interventies`

1. Klik "+ Nieuwe Interventie"
2. Vul in:
   - Titel (bijv. "Leesinterventie groep 7")
   - Beschrijving
   - Duur
   - Startdatum
   - Betrokken leerlingen
3. Monitor voortgang

### 5️⃣ Data Analyses

**URL**: `http://localhost:3000/analyses`

Zie:
- Trends over tijd (lijn-grafieken)
- Prestaties per groep (staafdiagrammen)
- Totale schoolstatus (pie-chart)
- AI Insights en aanbevelingen

### 6️⃣ Rapportages

**URL**: `http://localhost:3000/rapportages`

- Download bestaande rapporten
- Maak nieuwe rapporten
- Kies rapport type en groepen
- Exporteer als PDF

## 🔌 API Endpoints

### Authenticatie

```typescript
POST /api/auth/register
{
  "schoolNaam": "string",
  "voornaam": "string",
  "achternaam": "string",
  "email": "string",
  "password": "string",
  "rol": "directeur" | "leraar" | "leerkracht"
}

POST /api/auth/login
{
  "email": "string",
  "password": "string"
}

POST /api/auth/logout
```

### Leerlingen

```typescript
GET /api/students
GET /api/students/:id
POST /api/students
PUT /api/students/:id
DELETE /api/students/:id
GET /api/students/:id/scores
```

### Interventies

```typescript
GET /api/interventions
GET /api/interventions/:id
POST /api/interventions
PUT /api/interventions/:id
DELETE /api/interventions/:id
```

### Analyses

```typescript
GET /api/analytics/trends
GET /api/analytics/performance
GET /api/analytics/insights
```

## 🌐 Deployment

### Option 1: Vercel (Aanbevolen) ⭐

**Voordelen:**
- Snelste deployment
- Gratis tier beschikbaar
- Automatische CI/CD
- Custom domein

**Stappen:**

1. Push code naar GitHub
2. Ga naar [Vercel.com](https://vercel.com)
3. Klik "New Project"
4. Selecteer je GitHub repo
5. Klik "Deploy"

```bash
# Of via CLI:
npm i -g vercel
vercel
```

### Option 2: Docker

**Dockerfile aanmaken:**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**Build en run:**

```bash
# Build image
docker build -t edulens:latest .

# Run container
docker run -p 3000:3000 edulens:latest

# Of met docker-compose
docker-compose up
```

### Option 3: Traditionele Server

**VPS (Digital Ocean, Linode, AWS):**

```bash
# SSH in server
ssh root@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repo
git clone https://github.com/MeesterDo-byte/edulens.git
cd edulens

# Install en build
npm install
npm run build

# Use PM2 for process management
npm install -g pm2
pm2 start npm --name "edulens" -- start
pm2 save
```

**Nginx als Reverse Proxy:**

```nginx
server {
    listen 80;
    server_name edulens.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
    }
}
```

## 🆘 Troubleshooting

### Port 3000 is al in gebruik

```bash
# Gebruik ander port
npm run dev -- -p 3001
```

### Dependencies niet geïnstalleerd

```bash
# Clear cache en reinstall
rm -rf node_modules package-lock.json
npm install
```

### Login werkt niet

1. Check browser console voor errors
2. Verwijder browser cache/cookies
3. Probeer incognito mode
4. Check localStorage in DevTools

### Build errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 📚 Documentatie

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Recharts Docs](https://recharts.org/)

## 🤝 Bijdragen

We stellen bijdragen op prijs! Volg deze stappen:

1. Fork de repository
2. Maak een feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit je changes (`git commit -m 'Add some AmazingFeature'`)
4. Push naar branch (`git push origin feature/AmazingFeature`)
5. Open een Pull Request

## 🐛 Bugs Melden

Ga naar [Issues](https://github.com/MeesterDo-byte/edulens/issues) en klik "New Issue".

Includeer:
- Beschrijving van bug
- Stappen om te reproduceren
- Expected behavior
- Actual behavior
- Screenshots
- Browser/OS info

## 📄 Licentie

Dit project is gelicentieerd onder de MIT Licentie - zie [LICENSE](LICENSE) bestand.

## 👥 Team

- **Ontwikkelaar**: MeesterDo-byte
- **Contactperson**: Marieke Jansen
- **Email**: support@edulens.nl

## 🙏 Dankwoorden

- Next.js team
- Tailwind CSS team
- Recharts developers
- Alle testers en gebruikers

## 📞 Support

**Heeft u vragen of hulp nodig?**

1. Check de [FAQ](#faq) hierboven
2. Open een GitHub Issue
3. Stuur een email naar support@edulens.nl
4. Bezoek onze website: [edulens.nl](https://edulens.nl)

---

**Gemaakt met ❤️ voor onderwijs**

*Versie 1.0.0 © 2024 EduLens. Alle rechten voorbehouden.*
