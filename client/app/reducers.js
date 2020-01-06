import { SET_USER } from './constants';

const initialState = {
  user: {}
};

function rootReducer(state = initialState, action) {

  if (action.type === SET_USER) {
    return {...state, user: action.payload};
  }

  return state;
};

export default rootReducer;
