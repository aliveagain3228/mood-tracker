import { useState, useEffect } from "react";

export type Theme = 'dark'  | 'light'

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('mood-theme') as Theme | null
        return saved ?? 'dark'
    })

    useEffect(() => {
        localStorage.setItem('mood-theme', theme)

        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme])

    const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

    return { theme, toggleTheme}
}