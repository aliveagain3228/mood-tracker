import { useMoods } from './hooks/useMoods'
import MoodPicker from "./components/MoodPicker/MoodPicker.tsx";
import HeatMap from "./components/HeatMap/HeatMap.tsx";
import Stats from "./components/Stats/Stats.tsx";
import { motion } from "framer-motion";
import History from "./components/History/History.tsx";
import { useTheme } from './hooks/useTheme.ts'
import MoodChart from "./components/MoodChart/MoodChart.tsx";

export default function App() {
    const { entries, todayEntry, setMood, deleteEntry, getStreak, getAverage, today } = useMoods()
    const { theme, toggleTheme } = useTheme()

    return (
        <div className="min-h-screen bg-slate-950 dark:bg-slate-950 text-white transition-colors duration-300">
            <header className="py-8 text-center border-b border border-slate-800">
                <div className="max-w-2xl mx-auto flex items-center justify-between">
                    <div>
                <motion.h1
                    className="text-3xl font-bold"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Mood Tracker
                </motion.h1>
                <p
                    className="text-slate-400 text-sm mt-1"
                >
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
                </div>

                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors text-xl"
                    title="Toggle Theme"
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
                {[
                    <MoodPicker key="picker" todayEntry={todayEntry} onSelect={setMood} />,
                    <Stats key="stats" streak={getStreak()} average={getAverage()} total={entries.length} />,
                    <HeatMap key="heatmap" entries={entries} today={today} />,
                    <History key="history" entries={entries} onDelete={deleteEntry} />,
                    <MoodChart key="chart" entries={entries} />

                ].map((component, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        {component}
                    </motion.div>
                ))}
            </main>
        </div>
    )
}
