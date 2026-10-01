import {
  Image,
  StyleSheet,
  type ImageSourcePropType,
  type StyleProp,
  type ImageStyle,
} from 'react-native';
import { sizes } from '../../theme/theme';

const logoSource: ImageSourcePropType = require('../../assets/images/logo.png');

type AppLogoProps = {
  width?: number;
  height?: number;
  style?: StyleProp<ImageStyle>;
};

export default function AppLogo({
  width = sizes.logo,
  height = sizes.logo,
  style,
}: AppLogoProps) {
  return (
    <Image
      source={logoSource}
      style={[
        styles.logo,
        {
          width,
          height,
          borderRadius: Math.min(width, height) / 2,
        },
        style,
      ]}
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    overflow: 'hidden',
  },
});
