import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import './Modal.scss';
import Actions from './Actions';

class Modal extends Component {
  static propTypes = {
    children: PropTypes.node,
    open: PropTypes.bool,
    onClose: PropTypes.func,
  };

  render() {
    const { open, children } = this.props;

    return (
      <div
        className={cs({
          modal: true,
          'modal--open': open,
        })}
      >
        <div className="modal__backdrop" />
        <div className="modal__container">
          <div className="dialog">{children}</div>
        </div>
      </div>
    );
  }
}

Modal.Actions = Actions;

export default Modal;
