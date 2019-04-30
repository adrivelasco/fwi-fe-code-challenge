import * as actionTypes from '../constants';

function mergePlayers(state, { players }) {
  const newState = { ...state };
  players.forEach(player => {
    newState[player.id] = player;
  });
  return newState;
}

export default function players(state = {}, action) {
  switch (action.type) {
    case actionTypes.FETCH_PLAYERS_SUCCESS:
    case actionTypes.FETCH_LAZY_PLAYERS_SUCCESS:
      return mergePlayers(state, action.payload.data);
    default:
      return state;
  }
}
