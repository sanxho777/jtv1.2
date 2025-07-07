
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  GAMES: 'deepjtv1_games',
  SETTINGS: 'deepjtv1_settings',
};

export const StorageService = {
  async saveGames(games) {
    await AsyncStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(games));
  },
  async loadGames() {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.GAMES);
    return raw ? JSON.parse(raw) : [];
  },
  async saveSettings(settings) {
    await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },
  async loadSettings() {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
    return raw ? JSON.parse(raw) : {};
  },
};
