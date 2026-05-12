interface StatsProps {
    streak: number
    average: number
    total: number
}

export default function Stats({ streak, average, total }: StatsProps) {

    const stats = [
        { label: 'Day streak 🔥', value: streak },
        { label: 'Average mood', value: average },
        { label: 'Total entries', value: total },
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