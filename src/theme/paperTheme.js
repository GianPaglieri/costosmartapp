import { MD3LightTheme as DefaultTheme, configureFonts } from 'react-native-paper';
import { colors, radii, fonts } from './tokens';

const fontConfig = {
  displayLarge: {
    ...DefaultTheme.fonts.displayLarge,
    fontFamily: fonts.display,
  },
  displayMedium: {
    ...DefaultTheme.fonts.displayMedium,
    fontFamily: fonts.display,
  },
  displaySmall: {
    ...DefaultTheme.fonts.displaySmall,
    fontFamily: fonts.display,
  },
  headlineLarge: {
    ...DefaultTheme.fonts.headlineLarge,
    fontFamily: fonts.semiBold,
  },
  headlineMedium: {
    ...DefaultTheme.fonts.headlineMedium,
    fontFamily: fonts.semiBold,
  },
  headlineSmall: {
    ...DefaultTheme.fonts.headlineSmall,
    fontFamily: fonts.semiBold,
  },
  titleLarge: {
    ...DefaultTheme.fonts.titleLarge,
    fontFamily: fonts.semiBold,
  },
  titleMedium: {
    ...DefaultTheme.fonts.titleMedium,
    fontFamily: fonts.medium,
  },
  titleSmall: {
    ...DefaultTheme.fonts.titleSmall,
    fontFamily: fonts.medium,
  },
  bodyLarge: {
    ...DefaultTheme.fonts.bodyLarge,
    fontFamily: fonts.regular,
  },
  bodyMedium: {
    ...DefaultTheme.fonts.bodyMedium,
    fontFamily: fonts.regular,
  },
  bodySmall: {
    ...DefaultTheme.fonts.bodySmall,
    fontFamily: fonts.regular,
  },
  labelLarge: {
    ...DefaultTheme.fonts.labelLarge,
    fontFamily: fonts.medium,
  },
  labelMedium: {
    ...DefaultTheme.fonts.labelMedium,
    fontFamily: fonts.medium,
  },
  labelSmall: {
    ...DefaultTheme.fonts.labelSmall,
    fontFamily: fonts.medium,
  },
};

const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    surface: colors.surface,
    surfaceVariant: colors.surfaceMuted,
    background: colors.background,
    error: colors.danger,
    onSurface: colors.text,
    onSurfaceVariant: colors.textSubtle,
    outline: colors.border,
    outlineVariant: colors.divider,
  },
  roundness: radii.md,
  fonts: configureFonts({ config: fontConfig }),
};

export default paperTheme;

