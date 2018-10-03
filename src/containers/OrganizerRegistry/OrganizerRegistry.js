/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Organizers from '../Organizers/Organizers';
import Button from '../../components/UI/Button/Button';
import ophStyles from '../../assets/css/oph-styles.css';
import classes from './OrganizerRegistry.css';

class OrganizerRegistry extends Component {
  componentDidMount() {
    this.props.onFetchOrganizerRegistryContent();
  }

  addOrganizerHandler = () => {
    this.props.history.push('/jarjestajarekisteri/uusi');
  };

  render() {
    return (
      <div className={classes.OrganizerRegistry}>
        <h1>Järjestäjärekisteri</h1>
        <Organizers loading={this.props.loading} registry={this.props.organizerRegistry} />
        <Button clicked={this.addOrganizerHandler}>Lisää uusi</Button>
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
