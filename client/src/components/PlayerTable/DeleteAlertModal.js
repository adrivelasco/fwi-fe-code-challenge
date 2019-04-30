import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';
import Button from '../Button';

const DeleteAlertModal = ({ open, player, onClose, onDelete }) => {
  function handleDelete() {
    return onDelete ? onDelete(player.id) : null;
  }
  return (
    <Modal open={open}>
      <p>
        Are you sure to remove <strong>{player && player.name}</strong> player?
      </p>
      <Modal.Actions>
        <Button variant="outlined" onClick={handleDelete}>
          Delete
        </Button>
        <Button onClick={onClose} variant="outlined" color="error">
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

DeleteAlertModal.propTypes = {
  open: PropTypes.bool,
  player: PropTypes.object,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
};

export default DeleteAlertModal;
