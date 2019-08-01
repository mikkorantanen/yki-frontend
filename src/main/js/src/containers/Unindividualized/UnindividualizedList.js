import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import Page from '../../hoc/Page/Page';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './UnindividualizedList.module.css';
import Hyperlink from '../../components/UI/Hyperlink/Hyperlink';

class UnindividualizedList extends Component {
  componentDidMount = () => {
    this.props.onFetchApplicants();
  };

  unindividualizedTable = () => {
    const getPerson = (personIndex) => this.props.unindividualized[personIndex];

    return (
      <div className={classes.Grid} data-cy="unindividualized-table">
        <h3> Nimi </h3>
        <h3> Email </h3>
        <h3> Ilmoittautumistiedot </h3>
        {Object.keys(this.props.unindividualized).map(personIndex => 
          <React.Fragment key={personIndex}>
            <Hyperlink
              to={`/henkilo-ui/virkailija/${getPerson(personIndex).oidHenkilo}`}
              text={`${getPerson(personIndex).etunimet} ${getPerson(personIndex).sukunimi}`}
            />
            <Hyperlink to={getPerson(personIndex).email} type="email"/>
            <p>
              {`Paikka: ${getPerson(personIndex).exam_location_name}`} <br />
              {`Kieli: ${getPerson(personIndex).exam_lang}`} <br />
              {`Taso: ${getPerson(personIndex).exam_level}`} <br />
              {`Pvm: ${getPerson(personIndex).exam_date}`}
            </p>
          </React.Fragment>
        )}
      </div>
    )
  }

  render() {
    const content = this.props.loading ? (
      <Spinner />
    ) : (
      <div>
        {this.props.unindividualized ? 
          this.unindividualizedTable() : 
          <p>Ei yksilöimättömiä hakijoita</p>}
      </div>
    );
    return (
      <Page>
        <div className={classes.UnindividualizedList}>
          <h2> Yksilöimättömät hakijat </h2>
          {content}
        </div>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.unindividualized.loading,
    error: state.unindividualized.error,
    unindividualized: state.unindividualized.unindividualized,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchApplicants: () => dispatch(actions.fetchUnindividualizedApplicants()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UnindividualizedList);