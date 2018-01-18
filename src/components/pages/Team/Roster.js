import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Loader} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {fetchTeam, fetchPlayers} from '../../../actions';

class Roster extends Component {
  componentDidMount() {
    const {match: {params}} = this.props;
    this.props.fetchTeam(params.id).then(this.props.fetchPlayers(params.id));
  }

  render() {
    const {team, players, loading} = this.props;
    if (loading) {
      return <Loader size="large">Loading...</Loader>;
    }

    const playersElement = players.players
      .sort((p1, p2) => p1.jerseyNumber - p2.jerseyNumber)
      .map(p => (
        <li className="card-x" key={`player-${p.name}-${p.jerseyNumber}`}>
          <div className="card-player">
            <div className="card-player-body">
              <h2>
                <span className="player-jersey-number">#{p.jerseyNumber}</span>
                <span className="player-name">{p.name}</span>
              </h2>
              <div className="player-info">
                <div>
                  <span>Position</span>
                  <span>{p.position}</span>
                </div>
                <div>
                  <span>Nationality</span>
                  <span>{p.nationality}</span>
                </div>
                <div>
                  <span>Date of Birth</span>
                  <span>{p.dateOfBirth}</span>
                </div>
                <div>
                  <span>Contract Until</span>
                  <span>{p.contractUntil}</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      ));

    return (
      <div>
        <h2 className="header-with-center-text">
          <span>{team.name}</span>
        </h2>
        <ul className="list-grid">{playersElement}</ul>
      </div>
    );
  }
}

Roster.propTypes = {
  loading: PropTypes.bool.isRequired,
  team: PropTypes.shape({}).isRequired,
  fetchTeam: PropTypes.func.isRequired,
  fetchPlayers: PropTypes.func.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
    params: PropTypes.shape({id: PropTypes.string}),
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    loading: state.team.loading || state.players.loading,
    team: state.team.team,
    players: state.players.players,
  };
}

export default withRouter(
  connect(mapStateToProps, {fetchTeam, fetchPlayers})(Roster),
);