import {MOOD_CONFIG} from "../../types";
import type { MoodLevel } from "../../types";

interface StatsProps {
    streak: number
    average: number
    total: number
}

export default function Stats({ streak, average, total }: StatsProps) {

    const avgLevel = Math.round(average) as MoodLevel
    const avgColor = average > 0 ? MOOD_CONFIG[avgLevel]?.color : 'bg-slate-600'

    const stats = [
        {
            label: 'Day streak',
            value: streak,
            icon: '🔥', accent: streak > 0 ? 'text-orange-400' :  'text-slate-400'
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
                <div key={stat.label} className="bg-slate-900 rounded-2xl p-5 text-center">
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
                </div>
            ))}
        </div>
    )
}