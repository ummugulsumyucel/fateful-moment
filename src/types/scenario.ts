import type { ImageSourcePropType } from 'react-native';

export type Scenario = {
  id: string;
  title: string;
  time: string;
  description: string;
  image: ImageSourcePropType;
  isActive: boolean;
};
