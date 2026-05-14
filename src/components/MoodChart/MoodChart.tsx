import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import type { MoodEntry } from "../../types";
import { MOOD_CONFIG } from "../../types";

interface MoodChartProps {
    entries: MoodEntry[]
}

export default function MoodChart({ entries }: MoodChartProps) {
    const last14 = [...entries]
        .sort((a,b) => a.date.localeCompare(b.date))
        .slice(-14)
        .map(e => ({
            date: new Date(e.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric'}),
            level: e.level,
            emoji: MOOD_CONFIG[e.level].emoji
        }))

    if (last14.length < 2) {
        return (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm text-center text-slate-400 text-sm">
                Add at least 2 entries to see your mood chart 📈
            </div>
        )
    }

    const average = last14
        .reduce((acc, e) => acc + e.level, 0) / last14.length

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6 text-slate-900 dark:text-white">
                Last 14 days
            </h2>

            <ResponsiveContainer width="100%" height={180}>
                <LineChart data={last14} margin={{ top: 10, right: 10, left: -20, bottom: 0}}>
                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 11, fill: "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        domain={[1, 5]}
                        ticks={[1, 2, 3, 4, 5]}
                        tick={{ fontSize: 11, fill: "#94a3b8"}}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => MOOD_CONFIG[value as 1|2|3|4|5]?.emoji ?? value}
                    />

                    <Tooltip
                    content={({ active, payload }) => {
                        if (!active || !payload?.length) return null

                        const data = payload[0].payload

                        return (
                            <div className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm">
                                <p className="text-slate-300">{data.date}</p>
                                <p className="text-white font-medium mt-0.5">
                                    {data.emoji} {MOOD_CONFIG[data.level as 1|2|3|4|5]?.label}
                                </p>
                            </div>
                        )
                    }}
                    />

                    <ReferenceLine
                        y={average}
                        stroke="#475569"
                        strokeDasharray="4 4"
                        label={{ value: 'avg', position: 'right', fontSize: 10, fill: "#64748b" }}
                    />

                    <Line
                    type="monotone"
                    dataKey="level"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={{ fill: "#6366f1", strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, fill: "#818cf8" }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}