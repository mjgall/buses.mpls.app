const INTIAL_STATE = {
  balance: '',
  stops: [
    {
      id: '167',
      location: 'Bryant Ave S - 32nd St W'
    },
    {
      id: '42216',
      location: 'Hennepin Ave - 33rd St W'
    },
    {
      id: '17980',
      location: 'Nicollet Mall - 7th St S'
    }
  ]
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_BALANCE':
      return {
        ...state,
        balance: `$${action.payload}`
      };
    case 'ADD_STOP':
      return {
        ...state,
        stops: [
          ...state.stops,
          { id: action.payload.id, location: action.payload.location }
        ]
      };
    case 'DELETE_STOP':
      return {
        ...state,
        stops: [
          ...state.stops.slice(0, action.payload),
          ...state.stops.slice(action.payload + 1)
      ],
      }
    case 'UPDATE_BUSES':
      return {
        ...state,
        buses: [
          ...state.buses,
          { id: action.payload.id, data: action.payload.data }
        ]
      };
    default:
      return state;
  }
};
