import React, { useState } from 'react';
import { Appbar, useTheme, IconButton, Searchbar } from 'react-native-paper';

const AppHeader = ({
  title = 'Inicio',
  onMenu,
  onPrimaryAction,
  primaryIcon = 'plus',
  showSearch = true,
  onSearchChange,
}) => {
  const theme = useTheme();
  const [searchVisible, setSearchVisible] = useState(false);
  const [query, setQuery] = useState('');

  const toggleSearch = () => setSearchVisible(!searchVisible);
  const handleChange = (text) => {
    setQuery(text);
    if (onSearchChange) onSearchChange(text);
  };

  return (
    <>
      <Appbar.Header mode="small" elevated style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.Action icon="menu" onPress={onMenu} accessibilityLabel="Abrir menú" />
        <Appbar.Content title={title} />
        {showSearch && (
          <Appbar.Action icon={searchVisible ? 'close' : 'magnify'} onPress={toggleSearch} />
        )}
        {onPrimaryAction ? (
          <IconButton icon={primaryIcon} size={22} onPress={onPrimaryAction} />
        ) : null}
      </Appbar.Header>
      {showSearch && searchVisible && (
        <Searchbar
          placeholder="Buscar…"
          value={query}
          onChangeText={handleChange}
          style={{ marginHorizontal: 12, marginTop: 8, marginBottom: 4 }}
        />
      )}
    </>
  );
};

export default AppHeader;
