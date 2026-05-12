import { motion } from "framer-motion";
import {MOOD_CONFIG, type MoodEntry, type MoodLevel} from "../../types";

interface MoodPickerProps {
    todayEntry: MoodEntry | null
    onSelect: (level: MoodLevel, note?: string) => void
}

export default function MoodPicker({ todayEntry, onSelect }: MoodPickerProps) {
    return (
        <div className="bg-slate-900 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-center">
                {todayEntry
                    ? `Today: ${MOOD_CONFIG[todayEntry.level].emoji} ${MOOD_CONFIG[todayEntry.level].label}`
                    : "Pick today's mood"
                }
            </h2>

            <div className="flex justify-center gap-3">
                {(Object.entries(MOOD_CONFIG) as [string, typeof MOOD_CONFIG[1]][]).map(([key, config]) => {
                    const level = Number(key) as MoodLevel
                    const isSelected = todayEntry?.level === level

                    return (
                        <motion.button
                            key={key}
                            onClick={() => onSelect(level)}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            className={`
                            flex flex-col items-center gap-1 p-3 rounded-xl
                            transition-colors cursor-pointer border-2
                            ${isSelected
                                ? 'border-white bg-slate-700'
                                : 'border-transparent bg-slate-800 hover:bg-slate-700'
                            }
                            `}
                        >
                            <span className="text-3xl">{config.emoji}</span>
                            <span className="text-xs text-slate-400">{config.label}</span>
                        </motion.button>
                    )
                })}
            </div>
        </div>
    )
}
