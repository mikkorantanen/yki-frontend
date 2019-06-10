import React from 'react';
import { configure, mount } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { createStore, combineReducers } from 'redux';
import userReducer from '../../../store/reducers/user';
import { RegistrationPage } from './RegistrationPage';

configure({ adapter: new Adapter() });

jest.mock('react-i18next', () => ({
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: () => '' };
    return Component;
  },
  useTranslation: () => {
    return { i18n: { language: 'fi' }, t: k => k };
  },
}));

describe('<RegistrationPage />', () => {
  it('should render registration page and get initial form data', () => {
    const onInitRegistrationForm = jest.fn();
    const examSessionId = 9999;
    const mockStore = createStore(combineReducers({user: userReducer}));

    mount(
      <Provider store={mockStore}>
        <RegistrationPage
          match={{ params: { examSessionId: examSessionId } }}
          onInitRegistrationForm={onInitRegistrationForm}
        />
      </Provider>,
    );
    expect(onInitRegistrationForm).toBeCalledWith(examSessionId);
  });
});
