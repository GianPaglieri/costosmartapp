import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Navigation from './components/Navigation';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <Navigation />
      </PaperProvider>
    </AuthProvider>
  );
}
