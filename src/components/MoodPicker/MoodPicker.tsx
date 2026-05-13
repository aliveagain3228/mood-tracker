import {AnimatePresence, motion} from "framer-motion";
import { useState } from "react";
import type { MoodEntry, MoodLevel } from '../../types'
import { MOOD_CONFIG } from "../../types";

interface MoodPickerProps {
    todayEntry: MoodEntry | null
    onSelect: (level: MoodLevel, note?: string) => void
}

export default function MoodPicker({ todayEntry, onSelect }: MoodPickerProps) {

    const [note, setNote] = useState(todayEntry?.note ?? '')
    const [showNote, setShowNote] = useState(false)

    const hadleSelect = (level: MoodLevel) => {
        onSelect(level, note || undefined)
    }

    const handleNoteSubmit = () => {
        if (!todayEntry) return
        onSelect(todayEntry.level, note || undefined)
        setShowNote(false)
    }

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
                            animate={isSelected ? { y: -4 } : { y: 0 }}
                            transition={{ type: 'spring', stiffness: 300 }}
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

            {todayEntry && (
                <div className="flex justify-center">
                    <button onClick={() => setShowNote(prev => !prev)}
                            className="text-slate-400 hover:text-white text-sm flex items-center gap-1 transition-colors"
                    >
                        {showNote ? "▲ Hide note" : `✏️ ${todayEntry.note ? 'Edit note' : 'Add note'}`}
                    </button>
                </div>
            )}

            <AnimatePresence>
                {showNote && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 overflow-hidden"
                    >
                        <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="How was your day? (optional)"
                        rows={3}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-slate-500 resize-none"
                        />
                        <button
                            onClick={handleNoteSubmit}
                            className="mt-2 w-full bg-slate-700 hover:bg-slate-600 rounded-xl py-2 text-sm font-medium transition-colors"
                        >
                            Save note
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
