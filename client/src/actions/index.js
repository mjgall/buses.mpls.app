import { FETCH_USER } from './types';
import axios from 'axios';

//FETCH USER - CALLED IN APP COMPONENT TO GET CURRENT USER ACROSS APP
export const fetchUser = () => async dispatch => {
  const response = await axios.get('api/current_user');
  dispatch({
    type: FETCH_USER,
    payload: response.data
  });
};

//SUBMITSELECTOR - SHOULD BE SPLIT INTO TWO ACTIONS, fetchStop which dispatches FETCH_STOP AND fetchBalance which dispatches FETCH_BALANCE
//CALLED IN HOME COMPONENT FROM THE REDUX-FORM FOUND THERE (SELECTOR)
export const submitSelector = (formInput, auth) => async dispatch => {
  const cleanInput = formInput => {
    if (String(formInput).indexOf('-') > 0) {
      return formInput.replace(/-/g, '');
    } else return formInput;
  };

  if (cleanInput(formInput).length< 6 && cleanInput(formInput).length) {
    //It's a stopid, fetch the buses for that stop and its location

    const response = await axios.get( `api/stopId?stop=${cleanInput(formInput)}`
    );
    if (!auth) {
      dispatch({
        type: 'ADD_DEFAULT_STOP',
        payload: { location: response.data.location, id: cleanInput(formInput) }
      });
    } else if (auth) {
      dispatch({
        type: 'ADD_USER_STOP',
        payload: { location: response.data.location, id: cleanInput(formInput) }
      });
    }
  } else if (cleanInput(formInput).length > 5) {
    // It's a serial number, fetch the balance of the go-to card
    const response = await axios.get( `api/card?serial=${cleanInput(formInput)}`
    );
    dispatch({ type: 'FETCH_BALANCE', payload: response.data.amount });
  }
};

export const fetchBuses = id => async dispatch => {
  const response = await fetch( `https://svc.metrotransit.org/NexTrip/${id}?format=json`
  );
  const data = await response.json();

  dispatch({ type: 'UPDATE_BUSES', payload: { data: data, id: id } });
};

export const removeCard = id => {
  console.log(id);
  return { type: 'DELETE_DEFAULT_STOP', payload: id };
};

export const removeUserCard = id => {
  console.log(id);
  return { type: 'DELETE_USER_STOP', payload: id };
};

export const saveStop = id => {
  console.log(id);
  return {
    type: 'SAVE_STOP',
    payload: id
  }
}
