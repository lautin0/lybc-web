import { configure, mount } from 'enzyme'
import WorshipList from './WorshipList';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Router } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { IntlProvider } from 'react-intl';
import en from '../../assets/i18n/en.json';
import { WorshipsDocument } from 'generated/graphql';
import { createMemoryHistory } from 'history';

configure({ adapter: new Adapter() });

let worshipListPage: any;

const history = createMemoryHistory()

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

const mocks = [
  {
    request: {
      query: WorshipsDocument,
    },
    result: {
      data: {
        worships: []
      },
    },
  },
];

it('can render and update a WorshipList Page', () => {
  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <IntlProvider locale="en" messages={en}>
        <Router history={history}>
          <WorshipList />
        </Router>
      </IntlProvider>
    </MockedProvider>,
  )

  const button = worshipListPage.querySelector('button');
  const label = worshipListPage.querySelector('p');

  expect(document.title).toBe('Online Sermon');
});