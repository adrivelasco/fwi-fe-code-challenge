import React from 'react';
import PropTypes from 'prop-types';
import Flags from 'react-world-flags';

import Modal from '../Modal';
import TextField from '../TextField';
import Button from '../Button';
import Avatar from '../Avatar';

class EditFormModal extends React.Component {
  static propTypes = {
    countries: PropTypes.object,
    open: PropTypes.bool,
    player: PropTypes.object,
    onClose: PropTypes.func,
    onSave: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      country: '',
    };
  }

  componentDidUpdate(prevProps) {
    const { player } = this.props;
    if (!prevProps.player && player) {
      this.setState({
        name: player.name,
        country: player.country,
      });
    }
  }

  /**
   * Handle onChange input
   * @param {string} key - Input key
   * @return {Function}
   */
  handleInputChange = key => event => {
    this.setState({
      [key]: event.target.value,
    });
  };

  handleSave = () => {
    const { onSave, player } = this.props;
    onSave(player.id, this.state);
  };

  render() {
    const { countries, open, onClose, player } = this.props;

    return (
      <Modal open={open}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h3>Edit player</h3>
          <div>
            <Avatar
              src={player && player.imageUrl}
              style={{ marginRight: '0.5rem' }}
            />
            <Avatar>
              <Flags code={this.state.country} alt="" />
            </Avatar>
          </div>
        </div>
        <TextField
          name="name"
          placeholder="Name"
          value={this.state.name}
          onChange={this.handleInputChange('name')}
        />
        <TextField
          onChange={this.handleInputChange('country')}
          value={this.state.country}
          selector={true}
          country="country"
          placeholder="Country"
          options={
            countries &&
            Object.keys(countries).map(c => {
              return {
                name: countries[c],
                value: c,
              };
            })
          }
        />
        <Modal.Actions>
          <Button variant="outlined" onClick={this.handleSave}>
            Save
          </Button>
          <Button onClick={onClose} variant="outlined" color="error">
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default EditFormModal;
