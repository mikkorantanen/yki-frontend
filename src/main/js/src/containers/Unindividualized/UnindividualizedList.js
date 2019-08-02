import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import Page from '../../hoc/Page/Page';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './UnindividualizedList.module.css';
import Hyperlink from '../../components/UI/Hyperlink/Hyperlink';

class UnindividualizedList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: '',
    }
  }
  componentDidMount = () => {
    this.props.onFetchApplicants();
  };

  searchInputChangeHandler = event => {
    this.setState({ searchInput: event.target.value });
  };

  getPersonByOid = (personIndex) => this.props.unindividualized[personIndex];

  filterBySearchInput = () => {
    const oids = Object.keys(this.props.unindividualized);
    const searchInput = this.state.searchInput.toUpperCase();

    return searchInput.length > 2 ? 
              oids.filter(o => {
                const person = this.getPersonByOid(o);
                return person.email.toUpperCase().includes(searchInput) || 
                      `${person.etunimet} ${person.sukunimi}`.toUpperCase().includes(searchInput)})
              : oids;
  }

  unindividualizedTable = () => {
    return (
      <div className={classes.Grid} data-cy="unindividualized-table">
        <h3> Nimi </h3>
        <h3> Email </h3>
        <h3> Ilmoittautumistiedot </h3>
        {this.filterBySearchInput().map(personIndex => 
          <React.Fragment key={personIndex}>
            <Hyperlink
              to={`/henkilo-ui/virkailija/${this.getPersonByOid(personIndex).oidHenkilo}`}
              text={`${this.getPersonByOid(personIndex).etunimet} ${this.getPersonByOid(personIndex).sukunimi}`}
            />
            <Hyperlink to={this.getPersonByOid(personIndex).email} type="email"/>
            <p>
              {`Paikka: ${this.getPersonByOid(personIndex).exam_location_name}`} <br />
              {`Kieli: ${this.getPersonByOid(personIndex).exam_lang}`} <br />
              {`Taso: ${this.getPersonByOid(personIndex).exam_level}`} <br />
              {`Pvm: ${this.getPersonByOid(personIndex).exam_date}`}
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
        {/* filterbar */}
        <div className={classes.FilterContainer}>
          <div className={classes.Filter}>
            <input type="text" placeholder="Hae nimeä tai sähköpostia" onChange={this.searchInputChangeHandler} />
          </div>
        </div>
        {/* content table */}
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