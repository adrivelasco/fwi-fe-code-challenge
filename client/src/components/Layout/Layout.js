import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../Header';
import Button from '../Button';
import CreatePlayerFormModal from './CreatePlayerFormModal';
import { COUNTRIES } from '../../constants';
import { createPlayer, fetchAllPlayers } from '../../actions/players';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    createPlayer: PropTypes.func.isRequired,
    fetchAllPlayers: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      showCreatePlayerModal: false,
    };
  }

  handleOpenCreatePlayerForm = () => {
    this.setState({
      showCreatePlayerModal: true,
    });
  };

  handleCloseCreatePlayerForm = () => {
    this.setState({
      showCreatePlayerModal: false,
    });
  };

  /**
   * Handle create player
   * @param {Object} formData
   */
  handleCreatePlayer = formData => {
    const { createPlayer, fetchAllPlayers } = this.props;

    createPlayer(formData).then(() => {
      this.handleCloseCreatePlayerForm();
      fetchAllPlayers();
    });
  };

  render() {
    const { children } = this.props;
    return (
      <Fragment>
        <Header>
          {/* <Header.Logo /> */}
          <Header.Title>FWI Poker Challenge</Header.Title>
          <Header.Spacer />
          <Header.List>
            <Header.ListItem>
              <Button
                theme="dark"
                color="success"
                onClick={this.handleOpenCreatePlayerForm}
              >
                Create player
              </Button>
            </Header.ListItem>
          </Header.List>
        </Header>
        <CreatePlayerFormModal
          open={this.state.showCreatePlayerModal}
          onClose={this.handleCloseCreatePlayerForm}
          onSave={this.handleCreatePlayer}
          countries={COUNTRIES}
        />
        {children}
      </Fragment>
    );
  }
}

export default connect(
  state => {
    return state;
  },
  { createPlayer, fetchAllPlayers }
)(Layout);
