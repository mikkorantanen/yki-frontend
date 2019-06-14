import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import Page from '../../hoc/Page/Page';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './UnindividualizedList.module.css';

class UnindividualizedList extends Component {
  componentDidMount = () => {
    this.props.onFetchApplicants();
  };

  unindividualizedTable = () => {
    return (
      <div className={classes.Grid} data-cy="unindividualized-table">
        <h3> Nimi </h3>
        <h3> Email </h3>
        <h3> Oid </h3>
        {this.props.unindividualized.map(person => 
          <React.Fragment key={person.oid}>
            <p> <a href="#"> {person.firstName + " " + person.lastName} </a> </p>
            <p> {person.email} </p>
            <p> {person.oid} </p>
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
        {this.props.unindividualized.length > 0 ? 
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