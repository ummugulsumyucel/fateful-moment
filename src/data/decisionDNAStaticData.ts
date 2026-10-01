import {
  Eye,
  Zap,
  TriangleAlert,
  Settings,
  Heart,
  Scale,
} from 'lucide-react-native';

export type DNAScore = {
  label: string;
  value: number;
  icon: React.ComponentType<{
    size?: number;
    color?: string;
    strokeWidth?: number;
  }>;
};

export type DNAPattern = {
  id: string;
  text: string;
};

export type DNABlindSpot = {
  dimension: string;
  question: string;
  description: string;
};

export type DNAArchetype = {
  title: string;
  description: string;
};

export type DecisionDNAStaticData = {
  archetype: DNAArchetype;
  scores: DNAScore[];
  patterns: DNAPattern[];
  blindSpot: DNABlindSpot;
};

export const DECISION_DNA_STATIC_DATA: DecisionDNAStaticData = {
  archetype: {
    title: 'BRAVE VISIONARY',
    description:
      'You see the big picture and walk towards it - no matter the cost. Ethics sometimes take a back seat, but few surpass you in the courage to take action.',
  },

  scores: [
    {
      label: 'VISION',
      value: 88,
      icon: Eye,
    },
    {
      label: 'COURAGE',
      value: 82,
      icon: Zap,
    },
    {
      label: 'RISK',
      value: 79,
      icon: TriangleAlert,
    },
    {
      label: 'CONTROL',
      value: 55,
      icon: Settings,
    },
    {
      label: 'EMPATHY',
      value: 38,
      icon: Heart,
    },
    {
      label: 'ETHICS',
      value: 31,
      icon: Scale,
    },
  ],

  patterns: [
    {
      id: '01',
      text:
        'You are not afraid to take action under pressure. While others hesitate, you have already taken a step. This positions you as a natural leader in crisis moments.',
    },
    {
      id: '02',
      text:
        'You prioritize long-term impact over short-term costs. You see the big picture — but this sometimes makes it difficult for you to see the people in front of you.',
    },
    {
      id: '03',
      text:
        'When ethics conflict with interests, your tendency is clear: you choose the interest. This pattern repeated in 5 out of 8 scenarios. It works in the short term — but creates erosion of trust in the long term.',
    },
  ],

  blindSpot: {
    dimension: 'ETHICS',
    question: 'How much will you pay to win?',
    description:
      'Your vision and courage are strong — but your ethics score is your lowest dimension. While reaching big goals, you often overlook how those around you feel and what they sacrifice. Your leadership capacity is high, but the mark you leave is not always positive.',
  },
};