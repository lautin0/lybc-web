import React from 'react';
import { configure, mount } from 'enzyme'
import { act } from 'react-dom/test-utils';
import { Router } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { IntlProvider } from 'react-intl';
import Index from "../views/Index";
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import en from '../../src/assets/i18n/en.json';
import { Provider } from "react-redux";
import { createStore } from 'redux'
import rootReducer from '../reducers'
import { UserDocument } from "../generated/graphql";
import { createMemoryHistory } from 'history';

Enzyme.configure({ adapter: new Adapter() });

configure({ adapter: new Adapter() });

let indexPage: any;

const store = createStore(rootReducer)

const mocks = [
  {
    request: {
      query: UserDocument,
    },
    result: {
      data: {
        worships: []
      },
    },
  },
];

const history = createMemoryHistory()

beforeEach(() => {
  indexPage = document.createElement('div');
  document.body.appendChild(indexPage);
});

afterEach(() => {
  document.body.removeChild(indexPage);
  indexPage = null;
});

it("renders without crashing", () => {
  window.scrollTo = jest.fn()
})

it('can render and update a IndexPage', () => {
  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <IntlProvider locale="en" messages={en}>
        <Provider store={store}>
          <Router history={history}>
            <Index />
          </Router>
        </Provider>
      </IntlProvider>
    </MockedProvider>,
  )
  // ).find('.selector').at(1);

  const button = indexPage.querySelector('button');
  const label = indexPage.querySelector('p');
  expect(document.title).toBe('LYBC');
});