import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./LoginPage";
import { IntlProvider } from 'react-intl';
import en from '../../assets/i18n/en.json';
import { Provider } from "react-redux";
import { createStore } from 'redux'
import rootReducer from '../../reducers/index'
import { MockedProvider } from "@apollo/client/testing";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { UserDocument } from "generated/graphql";

const mockLogin = jest.fn((username, password) => {
  return Promise.resolve({ username, password });
});

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

describe("LoginPage", () => {

  beforeEach(() => {
    window.scrollTo = jest.fn()

    render(<MockedProvider mocks={mocks} addTypename={false}>
      <IntlProvider locale="en" messages={en}>
        <Provider store={store}>
          <Router history={history}>
            <LoginPage loginFn={mockLogin} />
          </Router>
        </Provider>
      </IntlProvider>
    </MockedProvider>);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should display required error when value is invalid", async () => {
    fireEvent.submit(screen.getByRole("button", { name: 'Login' }));

    expect(await screen.findAllByRole("alert")).toHaveLength(2);
    expect(mockLogin).not.toBeCalled();
  });

  it("should display matching error when username is invalid", async () => {
    fireEvent.input(screen.getByRole("textbox"), {
      target: {
        value: null
      }
    });

    fireEvent.input(screen.getByPlaceholderText(/password/i), {
      target: {
        value: "password"
      }
    });

    fireEvent.submit(screen.getByRole("button", { name: 'Login' }));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockLogin).not.toBeCalled();
    expect((screen.getByRole("textbox") as HTMLInputElement).value).toBe("");
    expect((screen.getByPlaceholderText(/password/i) as HTMLInputElement).value).toBe("password");
  });

  it("should display min length error when password is invalid", async () => {
    fireEvent.input(screen.getByRole("textbox"), {
      target: {
        value: "test@mail.com"
      }
    });

    fireEvent.input(screen.getByPlaceholderText(/password/i), {
      target: {
        value: null
      }
    });

    fireEvent.submit(screen.getByRole("button", { name: 'Login' }));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockLogin).not.toBeCalled();
    expect((screen.getByRole("textbox") as HTMLInputElement).value).toBe(
      "test@mail.com"
    );
    expect((screen.getByPlaceholderText(/password/i) as HTMLInputElement).value).toBe("");
  });

  it("should not display error when value is valid", async () => {
    fireEvent.input(screen.getByRole("textbox"), {
      target: {
        value: "test@mail.com"
      }
    });

    fireEvent.input(screen.getByPlaceholderText(/password/i), {
      target: {
        value: "password"
      }
    });

    fireEvent.submit(screen.getByRole("button", { name: 'Login' }));

    await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));
    expect(mockLogin).toBeCalledWith(expect.objectContaining({ username: "test@mail.com", password: "password" }));
    expect((screen.getByRole("textbox") as HTMLInputElement).value).toBe("");
    expect((screen.getByPlaceholderText(/password/i) as HTMLInputElement).value).toBe("");
  });
});