/* eslint react/prop-types: 0 */
import React, { Component } from 'react';

import Organizer from '../../components/Organizer/Organizer';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Organizers.css';
//import ophStyles from '../../oph-styles.css';

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

export default Organizers;
