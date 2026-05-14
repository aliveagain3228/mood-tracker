import type { MoodEntry } from "../../types";
import { MOOD_CONFIG } from "../../types";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface HistoryProps {
    entries: MoodEntry[]
    onDelete: (date: string) => void
}

export default function History({ entries, onDelete }: HistoryProps) {

    const [confirmDate, setConfirmDate] = useState<string | null>(null)

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
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 dark:text-white">
                Recent entries
            </h2>

            <div className="flex flex-col gap-2">
                <AnimatePresence>
                {sorted.map((entry, index) => {
                    const config = MOOD_CONFIG[entry.level]

                    const displayDate = new Date(entry.date + 'T00:00:00')
                        .toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

                    return (
                        <motion.div
                            key={entry.date}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 overflow-hidden  "
                        >
                            <span className="text-2xl">{config.emoji}</span>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-sm text-slate-900 dark:text-white">
                                        {config.label}
                                    </span>
                                    <span className="text-slate-500 dark:text-slate-500 text-xs">{displayDate}</span>
                                </div>
                                {entry.note && (
                                    <p className="text-slate-400 text-xs mt-0.5 truncate">{entry.note}</p>
                                )}
                            </div>

                            <div className={`w-2 h-8 rounded-full ${config.color}`} />

                            {confirmDate === entry.date ? (
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => {
                                            onDelete(entry.date)
                                            setConfirmDate(null)
                                        }}
                                        className="text-xs bg-red-600 hover:bg-red-500 px-2 py-1 rounded-lg transition-colors"
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={() => setConfirmDate(null)}
                                        className="text-xs bg-slate-600 hover:bg-slate-500 px-2 py-1 rounded-lg transition-colors"
                                    >
                                        No
                                    </button>
                                </div>
                            ) : (
                                <button onClick={() => setConfirmDate(entry.date)}
                                        className="text-slate-600 hover:text-red-400 text-xs transition-colors"
                                >
                                    ✕
                                </button>
                            )}
                        </motion.div>
                    )
                })}
                </AnimatePresence>
            </div>
        </div>
    )
}