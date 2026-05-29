# 📊 Mood Tracker

Track your daily mood and visualize emotional patterns over time.

## 🔗 Live Demo
[mood-tracker.vercel.app](https://aliveagain3228.github.io/mood-tracker/)

## ✨ Features
- **Daily mood logging** — 5 levels with emoji (😞→😄)
- **90-day heatmap** — GitHub-style visualization
- **Streak tracking** — consecutive days counter
- **Notes** — add context to each day
- **Light/Dark theme** — persisted preference
- **Offline-ready** — localStorage, works without internet

## 🛠 Stack
| Tool | Purpose |
|------|---------|
| React 19 + TypeScript | Core framework |
| Tailwind CSS v4 | Styling |
| Framer Motion | Animations |
| Recharts | Mood chart |
| Vite | Build tool |

## ⚙️ Run locally
\`\`\`bash
npm install
npm run dev
\`\`\`

## 📁 Structure
\`\`\`
src/
  types/        — MoodLevel, MoodEntry, MOOD_CONFIG
  hooks/        — useMoods (CRUD + streak), useTheme
  components/
    MoodPicker/ — daily mood selection with note
    HeatMap/    — 90-day grid with tooltip
    MoodChart/  — 14-day line chart (recharts)
    Stats/      — streak, average, total
    History/    — last 7 entries with delete
\`\`\`
