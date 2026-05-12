import useMoods from './hooks/useMoods'
import MoodPicker from "./components/MoodPicker/MoodPicker.tsx";
import HeatMap from "./components/HeatMap/HeatMap.tsx";
import Stats from "./components/Stats/Stats.tsx";

export default function App() {
    const { entries, todayEntry, setMood, getStreak, getAverage, today } = useMoods()

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <header className="py-8 text-center border-b border border-slate-800">
                <h1 className="text-3xl font-bold text-white">Mood Tracker</h1>
                <p className="text-slate-400 text-sm mt-1">How are you feeling today?</p>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-5">
                <MoodPicker
                todayEntry={todayEntry}
                onSelect={setMood}
                />

                <Stats
                streak={getStreak()}
                average={getAverage()}
                total={entries.length}
                />

                <HeatMap
                entries={entries}
                today={today}
                />
            </main>
        </div>
    )
}
