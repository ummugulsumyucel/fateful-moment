import AppleIcon from './AppleIcon';
import BackIcon from './BackIcon';
import CheckCircleIcon from './CheckCircleIcon';
import GoogleIcon from './GoogleIcon';
import MailIcon from './MailIcon';
import type { IconProps } from './types';

export { AppleIcon, BackIcon, CheckCircleIcon, GoogleIcon, MailIcon };
export type { IconProps };

export const icons = {
  apple: AppleIcon,
  google: GoogleIcon,
  mail: MailIcon,
} as const;

export type IconName = keyof typeof icons;
