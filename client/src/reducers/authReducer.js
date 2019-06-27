import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case 'DELETE_USER_STOP':
      return {
        ...state,
        stops: [
          ...state.stops.slice(0, action.payload),
          ...state.stops.slice(action.payload + 1)
        ]
      };
    case 'ADD_USER_STOP':
      return {
        ...state,
        stops: [
          ...state.stops,
          { id: action.payload.id, location: action.payload.location }
        ]
      };
    default:
      return state;
  }
}
