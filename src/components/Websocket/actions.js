export const types = {
  ADD_ADAPTER: 'Bluetooth/addAdapter',
  REMOVE_ADAPTER: 'Bluetooth/removeAdapter',
  ADAPTER_FIELDS_CHANGE: 'Bluetooth/adapterFieldChanged',
  REMOVE_ALL_ADAPTERS: 'Bluetooth/removeAllAdapters',
  ADD_DEVICE: 'Bluetooth/addDevice',
  REMOVE_DEVICE: 'Bluetooth/removeDevice',
  DEVICE_FIELDS_CHANGE: 'Bluetooth/deviceFieldChanged',
  REMOVE_ALL_DEVICES: 'Bluetooth/removeAllDevices',
};

export default {
  addAdapter: function(name, values) {
    return {
      type: types.ADD_ADAPTER,
      name,
      values
    };
  },
  removeAdapter: function(name) {
    return {
      type: types.REMOVE_ADAPTER,
      name
    };
  },
  changeAdapterFields: function(name, values) {
    return {
      type: types.ADAPTER_FIELDS_CHANGE,
      name,
      values
    };
  },
  removeAllAdapters: function() {
    return { type: types.REMOVE_ALL_ADAPTERS }
  },
  addDevice: function(name, values) {
    return {
      type: types.ADD_DEVICE,
      name,
      values
    };
  },
  removeDevice: function(name) {
    return {
      type: types.REMOVE_DEVICE,
      name
    };
  },
  changeDeviceFields: function(name, values) {
    return {
      type: types.DEVICE_FIELDS_CHANGE,
      name,
      values
    };
  },
  removeAllDevices: function() {
    return { type: types.REMOVE_ALL_DEVICES }
  },
};
