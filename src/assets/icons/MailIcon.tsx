import { Mail } from 'lucide-react-native';
import type { IconProps } from './types';

export default function MailIcon({ size = 22, color = '#FFFFFF' }: IconProps) {
  return <Mail size={size} color={color} />;
}
