import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Organizer from '../../components/Organizer/Organizer';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Organizers.css';

class Organizers extends Component {
  render() {
    let organizers = <Spinner />;
    if (!this.props.loading) {
      organizers = this.props.registry.map((org, i) => (
        <Organizer key={i} organizer={org.organizer} organization={org.organization} />
      ));
    }
    return organizers;
  }
}

Organizers.propTypes = {
  loading: PropTypes.bool,
  registry: PropTypes.array,
};

export default Organizers;
