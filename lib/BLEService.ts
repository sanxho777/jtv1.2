
import BleManager from 'react-native-ble-manager';
import { PermissionsAndroid, Platform } from 'react-native';

class BLEService {
  static async init() {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
    }

    await BleManager.start({ showAlert: false });
  }

  static async scanForDevices(timeout = 5000) {
    await BleManager.scan([], 5, true);
    return new Promise((resolve) => {
      setTimeout(async () => {
        const devices = await BleManager.getDiscoveredPeripherals();
        resolve(devices);
      }, timeout);
    });
  }

  static async connectToDevice(id: string) {
    await BleManager.connect(id);
    await BleManager.retrieveServices(id);
  }

  static async disconnectFromDevice(id: string) {
    await BleManager.disconnect(id);
  }
}

export default BLEService;
