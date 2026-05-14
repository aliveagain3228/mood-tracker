import type { MoodEntry } from "../../types";
import { MOOD_CONFIG } from "../../types";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeatMapProps {
    entries: MoodEntry[]
    today: string
}

export default function HeatMap({ entries, today }: HeatMapProps) {

    const [tooltip,setTooltip] = useState<{ date: string; entry: MoodEntry | null } | null>(null)

    const entryMap = Object.fromEntries(entries.map(e => [e.date, e]))
    const days: string[] = []
    const current = new Date(today)
    current.setDate(current.getDate() - 89)

    for (let i = 0; i < 90; i++) {
        days.push(current.toISOString().split('T')[0])
        current.setDate(current.getDate() + 1)
    }


return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
            Last 90 days
        </h2>

        <div className="relative">

        <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(18, 1fr)' }}>
            {days.map(date => {
                const entry = entryMap[date]
                const isToday = date === today

                return (
                    <motion.div
                        key={date}
                        whileHover={{ scale: 1.3 }}
                        onMouseEnter={() => setTooltip({ date, entry: entry ?? null })}
                        onMouseLeave={() => setTooltip(null)}
                        title={`${date}${entry ? `: ${MOOD_CONFIG[entry.level].label}` : ''}`}
                        className={`
           aspect-square rounded-sm cursor-pointer
           ${entry 
                            ? MOOD_CONFIG[entry.level].color 
                            : isToday ? 'bg-slate-700 ring-1 ring-white' 
                                : 'bg-slate-200 dark:bg-slate-800'
                        }
            `}
                    />
                )
            })}
        </div>

            <AnimatePresence>
                {tooltip && (
                    <motion.div
                        initial={{ opacity: 0, y:4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        className="mt-3 p-3 bg-slate-800 rounded-xl text-sm"
                    >
                        <span className="text-slate-300">
                            {new Date(tooltip.date + "T00:00:00")
                                .toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </span>
                        {tooltip.entry ? (
                            <div className="mt-1">
                                <span className='font-medium text-white'>
                                    {MOOD_CONFIG[tooltip.entry.level].emoji} {MOOD_CONFIG[tooltip.entry.level].label}
                                </span>
                                {tooltip.entry.note && (
                                    <p className="text-slate-400 text-xs mt-0.5">{tooltip.entry.note}</p>
                                )}
                            </div>
                        ) : (
                        <p className="text-slate-500 mt-1 text-xs">No entry</p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        <div className="flex items-center gap-3 mt-4 flex-wrap">
            {(Object.entries(MOOD_CONFIG) as [string, typeof MOOD_CONFIG[1]][]).map(([key, config]) => (
                <div key={key} className="flex items-center gap-1">
                    <div className={`w-3 h-3 rounded-sm ${config.color}`} />
                    <span className="text-xs text-slate-400">{config.emoji} {config.label}</span>
                </div>
            ))}
        </div>
    </div>
)
}