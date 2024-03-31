import { AsyncThunkAction } from '@reduxjs/toolkit';
import { StateSchema, ThunkConfig } from 'app/providers/StoreProvider';
import axios, { AxiosStatic } from 'axios';

jest.mock('axios');

const jestMockedAxios = jest.mocked(axios);

type ActionCreatorType<Return, Arg, RejectedValue> =
  (arg: Arg) => AsyncThunkAction<Return, Arg, ThunkConfig<RejectedValue>>;
export class TestAsyncThunk<Return, Arg, RejectedValue> {
  dispatch: jest.MockedFn<any>;

  getState: () => StateSchema;

  actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;

  api: jest.MockedFunctionDeep<AxiosStatic>;

  constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn();
    this.getState = jest.fn();
    this.api = jestMockedAxios;
  }

  async callThunk(arg: Arg) {
    const action = await this.actionCreator(arg);
    return action(
      this.dispatch,
      this.getState,
      {
        api: this.api,
      },
    );
  }
}
