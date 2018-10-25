import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import { LANGUAGES } from '../../common/Constants';

class LanguageSelect extends Component {
  state = {
    languages: [],
  };

  componentDidMount() {
    const languages = [];
    LANGUAGES.map(lang => {
      lang.levels.map(level => {
        const lName = lang.name + ' / ' + this.capitalizeFirstLetter(level);
        languages.push({
          value: lName,
          label: lName,
          code: lang.code,
          level: level,
        });
      });
    });

    this.setState({ languages: languages });
  }

  capitalizeFirstLetter = word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  render() {
    return (
      <Select
        isMulti
        name="colors"
        options={this.state.languages}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={value => this.props.onChange(value)}
      />
    );
  }
}

LanguageSelect.propTypes = {
  onChange: PropTypes.func,
};

export default LanguageSelect;
