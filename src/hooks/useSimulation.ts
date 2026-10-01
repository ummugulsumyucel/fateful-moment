import { useEffect, useRef, useState } from 'react';

import { SCENARIO_CHOICES, DEFAULT_CHOICES } from '../data/simulationOptions';
import type { Choice, SimulationStage } from '../types/simulation';

// ─── Constants ────────────────────────────────────────────────────────────────

const SELECTION_FEEDBACK_DELAY_MS = 500;

// ─── Hook ─────────────────────────────────────────────────────────────────────

export type UseSimulationReturn = {
  stage: SimulationStage;
  choices: Choice[];

  firstSelectedOption: string | null;

  secondSelectedOption: string | null;

  activeSelectedOption: string | null;
  handleStart: () => void;
  handleVideoBack: () => void;
  handleChoicesBack: () => void;
  handleVideo1Finished: () => void;
  handleFirstChoiceSelect: (id: string) => void;
  handleVideo2Finished: () => void;
  handleSecondChoiceSelect: (id: string) => void;
  handleVideo3Finished: () => void;
};

type Options = {
  scenarioId?: string;
  onStart?: () => void;
  onBack?: () => void;
  onComplete?: () => void;
};

export function useSimulation({
  scenarioId,
  onStart,
  onBack,
  onComplete,
}: Options = {}): UseSimulationReturn {
  const [stage, setStage] = useState<SimulationStage>('intro');
  const [firstSelectedOption, setFirstSelectedOption] = useState<string | null>(null);
  const [secondSelectedOption, setSecondSelectedOption] = useState<string | null>(null);


  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    return () => {
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
    };
  }, []);

  const choices =
    (scenarioId ? SCENARIO_CHOICES[scenarioId] : undefined) ?? DEFAULT_CHOICES;

  const activeSelectedOption =
    stage === 'choices2'
      ? (secondSelectedOption ?? firstSelectedOption)
      : firstSelectedOption;

  // ── Stage transition helpers ───────────────────────────────────────────────

  function resetState() {
    if (transitionTimer.current) {
      clearTimeout(transitionTimer.current);
      transitionTimer.current = null;
    }
    setFirstSelectedOption(null);
    setSecondSelectedOption(null);
    setStage('intro');
  }

  function scheduleTransition(nextStage: SimulationStage, delayMs: number) {
    if (transitionTimer.current) return;
    transitionTimer.current = setTimeout(() => {
      transitionTimer.current = null;
      setStage(nextStage);
    }, delayMs);
  }

  // ── Handlers ──────────────────────────────────────────────────────────────

  function handleStart() {
    setStage('video1');
    onStart?.();
  }
  function handleBack() {
    resetState();
    onBack?.();
  }

  function handleVideo1Finished() {
    setStage('choices1');
  }

  function handleFirstChoiceSelect(id: string) {
    setFirstSelectedOption(id);
    scheduleTransition('video2', SELECTION_FEEDBACK_DELAY_MS);
  }

  function handleVideo2Finished() {
    setStage('choices2');
  }

  function handleSecondChoiceSelect(id: string) {
    setSecondSelectedOption(id);
    scheduleTransition('video3', SELECTION_FEEDBACK_DELAY_MS);
  }

  function handleVideo3Finished() {
    setStage('decisionDNA');
    onComplete?.();
  }

  return {
    stage,
    choices,
    firstSelectedOption,
    secondSelectedOption,
    activeSelectedOption,
    handleStart,
    handleVideoBack: handleBack,
    handleChoicesBack: handleBack,
    handleVideo1Finished,
    handleFirstChoiceSelect,
    handleVideo2Finished,
    handleSecondChoiceSelect,
    handleVideo3Finished,
  };
}
