import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import Collapsible from "../../../components/UI/Collapsible/Collapsible";
import RegistrationPeriod from "../util/RegistrationPeriod";

import classes from './RegistrationDatesCollapsible.module.css'
import RegistrationDatesContent from "./RegistrationDatesContent";

const RegistrationDatesCollapsible = (props) => {
  const { t } = useTranslation();

  const [show, setOpen] = useState(false);
  const { headerText, content } = props;

  return (
    <>
      <Collapsible
        className={show ? classes.DescriptionsBarOpen : classes.DescriptionsBarClosed }
        show={show}
        clicked={() => setOpen(!show)}
      >
        <h3>{t(headerText)}</h3>
        <RegistrationDatesContent content={content} />
      </Collapsible>
      <hr />
    </>
  )
}

RegistrationDatesCollapsible.propTypes = {
  headerText: PropTypes.string.isRequired,
  content: PropTypes.array.isRequired,
};

export default RegistrationDatesCollapsible;