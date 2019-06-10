import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { LogOut } from './LogOut';

configure({ adapter: new Adapter() });

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return { i18n: { language: 'fi' }, t: k => k };
  }
}));

describe('<LogOut />', () => {
  it('should show logout link when logged in', () => {
    const user = { identity: { username: "testikayttaja" } }
    const wrapper = shallow(<LogOut user />);

    expect(wrapper.find('#logout-link').exists()).toBeTruthy();
  });

  it('should not show logout link when not logged in', () => {
    const wrapper = shallow(<LogOut user={null} />);

    expect(wrapper.find('#logout-link').exists()).toBeFalsy();
  });
});
