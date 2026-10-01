import type { ImageSourcePropType } from 'react-native';

import type { Scenario } from '../types/scenario';

const cardImage: ImageSourcePropType = require('../assets/images/arkaplan.png');

const IRAQ: Omit<Scenario, 'id'> = {
  title: 'Iraq War',
  time: '1:37 min',
  description:
    '2003. The chemical weapon allegations are on your desk. Your decision will determine the fate of millions.',
  image: cardImage,
  isActive: true,
};

const CUBAN: Omit<Scenario, 'id'> = {
  title: 'Cuban Missile Crisis (1962)',
  time: '1:25 min',
  description:
    'A world on the brink of nuclear annihilation. You are in Kennedy’s seat.',
  image: cardImage,
  isActive: false,
};

export const SCENARIOS: Scenario[] = [
  { ...IRAQ, id: 'iraq-1' },
  { ...CUBAN, id: 'cuban-1' },
  { ...IRAQ, id: 'iraq-2' },
  { ...CUBAN, id: 'cuban-2' },
  { ...IRAQ, id: 'iraq-3' },
  { ...CUBAN, id: 'cuban-3' },
];