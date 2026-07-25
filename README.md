# EduLens 📚

AI-onderwijsdashboard voor basisscholen

## Over EduLens

EduLens is een intelligent dashboard dat onderwijzers helpt bij het monitoren en analyseren van leerresultaten. Met AI-gestuurde inzichten kunt u gemakkelijk trends identificeren en gerichte interventies plannen.

## Features ✨

### Dashboard
- 📊 Realtime leerresultaten overzicht
- 🤖 AI-gestuurde analyse en aanbevelingen
- 📈 Trend tracking en groei monitoring
- ⚠️ Automatische aandachtspunten
- 💡 Verbeterplannen en interventies

### Leerlingenmanagement
- 👥 Volledige leerlingenmonitor
- 📋 Gedetailleerde leerlingprofielen
- 📊 Individuele scoregeschiedenis
- ✅ Sterke punten en verbeterpunten
- 👨‍👩‍👧 Oudercontactgegevens

### Interventies
- 🎯 Geplande interventies
- ⏱️ Voortgang tracking
- 📍 Status monitoring
- 📈 Effectiviteitsmeting

### Analyses & Rapportages
- 📈 Gedetailleerde data visualisaties
- 📊 Trend analyses over tijd
- 🥧 Prestatie per groep
- 📑 Automatische rapportgeneratie
- 📥 Download mogelijkheden

### Authenticatie
- 🔐 Veilige login systeem
- ✍️ Gebruikersregistratie
- 🔑 Wachtwoord validatie

## Installatie

### Vereisten

- Node.js 18+ 
- npm of yarn

### Setup

1. Clone de repository:

```bash
git clone https://github.com/MeesterDo-byte/edulens.git
cd edulens
```

2. Installeer dependencies:

```bash
npm install
```

3. Start de development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in je browser

## Verwendung

### Login
- Ga naar `/login`
- Demo credentials: `test@school.nl` / `password123`

### Registreer
- Ga naar `/register`
- Vul je schoolgegevens in

### Dashboard
- Overzicht van alle leerresultaten
- AI-aanbevelingen zien
- Snelle toegang tot alle secties

### Leerlingen
- Bekijk alle leerlingen
- Klik op een leerling voor gedetailleerde info
- Bekijk scoregeschiedenis

### Interventies
- Bekijk actieve en geplande interventies
- Voortgang monitoren
- Nieuwe interventies aanmaken

### Analyses
- Visualiseer trends over tijd
- Vergelijk groepen
- Bekijk key insights

### Rapportages
- Download rapportages
- Verschillende rapporttypes
- Archief van alle rapporten

## Pagina's

- `/` - Dashboard
- `/login` - Inloggen
- `/register` - Registreren
- `/leerlingen` - Leerlingenmonitor
- `/leerling/[id]` - Leerlingdetails
- `/interventies` - Interventiemanagement
- `/analyses` - Data analyses
- `/rapportages` - Rapportages

## Build & Deployment

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

### Deployment opties

#### Vercel (Aanbevolen)
1. Push code naar GitHub
2. Go naar [Vercel.com](https://vercel.com)
3. Koppel je GitHub repo
4. Deploy!

#### Docker
```bash
docker build -t edulens .
docker run -p 3000:3000 edulens
```

#### Traditional Server
```bash
npm run build
npm start
```

## Technologie Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Visualisatie**: Recharts
- **Runtime**: Node.js

## Project Structuur

```
edulens/
├── pages/              # Next.js pages
│   ├── index.tsx      # Dashboard
│   ├── login.tsx      # Inloggen
│   ├── register.tsx   # Registreren
│   ├── leerlingen.tsx # Leerlingenmonitor
│   ├── leerling/[id].tsx # Leerlingdetails
│   ├── interventies.tsx # Interventies
│   ├── analyses.tsx   # Analyses
│   └── rapportages.tsx # Rapportages
├── styles/            # Global styles
│   └── globals.css
├── public/            # Static files
├── package.json       # Dependencies
├── tsconfig.json      # TypeScript config
├── tailwind.config.js # Tailwind config
└── next.config.js     # Next.js config
```

## Toekomstige Features

- 🗄️ Database integratie (PostgreSQL)
- 🔐 Advanced authenticatie (OAuth)
- 📧 Email notificaties
- 📱 Mobile app
- 🌐 Multi-language support
- 🤖 Machine Learning voorspellingen
- 📊 Advanced reporting
- 🔔 Real-time alerts

## Licentie

MIT

## Contact

Vragen? Open een issue op [GitHub](https://github.com/MeesterDo-byte/edulens/issues).

## Support

Bij vragen of problemen:
1. Check de [FAQ](#)
2. Open een GitHub issue
3. Stuur een email naar support@edulens.nl

---

**Gemaakt met ❤️ voor onderwijs**
