import { types } from './actions.js';
import { combineReducers } from 'redux'

function createReducers(addAction, removeAction, changeAction, removeAllAction) {
  return function (state = {}, action) {
    if (action.type === addAction) {
      return {
        ...state,
        [action.name]: {
          path: action.name,
          ...action.values
        }
      };
    } else if (action.type === removeAction) {
      const newState = { ...state };
      delete newState[action.name];
      return newState;
    } else if (action.type === changeAction) {
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          ...action.values
        }
      };
    } else if (action.type === removeAllAction) {
      return {};
    }

    return state;
  }
}

export default combineReducers({
  devices: createReducers(types.ADD_DEVICE, types.REMOVE_DEVICE, types.DEVICE_FIELDS_CHANGE, types.REMOVE_ALL_DEVICES), 
  adapters: createReducers(types.ADD_ADAPTER, types.REMOVE_ADAPTER, types.ADAPTER_FIELDS_CHANGE, types.REMOVE_ALL_ADAPTERS)
})