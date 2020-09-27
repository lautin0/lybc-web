import React from 'react';
import { configure, mount } from 'enzyme'
import { act } from 'react-dom/test-utils';
import WorshipList, { GET_WORSHIPS } from './WorshipList';
import Adapter from 'enzyme-adapter-react-16';
import { Router } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';

configure({ adapter: new Adapter() });

let worshipListPage: any;

beforeEach(() => {
  worshipListPage = document.createElement('div');
  document.body.appendChild(worshipListPage);
});

afterEach(() => {
  document.body.removeChild(worshipListPage);
  worshipListPage = null;
});

it("renders without crashing", () => {
  window.scrollTo = jest.fn()
})

it('can render and update a loginPage', () => {
  const mocks = [
    {
      request: {
        query: GET_WORSHIPS,
      },
      result: {
        data: {
          worships: []
        },
      },
    },
  ];

  const historyMock: any = { push: jest.fn(), location: {}, listen: jest.fn() };
  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Router history={historyMock}>
        <WorshipList />
      </Router>
    </MockedProvider>,
  ).find('.selector').at(1);

  const button = worshipListPage.querySelector('button');
  const label = worshipListPage.querySelector('p');
  // expect(label.textContent).toBe('You clicked 0 times');
  expect(document.title).toBe('網上崇拜');

  // Test second render and componentDidUpdate
  // act(() => {
  //   button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  // });
  // expect(label.textContent).toBe('You clicked 1 times');
  // expect(document.title).toBe('You clicked 1 times');
});