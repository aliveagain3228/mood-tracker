import type { MoodEntry } from "../../types";
import { MOOD_CONFIG } from "../../types";

interface HeatMapProps {
    entries: MoodEntry[]
    today: string
}

export default function HeatMap({ entries, today }: HeatMapProps) {
    const entryMap = Object.fromEntries(entries.map(e => [e.date, e]))
    const days: string[] = []
    const current = new Date(today)
    current.setDate(current.getDate() - 89)

    for (let i = 0; i < 90; i++) {
        days.push(current.toISOString().split('T')[0])
    }


return (
    <div className="bg-slate-900 rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">
            Last 90 days
        </h2>
        <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(18, 1fr)' }}>
            {days.map(date => {
                const entry = entryMap[date]

                return (
                    <div
                        key={date}
                        title={`${date}${entry ? `: ${MOOD_CONFIG[entry.level].label}` : ''}`}
                        className={`
            aspect-square rounded-sm
            ${entry
                            ? MOOD_CONFIG[entry.level].color
                            : date === today
                                ? 'bg-slate-700 ring-1 ring-white'
                                : 'bg-slate-800'
                        }
            `}
                    />
                )
            })}
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