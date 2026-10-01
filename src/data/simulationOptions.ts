import type { Choice } from '../types/simulation';

export const IRAQ_CHOICES: Choice[] = [
  {
    id: 'a',
    label: 'Deniz Karantinası: Kübayı kuşatıp Sovyet gemilerini engelleyerek gizli pazarlık yürütmek',
  },
  {
    id: 'b',
    label: 'Wait for Signal from Moscow',
  },
  {
    id: 'c',
    label: 'Zaman Baskısına Uyum: Siyasi ve medya baskısı nedeniyle risklere rağmen belirlenen takvimde fırlatmayı başlat.',
  },
  {
    id: 'd',
    label: 'Signal US Ships with Sonar',
  },
  {
    id: 'e',
    label: 'Signal US Ships with Sonar',
  },
];

export const DEFAULT_CHOICES: Choice[] = IRAQ_CHOICES;

export const SCENARIO_CHOICES: Record<string, Choice[]> = {
  'iraq-1': IRAQ_CHOICES,
  'iraq-2': IRAQ_CHOICES,
  'iraq-3': IRAQ_CHOICES,
};
