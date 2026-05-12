export type MoodLevel = 1 | 2 | 3 | 4 | 5

export interface MoodEntry {
    date: string
    level: MoodLevel
    note?: string
}

export const MOOD_CONFIG: Record<MoodLevel, { emoji: string; label: string; color: string}> = {
    1: {emoji: '😞', label: 'Terrible', color: 'bg-red-500'},
    2: {emoji: '😕', label: 'Bad', color: 'bg-orange-500'},
    3: {emoji: '😐', label: 'Okay', color: 'bg-yellow-500'},
    4: {emoji: '🙂', label: 'Good', color: 'bg-lime-500'},
    5: {emoji: '😄', label: 'Great', color: 'bg-green-500'},

}