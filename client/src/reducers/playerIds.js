import * as actionTypes from '../constants';

export default function playerIds(state = [], action) {
  switch (action.type) {
    case actionTypes.FETCH_PLAYERS_SUCCESS:
      return action.payload.data.players.map(player => player.id);
    case actionTypes.FETCH_LAZY_PLAYERS_SUCCESS:
      const players = action.payload.data.players.map(player => player.id);
      return [...state, ...players];
    default:
      return state;
  }
}
