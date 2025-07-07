
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BLEService from '../../lib/BLEService';

export default function BallsScreen() {
  const [devices, setDevices] = useState([]);
  const [connectedId, setConnectedId] = useState(null);

  useEffect(() => {
    const setup = async () => {
      await BLEService.init();
      const found = await BLEService.scanForDevices();
      setDevices(found);
    };
    setup();
  }, []);

  const handleConnect = async (device) => {
    try {
      await BLEService.connectToDevice(device.id);
      setConnectedId(device.id);
      Alert.alert('Connected', `Connected to ${device.name || device.id}`);
    } catch (err) {
      Alert.alert('Error', err.message || 'Connection failed');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.deviceItem,
        item.id === connectedId && styles.connectedItem,
      ]}
      onPress={() => handleConnect(item)}
    >
      <Text style={styles.deviceName}>{item.name || 'Unnamed Device'}</Text>
      <Text style={styles.deviceId}>{item.id}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Nearby Bluetooth Devices</Text>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  list: {
    gap: 12,
  },
  deviceItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  connectedItem: {
    borderColor: '#16a34a',
    borderWidth: 2,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
  },
  deviceId: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
});
