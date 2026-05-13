import type { MoodEntry } from "../../types";
import { MOOD_CONFIG } from "../../types";
import { motion } from "framer-motion";

interface HistoryProps {
    entries: MoodEntry[]
}

export default function History({ entries }: HistoryProps) {

    const sorted = [...entries]
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 7)

    if (sorted.length === 0) {
        return (
            <div className="bg-slate-900 rounded-2xl p-6 text-center text-slate-600">
                No entries yet. Pick your first mood above!
            </div>
        )
    }

    return (
        <div className="bg-slate-900 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-white">
                Recent entries
            </h2>

            <div className="flex flex-col gap-2">
                {sorted.map((entry, index) => {
                    const config = MOOD_CONFIG[entry.level]

                    const displayDate = new Date(entry.date + 'T00:00:00')
                        .toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

                    return (
                        <motion.div
                            key={entry.date}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center gap-3 p-3 rounded-xl bg-slate-800"
                        >
                            <span className="text-2xl">{config.emoji}</span>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-sm text-white">
                                        {config.label}
                                    </span>
                                    <span className="text-slate-500 text-xs">{displayDate}</span>
                                </div>
                                {entry.note && (
                                    <p className="text-slate-800 text-xs mt-0.5 truncate">{entry.note}</p>
                                )}
                            </div>

                            <div className={`w-2 h-8 rounded-full ${config.color}`} />
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}