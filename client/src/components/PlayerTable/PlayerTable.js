import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connectAdvanced } from 'react-redux';
import shallowEqual from 'shallowequal';
import cs from 'classnames';
import { COUNTRIES } from '../../constants';
import {
  fetchAllPlayers,
  editPlayer,
  deletePlayer,
} from '../../actions/players';

import './PlayerTable.scss';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableSubHeader from './TableSubheader';
import EditFormModal from './EditFormModal';
import DeleteAlertModal from './DeleteAlertModal';

class PlayerTable extends PureComponent {
  static propTypes = {
    players: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        country: PropTypes.oneOf(Object.keys(COUNTRIES)),
        winnings: PropTypes.number.isRequired,
        imageUrl: PropTypes.string.isRequired,
      })
    ).isRequired,
    editPlayer: PropTypes.func.isRequired,
    fetchAllPlayers: PropTypes.func.isRequired,
  };

  state = {
    selectedPlayer: null,
    showEditPlayerForm: false,
    showDeletePlayerAlert: false,
    hasMore: true,
  };

  componentDidMount() {
    const { fetchAllPlayers } = this.props;

    fetchAllPlayers();

    this.attachScrollListener();
  }

  componentDidUpdate() {
    if (this.state.hasMore) {
      this.attachScrollListener();
    }
  }

  attachScrollListener() {
    const scrollEl = window;

    scrollEl.addEventListener('mousewheel', this.mousewheelListener);
    scrollEl.addEventListener('scroll', this.scrollListener);
    scrollEl.addEventListener('resize', this.scrollListener);
  }

  detachScrollListener() {
    const scrollEl = window;

    scrollEl.removeEventListener('scroll', this.scrollListener);
    scrollEl.removeEventListener('resize', this.scrollListener);
  }

  calculateOffset(el, scrollTop) {
    if (!el) {
      return 0;
    }

    return (
      this.calculateTopPosition(el) +
      (el.offsetHeight - scrollTop - window.innerHeight)
    );
  }

  calculateTopPosition(el) {
    if (!el) {
      return 0;
    }
    return el.offsetTop + this.calculateTopPosition(el.offsetParent);
  }

  scrollListener = () => {
    const el = document.getElementById('player-table-body');
    const threshold = 100;
    const parentNode = el.parentNode;

    const doc =
      document.documentElement || document.body.parentNode || document.body;
    const scrollTop = doc.scrollTop;
    const offset = this.calculateOffset(el, scrollTop);

    if (offset < threshold && (el && el.offsetParent !== null)) {
      this.detachScrollListener();
      this.beforeScrollHeight = parentNode.scrollHeight;
      this.beforeScrollTop = parentNode.scrollTop;

      const { fetchAllPlayers, players } = this.props;
      if (fetchAllPlayers && players) {
        fetchAllPlayers({ from: players.length })
          .then(({ from, size, total }) => {
            if (from + size === total) {
              this.setState({
                hasMore: false,
              });
            }
          })
          .catch(err => {
            throw err;
          });
      }
    }
  };

  /**
   * Select player row
   * @param {string} playerId
   */
  handleClickPlayer = playerId => {
    const { players } = this.props;

    if (players) {
      const selectedPlayer = players.find(p => p.id === playerId);

      if (selectedPlayer) this.setState({ selectedPlayer });
    }
  };

  handleIntentionDeletePlayer = () => {
    this.setState({
      showDeletePlayerAlert: true,
    });
  };

  /**
   * Handle delete player and dispatch action
   * @param {string} playerId
   */
  handleDeletePlayer = playerId => {
    const { deletePlayer, fetchAllPlayers } = this.props;

    deletePlayer(playerId).then(() => {
      this.handleCloseModals();
      this.setState({ hasMore: true });
      fetchAllPlayers();
    });
  };

  handleIntEditPlayer = () => {
    this.setState({
      showEditPlayerForm: true,
    });
  };

  /**
   * Handle edit player and dispatch action
   * @param {string} playerId
   * @param {Object} formData
   */
  handleEditPlayer = (playerId, formData) => {
    const { editPlayer, fetchAllPlayers } = this.props;

    editPlayer(playerId, formData).then(() => {
      this.handleCloseModals();
      this.setState({ hasMore: true });
      fetchAllPlayers();
    });
  };

  handleRemoveSelectedPlayer = () => {
    this.setState({
      selectedPlayer: null,
    });
  };

  handleCloseModals = () => {
    this.setState({
      showDeletePlayerAlert: false,
      showEditPlayerForm: false,
    });
  };

  render() {
    const { players } = this.props;
    const {
      showEditPlayerForm,
      selectedPlayer,
      showDeletePlayerAlert,
    } = this.state;

    return (
      <div
        id="player-table-grid"
        role="grid"
        aria-label="Poker Players"
        className={cs({
          'player-table': true,
          'player-table--has-selected': !!selectedPlayer,
        })}
      >
        <EditFormModal
          player={selectedPlayer}
          open={showEditPlayerForm}
          countries={COUNTRIES}
          onClose={this.handleCloseModals}
          onSave={this.handleEditPlayer}
        />
        <DeleteAlertModal
          onDelete={this.handleDeletePlayer}
          player={selectedPlayer}
          onClose={this.handleCloseModals}
          open={showDeletePlayerAlert}
        />
        <TableSubHeader
          player={selectedPlayer}
          onClose={this.handleRemoveSelectedPlayer}
          onEditPlayer={this.handleIntEditPlayer}
          onDeletePlayer={this.handleIntentionDeletePlayer}
        />
        <TableHeader />
        <TableBody
          selectedPlayer={selectedPlayer}
          onSelectPlayer={this.handleClickPlayer}
          players={players}
        />
      </div>
    );
  }
}

export default connectAdvanced(dispatch => {
  let result;
  const actions = bindActionCreators(
    {
      fetchAllPlayers,
      editPlayer,
      deletePlayer,
    },
    dispatch
  );

  return (state, props) => {
    const players = state.playerIds.map(id => state.players[id]);

    const nextResult = { ...props, ...actions, players };

    if (!shallowEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  };
})(PlayerTable);
