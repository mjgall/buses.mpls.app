import backend from '../api/backend';
import { FETCH_USER } from './types';
import axios from 'axios';

export const fetchUser = () => async dispatch => {
  const response = await axios.get('api/current_user');
  console.log(response)
  dispatch({
    type: FETCH_USER,
    payload: response.data
  });
};

export const submitSelector = (formInput, auth) => {
  const cleanInput = formInput => {
    if (String(formInput).indexOf('-') > 0) {
      return formInput.replace(/-/g, '');
    } else return formInput;
  };

  if (cleanInput(formInput).length < 6 && cleanInput(formInput).length) {
    //It's a stopid, fetch the buses for that stop and its location
    return async dispatch => {
      const response = await backend.get(
        `api/stopId?stop=${cleanInput(formInput)}`
      );
      dispatch(
        manualDispatch('ADD_STOP', {
          id: cleanInput(formInput),
          location: response.data.location
        })
      );
    };
  } else if (cleanInput(formInput).length > 5) {
    // It's a serial number, fetch the balance of the go-to card
    return async dispatch => {
      backend.put(`/user/${auth.id}`, { serial: cleanInput(formInput) });
      const response = await backend.get(
        `api/card?serial=${cleanInput(formInput)}`
      );
      dispatch(manualDispatch('FETCH_BALANCE', response.data.amount));
    };
  }
};

export const fetchBuses = id => {
  return async dispatch => {
    const response = await fetch(
      `https://svc.metrotransit.org/NexTrip/${id}?format=json`
    );
    const data = await response.json();

    dispatch(manualDispatch('UPDATE_BUSES', { data: data, id: id }));
  };
};

export const manualDispatch = (type, payload) => {
  return {
    type: type,
    payload: payload
  };
};
