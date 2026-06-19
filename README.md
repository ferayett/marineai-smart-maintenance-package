# MarineAI Smart Maintenance Package

An AI-supported predictive maintenance decision support system for marine engine systems. This project was developed as a university engineering assignment to demonstrate how artificial intelligence can help maritime operators monitor engine health, detect risks early, and plan maintenance more effectively.

## Project Overview

Marine engines operate in harsh conditions where unexpected failures can cause costly downtime and safety risks. MarineAI collects sensor data from engine systems, analyses it using AI models, and presents clear health scores, risk levels, and maintenance recommendations to operators and technicians.

The system is designed for:

- **Ship operators** who need a clear overview of engine health
- **Maintenance technicians** who need actionable alerts and checklists on board
- **Fleet managers** who want to compare engines and plan service schedules

## Website Features

The static project website includes six main sections:

### 1. Home
Introduction to the project with a hero section, project description, and key highlights (24/7 monitoring, AI risk prediction, three service packages).

### 2. How It Works
A four-step process flow explaining how MarineAI works:
1. Collect sensor data
2. AI analysis
3. Dashboard and alerts
4. Maintenance action

### 3. Dashboard Preview
A simulated web dashboard showing real-time engine data:
- Engine Health Score: 68/100
- Risk Level: High
- AI Confidence: 87%
- Sensor readings (temperature, oil pressure, vibration, operating hours, last maintenance)
- AI recommendation with possible fault and recommended action

### 4. Maintenance Packages
Three service tiers:
- **Basic Package** — Essential monitoring and monthly reports
- **Smart Package** — AI-powered predictive maintenance with mobile app access
- **Premium Package** — Full fleet management with advanced analytics and support

### 5. Mobile App Prototype Preview
An interactive phone mockup with five technician screens:
- **Technician Dashboard** — Active alerts and quick engine stats
- **Alert Detail** — Full alert information with sensor context
- **AI Recommendation** — Fault diagnosis and recommended action
- **Maintenance Checklist** — Interactive task list with progress tracking
- **Technician Feedback** — Form to report findings and rate AI helpfulness

### 6. Request Demo
A contact form for demo requests with fields for name, email, company, package interest, and message.

## Mobile App Prototype Features

The mobile app prototype is designed for technicians working on board vessels:

| Feature | Description |
|---------|-------------|
| Alert notifications | Priority-based alerts for engine issues |
| AI recommendations | Clear fault descriptions and action steps |
| Maintenance checklists | Step-by-step tasks with completion tracking |
| Technician feedback | Submit repair notes and rate AI recommendations |
| Quick stats | Health score, run hours, and time since last service |

## Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Page structure and semantic content |
| CSS3 | Layout, marine-themed styling, responsive design |
| JavaScript (Vanilla) | Navigation, mobile app screen switching, form handling, animations |
| Google Fonts (Inter, JetBrains Mono) | Typography |

No frameworks or build tools are required. The website runs directly in any modern web browser.

## How to Run

1. Clone or download this repository
2. Open `index.html` in a web browser
3. No server or installation is needed

Alternatively, use a local development server:

```bash
# Python 3
python -m http.server 8000

# Node.js (if npx is available)
npx serve .
```

Then visit `http://localhost:8000` in your browser.

## File Structure

```
marineai-smart-maintenance-package/
├── index.html      # Main website page
├── style.css       # All styles and responsive layout
├── script.js       # Interactive features
└── README.md       # Project documentation
```

## Limitations

This is a **university prototype** and has the following limitations:

- **Simulated data only** — All engine readings and AI predictions are hard-coded examples, not connected to real sensors or AI models
- **No backend** — Forms show success messages locally but do not send data to a server
- **No real AI** — The "AI" recommendations are pre-written text based on the simulated scenario
- **Mobile app is a mockup** — The phone interface is a web prototype, not a native mobile application
- **No authentication** — There is no user login or role-based access control
- **No database** — Maintenance history and technician feedback are not stored
- **Single engine view** — The dashboard shows one engine; multi-engine fleet management is not implemented
- **Not production-ready** — The system is not tested for use in real maritime operations

## Future Improvements

Possible extensions for a full production system:

- Connect to real engine sensor APIs (Modbus, NMEA, OPC-UA)
- Train and deploy machine learning models for fault prediction
- Build a native mobile app (React Native or Flutter)
- Add a backend with database for history and user management
- Implement multi-engine fleet dashboards
- Add email/SMS alert notifications
- Integrate with existing ship maintenance management systems

## License

This project was created for educational purposes as part of a university engineering course.

---

**MarineAI Smart Maintenance Package** · University Engineering Project · 2026
