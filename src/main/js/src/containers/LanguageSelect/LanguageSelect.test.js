import React from 'react';
import {configure, mount} from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import ykiReducer from '../../store/reducers/ykiReducer';

import LanguageSelect from './LanguageSelect';

configure({adapter: new Adapter()});

describe('<LanguageSelect />', () => {
  beforeEach(function () {
    window.innerWidth = 1440;
    window.dispatchEvent(new Event('resize'));
  });

  it('should call change language state with swedish language code', () => {
    const mockStore = createStore(combineReducers({yki: ykiReducer}), applyMiddleware(thunk));
    const wrapper = mount(
        <Provider store={mockStore}>
          <LanguageSelect/>
        </Provider>
    );

    const swedishSelect = wrapper.find('select');
    const swedishOption = swedishSelect.find('option').at(1)
    const targetValue = swedishOption.props().value;

    swedishSelect.simulate('change', {target: {value: targetValue}});
    expect(wrapper.props().store.getState().yki.ykiLanguage).toBe('sv');
  });
  it('should call change language state with english language code', () => {
    const mockStore = createStore(combineReducers({yki: ykiReducer}), applyMiddleware(thunk));

    const wrapper = mount(
        <Provider store={mockStore}>
          <LanguageSelect/>
        </Provider>
    );

    const englishSelect = wrapper.find('select');
    const englishOption = englishSelect.find('option').at(2)
    const targetValue = englishOption.props().value;

    englishSelect.simulate('change', {target: {value: targetValue}});
    expect(wrapper.props().store.getState().yki.ykiLanguage).toBe('en');
  });
});