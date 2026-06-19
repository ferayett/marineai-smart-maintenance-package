# MarineAI Technician App

A **React Native / Expo** front-end prototype for marine technicians who receive AI-supported maintenance alerts for marine engine systems.

This app is part of the [MarineAI Smart Maintenance Package](../README.md) university engineering project. It uses **simulated data only** — no real sensors, backend, or trained AI model are connected.

## Screens

| Screen | Purpose |
|--------|---------|
| **Technician Dashboard** | Overview of active alerts, engine health, and quick navigation |
| **Alert Detail** | Full alert context with simulated sensor readings |
| **AI Recommendation** | Simulated fault diagnosis and recommended action |
| **Maintenance Checklist** | Interactive step-by-step tasks with completion tracking |
| **Technician Feedback** | Rate the AI recommendation (Correct / Partially correct / Incorrect) |

## Simulated Data

All values are hard-coded for the prototype scenario:

- **Engine Unit:** ME-01 Main Propulsion Engine
- **Temperature:** 92°C
- **Oil Pressure:** Low
- **Vibration Level:** High
- **Operating Hours:** 1340 h
- **Last Maintenance:** 78 days ago
- **Engine Health Score:** 68/100
- **Risk Level:** High
- **AI Confidence:** 87%
- **Possible Fault:** Cooling system or lubrication problem
- **Recommended Action:** Check cooling system and oil circulation within 24 hours

## Prerequisites

Before running the app, install:

1. **Node.js** (LTS version, e.g. 18 or 20) — [https://nodejs.org](https://nodejs.org)
2. **Expo CLI** (optional; `npx expo` works without a global install)
3. **Expo Go** on your phone (iOS or Android) — search "Expo Go" in the App Store or Google Play

For Android emulator or iOS Simulator, you may also need Android Studio or Xcode.

## How to Run with Expo

Open a terminal in the `mobile-app` folder and follow these steps:

### 1. Install dependencies

```bash
cd mobile-app
npm install
```

### 2. Start the Expo development server

```bash
npx expo start
```

This opens the Expo Dev Tools in your terminal and usually in the browser.

### 3. Open the app on a device or emulator

Choose one of these options:

| Method | How |
|--------|-----|
| **Physical phone** | Scan the QR code with the Expo Go app (Android) or the Camera app (iOS) |
| **Android emulator** | Press `a` in the terminal after starting Expo |
| **iOS Simulator** | Press `i` in the terminal (macOS with Xcode only) |
| **Web browser** | Press `w` in the terminal (limited; native mobile UI is the main target) |

### Example workflow

```bash
cd mobile-app
npm install
npx expo start
# Scan QR code with Expo Go, or press 'a' / 'i' for an emulator
```

## Project Structure

```
mobile-app/
├── App.js          # All five screens and navigation
├── package.json    # Expo and React Navigation dependencies
└── README.md       # This file
```

## Technologies

| Package | Purpose |
|---------|---------|
| Expo | React Native toolchain and dev server |
| React Navigation | Stack navigation between screens |
| React Native | Mobile UI components |

## Limitations

This is a **front-end prototype only**:

- No connection to real engine sensors or ship systems
- No live AI model — recommendations use pre-written simulated logic
- No backend, database, or user authentication
- Technician feedback is stored in local component state only (not persisted)
- Not intended for production maritime use

## Future Improvements

Possible next steps for a full mobile product:

- Connect to a REST API for live sensor data and alerts
- Push notifications for high-risk alerts
- Offline checklist mode for use at sea
- Multi-engine fleet view
- Integration with ship maintenance management systems

---

**MarineAI Technician App** · University Engineering Project · 2026
