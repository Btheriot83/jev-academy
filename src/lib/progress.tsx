"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { STORAGE_KEY, PATH_STEPS, getNextIncomplete } from "./curriculum";

type ProgressCtx = {
  completed: Record<string, boolean>;
  toggle: (id: string) => void;
  setDone: (id: string, value: boolean) => void;
  next: ReturnType<typeof getNextIncomplete>;
  pathDoneCount: number;
  ready: boolean;
};

const Ctx = createContext<ProgressCtx | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCompleted(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    } catch {
      /* ignore */
    }
  }, [completed, ready]);

  const toggle = useCallback((id: string) => {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const setDone = useCallback((id: string, value: boolean) => {
    setCompleted((prev) => ({ ...prev, [id]: value }));
  }, []);

  const next = useMemo(() => getNextIncomplete(completed), [completed]);

  const pathDoneCount = useMemo(() => {
    return PATH_STEPS.filter((s) => s.lessonIds.every((id) => completed[id])).length;
  }, [completed]);

  const value = useMemo(
    () => ({ completed, toggle, setDone, next, pathDoneCount, ready }),
    [completed, toggle, setDone, next, pathDoneCount, ready],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useProgress() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useProgress requires ProgressProvider");
  return ctx;
}
