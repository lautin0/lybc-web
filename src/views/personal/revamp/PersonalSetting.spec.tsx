import { render, fireEvent, screen, getByTestId, getByRole, getByText, getAllByRole } from '@testing-library/react'
import en from '../../../../src/assets/i18n/en.json';
import { Provider } from "react-redux";
import { Router } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { IntlProvider } from 'react-intl';
import { createStore } from 'redux'
import rootReducer from '../../../reducers'
import { UserDocument } from "../../../generated/graphql";
import { createMemoryHistory } from 'history';
import PersonalSetting from './PersonalSetting'

const store = createStore(rootReducer)

const mocks = [
  {
    request: {
      query: UserDocument,
      variables: { username: "" },
    },
    result: {
      data: {
        user: { "username": "sysadmin", "name": "System Admin", "nameC": "系統管理員", "role": "ADMIN", "gender": "MALE", "title": null, "titleC": null, "email": "lukyeungchurch@gmail.com", "phone": "9433 1359", "dob": null, "profilePicURI": "/lybcstorage/lybc_logo.png", "status": null, "__typename": "User" }
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

  await new Promise(resolve => setTimeout(resolve, 0));

  // Click Datetimepicker
  const el = getAllByRole(document.body, 'tab')
  fireEvent.click(el[0])
  await new Promise(resolve => setTimeout(resolve, 200));
  fireEvent.click(getByTestId(document.body, 'dob-dtp'))  
})
