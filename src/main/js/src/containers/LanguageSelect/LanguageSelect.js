import React from 'react';
import {connect} from "react-redux";
import * as actions from '../../store/actions';

import globe from '../../assets/svg/globe.svg';
import classes from './LanguageSelect.module.css';
import i18n from "../../i18n";
import {capitalize} from "../../util/util";

const texts = {fi: 'suomeksi', sv: 'på svenska', en: 'in english'};
const languages = ['fi', 'sv', 'en'];

class LanguageSelect extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ykiLanguage: props.ykiLanguage
    }
  }

  changeLanguage = lang => {
    document.documentElement.lang = lang;
    i18n.changeLanguage(lang);
  };

  handleLanguageChange = (e) => {
    this.props.setCollapsibleOpen(!this.props.isOpen)
    const selected = e.target.value;
    this.props.onYkiLanguageChange(selected);
    i18n.changeLanguage(selected);
  }

  languageSelector = () => (
      <select name="language" className={classes.LanguageSelect} onChange={e => this.handleLanguageChange(e)}
              data-cy={"language-select"} defaultValue={this.state.ykiLanguage}>
        {languages
            .map(lang => (
                <option
                    key={lang}
                    lang={`SELECTOR-${lang}`}
                    value={lang}
                    className={classes.LanguageSelect}
                >
                  {texts[lang]}
                </option>
            ))}
      </select>
  );

  languageLinks = () => (
      <div className={classes.MobileMenuItems}>
        {languages.map((lang) => (
            <>
              <button
                  className={classes.LanguageItem}
                  key={`LINK-${lang}`}
                  value={lang}
                  onClick={e => this.handleLanguageChange(e)}
              >
                {capitalize(texts[lang])}
              </button>
              <hr/>
            </>
        ))}
      </div>
  );

  render() {
    const desktop = window.innerWidth > 412;

    return (
        <>
          {desktop ?
              <div className={classes.SelectorContainer}>
                <img src={globe} aria-disabled alt={'globe-icon'}/>
                {this.languageSelector()}
              </div>
              :
              <>
                {this.languageLinks()}
              </>
          }
        </>
    );
  };
}

const mapStateToProps = state => {
  return {
    ykiLanguage: state.yki.ykiLanguage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onYkiLanguageChange: ykiLanguage => dispatch(actions.changeYKILanguage(ykiLanguage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelect);
