import { useSimulation } from '../../hooks/useSimulation';

import SimulationIntro from '../../components/simulation/SimulationIntro';
import SimulationVideo from '../../components/simulation/SimulationVideo';
import SimulationChoices from '../../components/simulation/SimulationChoices';

/*
 * ─── Video sources ────────────────────────────────────────────────────────────
 */

const VIDEO_SOURCE_1 = require('../../assets/videos/simulation_1.mp4');
const VIDEO_SOURCE_2 = require('../../assets/videos/simulation_2.mp4');
const VIDEO_SOURCE_3 = require('../../assets/videos/simulation_3.mp4');

/*
 * ─── Props ────────────────────────────────────────────────────────────────────
 */

type Props = {
  title: string;
  description: string;
  scenarioId?: string;

  onStart?: () => void;
  onBack?: () => void;

  onPlayPause?: (playing: boolean) => void;
  onSkipBack?: () => void;
  onSkipForward?: () => void;
  onComplete?: () => void;
};

/*
 * ─── Component ────────────────────────────────────────────────────────────────
 */

export default function SimulationScreen({
  title,
  description,
  scenarioId,
  onStart,
  onBack,
  onPlayPause,
  onSkipBack,
  onSkipForward,
  onComplete,
}: Props) {
  const {
    stage,
    choices,
    firstSelectedOption,
    secondSelectedOption,

    handleStart,
    handleVideoBack,
    handleChoicesBack,

    handleVideo1Finished,
    handleFirstChoiceSelect,

    handleVideo2Finished,
    handleSecondChoiceSelect,

    handleVideo3Finished,
  } = useSimulation({
    scenarioId,
    onStart,
    onBack,
    onComplete,
  });

  /*
   * ── VIDEO 1 ───────────────────────────────────────────────────────────────
   */

  if (stage === 'video1') {
    return (
      <SimulationVideo
        source={VIDEO_SOURCE_1}
        onBack={handleVideoBack}
        onFinished={handleVideo1Finished}
      />
    );
  }

  /*
   * ── CHOICES 1 ─────────────────────────────────────────────────────────────
   */

  if (stage === 'choices1') {
    return (
      <SimulationChoices
        choices={choices}
        stage="choices1"
        firstSelectedOption={firstSelectedOption}
        secondSelectedOption={null}
        onSelect={handleFirstChoiceSelect}
        onBack={handleChoicesBack}
      />
    );
  }

  /*
   * ── VIDEO 2 ───────────────────────────────────────────────────────────────
   */

  if (stage === 'video2') {
    return (
      <SimulationVideo
        source={VIDEO_SOURCE_2}
        onBack={handleVideoBack}
        onFinished={handleVideo2Finished}
      />
    );
  }

  /*
   * ── CHOICES 2 ─────────────────────────────────────────────────────────────
   */

  if (stage === 'choices2') {
    return (
      <SimulationChoices
        choices={choices}
        stage="choices2"
        firstSelectedOption={firstSelectedOption}
        secondSelectedOption={secondSelectedOption}
        onSelect={handleSecondChoiceSelect}
        onBack={handleChoicesBack}
      />
    );
  }

  /*
   * ── VIDEO 3 ───────────────────────────────────────────────────────────────
   */

  if (stage === 'video3') {
    return (
      <SimulationVideo
        source={VIDEO_SOURCE_3}
        onBack={handleVideoBack}
        onFinished={handleVideo3Finished}
      />
    );
  }

  if (stage === 'decisionDNA' || stage === 'complete') {
    return null;
  }

  /*
   * ── INTRO ─────────────────────────────────────────────────────────────────
   */

  return (
    <SimulationIntro
      title={title}
      description={description}
      onStart={handleStart}
      onPlayPause={onPlayPause}
      onSkipBack={onSkipBack}
      onSkipForward={onSkipForward}
    />
  );
}
