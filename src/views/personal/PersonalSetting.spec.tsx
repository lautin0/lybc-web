import { render, fireEvent, getAllByRole, getByLabelText } from '@testing-library/react'
import en from '../../../src/assets/i18n/en.json';
import { Provider } from "react-redux";
import { Router } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { IntlProvider } from 'react-intl';
import { createStore } from 'redux'
import rootReducer from '../../reducers'
import { UserDocument } from "../../generated/graphql";
import { createMemoryHistory } from 'history';
import PersonalSetting from './PersonalSetting'
import { act } from 'react-dom/test-utils';

const store = createStore(rootReducer)

const mocks = [
  {
    request: {
      query: UserDocument,
      variables: { username: "" },
    },
    result: {
      data: {
        user: { "username": "sysadmin", "name": "System Admin", "nameC": "系統管理員", "role": "ADMIN", "gender": "MALE", "title": null, "titleC": null, "email": "aaa@gmail.com", "phone": "2222 2222", "dob": null, "profilePicURI": null, "status": null, "__typename": "User" }
      },
    },
  },
];

const history = createMemoryHistory()

test('datepicker works normally', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <IntlProvider locale="en" messages={en}>
        <Provider store={store}>
          <Router history={history}>
            <PersonalSetting />
          </Router>
        </Provider>
      </IntlProvider>
    </MockedProvider>)

  await act(() => new Promise(resolve => setTimeout(resolve, 0)));

  // Click Datetimepicker
  const el = getAllByRole(document.body, 'tab')
  act(() => {
    fireEvent.click(el[0])
  })
  const picker = getByLabelText(document.body, 'change date')
  act(() => {
    fireEvent.click(picker)
  })
  expect(picker).toBeDefined()
})
