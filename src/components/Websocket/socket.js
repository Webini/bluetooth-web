import io from 'socket.io-client';

export let socket = null;
export let isConnected = false;
let actions = null;

function bindSocket(socket) {
  socket.on('device-add', actions.addDevice);
  socket.on('device-removed', actions.removeDevice);
  socket.on('device-changed', actions.changeDeviceFields);
  socket.on('adapter-add', actions.addAdapter);
  socket.on('adapter-removed', actions.removeAdapter);
  socket.on('adapter-changed', actions.changeAdapterFields);

  socket.on('connect', () => { 
    isConnected = true;
  });
  socket.on('disconnect', () => {
    isConnected = false;
    if (actions) {
      actions.removeAllDevices();
      actions.removeAllAdapters();
    }
  });
}

export async function initialize(locActions) {
  if (socket === null) {
    actions = locActions;
    socket = io(process.env.WS_URL);
    bindSocket(socket);
  }
  return socket;
}

export function setPairable(adaoterPath) {
  socket.emit('setPairable', adaoterPath);
}

export function connectDevice(devicePath) {
  console.log('CONNECT TO => ', devicePath);
  socket.emit('connectDevice', devicePath);
}

export function disconnectDevice(devicePath) {
  console.log('DISCONNECT FROM => ', devicePath);
  socket.emit('disconnectDevice', devicePath);
}

export function removeDevice(devicePath) {
  socket.emit('removeDevice', devicePath);
}

export default socket;