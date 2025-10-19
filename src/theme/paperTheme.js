import { MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { colors } from './tokens';

const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    surface: colors.surface,
    background: colors.background,
    error: colors.danger,
    onSurface: colors.text,
  },
  roundness: 12,
};

export default paperTheme;

