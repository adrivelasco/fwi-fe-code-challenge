import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';
import TextField from '../TextField';
import Button from '../Button';

class CreatePlayerFormModal extends React.Component {
  static propTypes = {
    countries: PropTypes.object,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onSave: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.initialStateFields = {
      name: '',
      country: '',
      imageUrl: '',
      winnings: '',
    };

    this.state = {
      fields: this.initialStateFields,
      errors: null,
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

  resetFields() {
    this.setState({
      fields: this.initialStateFields,
    });
  }

  /**
   * Handle onChange input
   * @param {string} key - Input key
   * @return {Function}
   */
  handleInputChange = key => event => {
    const { value } = event.target;

    if (value !== '' && key === 'winnings' && !/^\d+$/.test(value)) {
      event.preventDefault();
      return;
    }

    this.setState({
      fields: {
        ...this.state.fields,
        [key]: value,
      },
    });
  };

  handleSave = () => {
    const { onSave } = this.props;
    const { fields } = this.state;

    let error;

    for (const k in this.state.fields) {
      const val = fields[k];

      if (k === 'imageUrl') {
        if (val === '') continue;

        if (val.match(/\.(jpeg|jpg|gif|png)$/) == null) {
          error = 'invalidImageUrl';
          break;
        }
      }

      if (val === '') {
        error = 'emptyFields';
        break;
      }
    }

    if (error) {
      this.setState({
        errors: error,
      });
      return;
    }

    fields.winnings = parseInt(fields.winnings);

    if (onSave) {
      onSave(fields);
    }

    this.resetFields();
  };

  renderError() {
    switch (this.state.errors) {
      case 'emptyFields':
        return '(*) Fields are required';
      case 'invalidImageUrl':
        return 'Image URL is not valid';
      default:
        return null;
    }
  }

  render() {
    const { countries, open, onClose } = this.props;

    return (
      <Modal open={open}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h3>Create player</h3>
        </div>
        {this.state.errors && (
          <div className="error-box">{this.renderError()}</div>
        )}
        <TextField
          name="name"
          placeholder="Name *"
          value={this.state.fields.name}
          onChange={this.handleInputChange('name')}
        />
        <TextField
          onChange={this.handleInputChange('country')}
          value={this.state.fields.country}
          selector={true}
          country="country"
          placeholder="Country *"
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
        <TextField
          name="winnings"
          placeholder="Winnings * (Only numbers)"
          value={this.state.fields.winnings}
          onChange={this.handleInputChange('winnings')}
        />
        <TextField
          name="imageUrl"
          placeholder="Image URL"
          value={this.state.fields.imageUrl}
          onChange={this.handleInputChange('imageUrl')}
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

export default CreatePlayerFormModal;
