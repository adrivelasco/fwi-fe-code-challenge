import React from 'react';
import PropTypes from 'prop-types';
import Flags from 'react-world-flags';
import cs from 'classnames';

import Avatar from '../Avatar';
import { COUNTRIES } from '../../constants';
import moment from 'moment';

const TableBody = ({ players, onSelectPlayer, selectedPlayer }) => {
  const handlePlayerClick = playerId => () => onSelectPlayer(playerId);

  return (
    <table
      id="player-table-body"
      role="presentation"
      className="table table--body"
    >
      <tbody>
        {players.map(({ id, name, country, winnings, imageUrl, createdAt }) => (
          <tr
            onClick={handlePlayerClick(id)}
            key={id}
            role="row"
            className={cs({
              table__row: true,
              table__selected:
                selectedPlayer != null && selectedPlayer.id === id,
            })}
          >
            <td role="gridcell" className="table__avatar">
              <Avatar src={imageUrl} />
            </td>
            <td role="gridcell" className="table__player">
              {name}
            </td>
            <td role="gridcell" className="table__created-at">
              {moment(createdAt).format('MM/DD/YYYY hh:mm A')}
            </td>
            <td role="gridcell" className="table__native">
              <div className="country">
                <Avatar>
                  <Flags code={country} alt="" />
                </Avatar>
                {country}
              </div>
            </td>
            <td role="gridcell" className="table__winnings">
              {winnings.toLocaleString(undefined, {
                style: 'currency',
                currency: 'USD',
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TableBody.propTypes = {
  selectedPlayer: PropTypes.object,
  onSelectPlayer: PropTypes.func,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      country: PropTypes.oneOf(Object.keys(COUNTRIES)),
      winnings: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TableBody;
