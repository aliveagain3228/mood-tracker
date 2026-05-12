import { useState, useEffect } from "react";
import type { MoodEntry, MoodLevel } from "../types";

const STORAGE_KEY = 'mood-entries'

export default function useMoods() {
    const [entries, setEntries] = useState<MoodEntry[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
    }, [entries])

    const today = new Date().toISOString().split('T')[0]

    const todayEntry = entries.find(e => e.date === today) ?? null

    const setMood = (level : MoodLevel, note?: string) => {
        setEntries(prev => {
            const exists = prev.some(e => e.date === today)

            if (exists) {
                return prev.map(e =>
                    e.date === today
                    ? {...e, level, note}
                        : e
                )
            }

            return [...prev, { date: today, level, note }]
        })
    }

    const getStreak = (): number => {
        if (entries.length === 0 ) return 0

        let streak = 0
        const current = new Date()

        while (true) {
            const dateStr = current.toISOString().split('T')[0]
            const hasEntry = entries.some(e => e.date === dateStr)

            if (!hasEntry) break

            streak++
            current.setDate(current.getDate() - 1)
        }

        return streak
    }

    const getAverage = () : number => {
        if (entries.length === 0) return 0
        const sum = entries.reduce((acc, e) => acc + e.level, 0)
        return Math.round((sum / entries.length) * 10) / 10
    }

    return { entries, todayEntry, setMood, getStreak, getAverage, today }
}