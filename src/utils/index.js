import DeviceInfo from 'react-native-device-info';

export const getDeviceStats = () => {
  console.log('Getting Device Stats');
  return {
    brand: DeviceInfo.getBrand(),
    deviceId: DeviceInfo.getDeviceId(),
    model: DeviceInfo.getModel(),
    hasNotch: DeviceInfo.hasGmsSync(),
    powerState: DeviceInfo.getPowerStateSync(),
    cameraPresent: DeviceInfo.isCameraPresentSync(),
    carrier: DeviceInfo.getCarrierSync(),
    deviceName: DeviceInfo.getDeviceNameSync(),
    totalStorage: DeviceInfo.getTotalDiskCapacitySync(),
    deviceStorage: DeviceInfo.getFreeDiskStorageSync(),
    totalMemory: DeviceInfo.getTotalMemorySync(),
    maxMemory: DeviceInfo.getMaxMemorySync(),
    // ipAddress: DeviceInfo.getIpAddressSync(),
    // macAddress: DeviceInfo.getMacAddressSync(),
    // phoneNumber: DeviceInfo.getPhoneNumberSync(),
    tablet: DeviceInfo.isTablet(),
  }
};
