'use client';
import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/constants/storageKeys';

const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

interface TimerState {
  mode: 'focus' | 'break';
  timeLeft: number;
  isRunning: boolean;
  todayMinutes: number;
  toggleTimer: () => void;
  resetTimer: () => void;
  switchToBreak: () => void;
}

const TimerContext = createContext<TimerState | null>(null);

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [timerDate, setTimerDate] = useLocalStorage<string>(STORAGE_KEYS.TIMER_DATE, '');
  const [todayMinutes, setTodayMinutes] = useLocalStorage<number>(STORAGE_KEYS.TIMER_TODAY, 0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Reset today's minutes if the date has changed
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (timerDate !== today) {
      setTimerDate(today);
      setTodayMinutes(0);
    }
  }, [timerDate, setTimerDate, setTodayMinutes]);

  // Timer interval
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            if (mode === 'focus') {
              setTodayMinutes(m => m + 25);
              setMode('break');
              return BREAK_TIME;
            } else {
              setMode('focus');
              return FOCUS_TIME;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, mode]);

  const toggleTimer = useCallback(() => setIsRunning(r => !r), []);
  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(mode === 'focus' ? FOCUS_TIME : BREAK_TIME);
  }, [mode]);
  const switchToBreak = useCallback(() => {
    setIsRunning(false);
    setMode('break');
    setTimeLeft(BREAK_TIME);
  }, []);

  return (
    <TimerContext.Provider value={{ mode, timeLeft, isRunning, todayMinutes, toggleTimer, resetTimer, switchToBreak }}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const ctx = useContext(TimerContext);
  if (!ctx) throw new Error('useTimer must be used within TimerProvider');
  return ctx;
}
