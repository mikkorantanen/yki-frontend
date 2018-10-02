/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Organizers from '../Organizers/Organizers';
import OrganizerAdd from '../OrganizerAdd/OrganizerAdd';
import ophStyles from '../../oph-styles.css';
import classes from './OrganizerRegistry.css';

class OrganizerRegistry extends Component {
  state = {
    showOrganizerForm: false,
  };

  componentDidMount() {
    this.props.onFetchOrganizerRegistryContent();
  }

  render() {
    const showOrganizerForm = this.state.showOrganizerForm;
    return (
      <div className={classes.OrganizerRegistry}>
        {showOrganizerForm ? (
          <OrganizerAdd />
        ) : (
          <React.Fragment>
            <h1>Järjestäjärekisteri</h1>
            <Organizers loading={this.props.loading} registry={this.props.organizerRegistry} />
            <button
              type="submit"
              className={[ophStyles['oph-button'], ophStyles['oph-button-primary']].join(' ')}
              onClick={() => this.setState({ showOrganizerForm: true })}
            >
              Lisää uusi
            </button>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    organizerRegistry: state.org.organizerRegistry,
    loading: state.org.loading,
    error: state.org.error,
    // apiPending: state.org.busyCounter > 0,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrganizerRegistryContent: () => dispatch(actions.fetchOrganizerRegistryContent()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganizerRegistry);
