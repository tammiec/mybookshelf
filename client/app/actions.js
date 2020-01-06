import { SET_USER } from './constants';

export function setUser(payload) {
  return { type: SET_USER, payload }
};
