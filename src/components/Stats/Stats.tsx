import {MOOD_CONFIG} from "../../types";
import type { MoodLevel } from "../../types";

interface StatsProps {
    streak: number
    average: number
    total: number
}

export default function Stats({ streak, average, total }: StatsProps) {

    const avgLevel = Math.round(average) as MoodLevel

    const stats = [
        {
            label: 'Day streak',
            value: streak,
            icon: '🔥', accent: streak > 0 ? 'text-orange-400' : 'text-slate-400'
        },
        {
            label: 'Average mood',
            value: average || '-',
            icon: average > 0 ? MOOD_CONFIG[avgLevel]?.emoji : '😶',
            accent: average > 0 ? 'text-white' : 'text-slate-400'
        },
        {
            label: 'Total entries',
            value: total,
            icon: '📅',
            accent: total > 0 ? 'text-blue-400' : 'text-slate-400'
        },
    ]

    return (
        <div className="grid grid-cols-3 gap-4">
            {stats.map(stat => (
                <div key={stat.label} className="bg-white dark:bg-slate-900 rounded-2xl p-5 text-center shadow-sm">
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <p className={`text-3xl font-bold ${stat.accent}`}>{stat.value}</p>
                    <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
                </div>
            ))}
        </div>
    )
}