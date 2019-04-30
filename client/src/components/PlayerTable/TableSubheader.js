import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Button from '../Button';

const TableSubHeader = ({ player, onClose, onEditPlayer, onDeletePlayer }) => {
  return (
    <div
      className={cs({
        subheader: true,
        visible: !!player,
      })}
    >
      {!!player && (
        <div className="subheader__container">
          <div className="subheader__label">
            <span>
              1 selected: <strong>{player.name}</strong>
            </span>
          </div>
          <div className="subheader__actions">
            <span>Actions:</span>
            <div className="subheader__action">
              <Button variant="flat" color="primary" onClick={onEditPlayer}>
                Edit
              </Button>
            </div>
            <div className="subheader__action">
              <Button variant="flat" color="error" onClick={onDeletePlayer}>
                Delete
              </Button>
            </div>
            <div className="subheader__action">
              <Button variant="flat" onClick={onClose}>
                X
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

TableSubHeader.propTypes = {
  player: PropTypes.object,
  onClose: PropTypes.func,
  onEditPlayer: PropTypes.func,
  onDeletePlayer: PropTypes.func,
};

export default TableSubHeader;
