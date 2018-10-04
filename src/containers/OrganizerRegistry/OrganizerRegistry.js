import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../store/actions/index';
import Organizers from '../Organizers/Organizers';
import Button from '../../components/UI/Button/Button';
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

OrganizerRegistry.propTypes = {
  onFetchOrganizerRegistryContent: PropTypes.func.isRequired,
  organizerRegistry: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    organizerRegistry: state.org.organizerRegistry,
    loading: state.org.loading,
    error: state.org.error,
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
