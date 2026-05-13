import useMoods from './hooks/useMoods'
import MoodPicker from "./components/MoodPicker/MoodPicker.tsx";
import HeatMap from "./components/HeatMap/HeatMap.tsx";
import Stats from "./components/Stats/Stats.tsx";
import { motion } from "framer-motion";
import History from "./components/History/History.tsx";

export default function App() {
    const { entries, todayEntry, setMood, getStreak, getAverage, today } = useMoods()

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <header className="py-8 text-center border-b border border-slate-800">
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
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-5">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <MoodPicker
                        todayEntry={todayEntry}
                        onSelect={setMood}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Stats
                        streak={getStreak()}
                        average={getAverage()}
                        total={entries.length}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <HeatMap
                        entries={entries}
                        today={today}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <History entries={entries} />
                </motion.div>
            </main>
        </div>
    )
}
