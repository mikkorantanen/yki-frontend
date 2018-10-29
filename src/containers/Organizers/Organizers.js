import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { filterOrganizerInfo } from '../../util/organizerUtil';
import Organizer from '../../components/Organizer/Organizer';
import Spinner from '../../components/UI/Spinner/Spinner';
// import classes from './Organizers.module.css';

class Organizers extends Component {
  render() {
    let organizers = <Spinner />;
    if (!this.props.loading) {
      organizers = this.props.registry.map((org, i) => {
        const organizer = filterOrganizerInfo(
          org.organizer,
          org.organization,
          this.props.localization,
        );
        return <Organizer key={i} organizer={organizer} />;
      });
    }
    return organizers;
  }
}

Organizers.propTypes = {
  localization: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  registry: PropTypes.array.isRequired,
};

export default Organizers;
