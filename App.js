import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './src/theme/paperTheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigation from './components/Navigation';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider theme={theme}>
          <Navigation />
        </PaperProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
