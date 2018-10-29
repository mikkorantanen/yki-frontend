import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../store/actions/index';
import Organizers from '../Organizers/Organizers';
import Button from '../../components/UI/Button/Button';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios';
import classes from './OrganizerRegistry.module.css';

class OrganizerRegistry extends Component {
  componentDidMount() {
    document.title = 'YKI - Järjestäjärekisteri';
    this.props.onFetchOrganizerRegistryContent();
  }

  addOrganizerHandler = () => {
    this.props.history.push('/jarjestajarekisteri/uusi');
  };

  render() {
    return (
      <div className={classes.OrganizerRegistry}>
        <h1>Järjestäjärekisteri</h1>
        <Organizers
          lang={this.props.lang}
          loading={this.props.loading}
          registry={this.props.organizerRegistry}
        />
        <Button clicked={this.addOrganizerHandler}>Lisää uusi</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    organizerRegistry: state.org.organizerRegistry,
    loading: state.org.loading,
    lang: state.org.lang,
    error: state.org.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrganizerRegistryContent: () =>
      dispatch(actions.fetchOrganizerRegistryContent()),
  };
};

OrganizerRegistry.propTypes = {
  onFetchOrganizerRegistryContent: PropTypes.func.isRequired,
  organizerRegistry: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  lang: PropTypes.string.isRequired,
  history: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(OrganizerRegistry, axios));
