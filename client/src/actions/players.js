import * as actionTypes from '../constants';
import request from '../request';

/**
 * Fetch all players
 */
export function fetchAllPlayers({ from } = {}) {
  return async dispatch => {
    try {
      const data = await request(
        '/players',
        from ? { queryParams: { from, size: 25 } } : undefined
      );

      if (from != null && from > 0) {
        dispatch({
          type: actionTypes.FETCH_LAZY_PLAYERS_SUCCESS,
          payload: { data },
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_PLAYERS_SUCCESS,
          payload: { data },
        });
      }

      return data;
    } catch (err) {
      return err;
    }
  };
}

/**
 * Create a new player
 * @param {Object} formData
 * @param {string} formData.name
 * @param {string} formData.country
 * @param {number} formData.winnings
 * @param {number} [formData.imageUrl]
 */
export function createPlayer(formData) {
  return async dispatch => {
    dispatch({
      type: actionTypes.CREATE_PLAYER_FETCHING,
    });

    try {
      const playerUpdated = await request(`/players`, {
        method: 'POST',
        body: formData,
      });

      dispatch({
        type: actionTypes.CREATE_PLAYER_FETCHED,
        payload: {
          data: playerUpdated,
        },
      });

      return playerUpdated;
    } catch (err) {
      dispatch({
        type: actionTypes.CREATE_PLAYER_FETCH_FAILED,
        payload: err,
      });

      return err;
    }
  };
}

/**
 * Update player entity
 * @param {Object} formData
 * @param {string} [formData.name]
 * @param {string} [formData.country]
 * @param {number} [formData.winnings]
 * @param {number} [formData.imageUrl]
 */
export function editPlayer(playerId, formData = {}) {
  return async dispatch => {
    dispatch({
      type: actionTypes.EDIT_PLAYER_FETCHING,
    });

    try {
      const playerUpdated = await request(`/players/${playerId}`, {
        method: 'PATCH',
        body: formData,
      });

      dispatch({
        type: actionTypes.EDIT_PLAYER_FETCHED,
        payload: playerUpdated,
      });

      return playerUpdated;
    } catch (err) {
      dispatch({
        type: actionTypes.EDIT_PLAYER_FETCH_FAILED,
        payload: err,
      });

      return err;
    }
  };
}

/**
 * Delete a player
 * @param {string} playerId
 */
export function deletePlayer(playerId) {
  return async dispatch => {
    dispatch({
      type: actionTypes.DELETE_PLAYER_FETCHING,
    });

    try {
      const playerUpdated = await request(`/players/${playerId}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
        },
      });

      dispatch({
        type: actionTypes.DELETE_PLAYER_FETCHED,
        payload: playerUpdated,
      });

      return playerUpdated;
    } catch (err) {
      dispatch({
        type: actionTypes.DELETE_PLAYER_FETCH_FAILED,
        payload: err,
      });

      return err;
    }
  };
}
