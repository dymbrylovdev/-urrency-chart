import { ReducersMapObject } from 'redux';
import {
  AnyAction, CombinedState, EnhancedStore, Reducer,
} from '@reduxjs/toolkit';
import { CurrencySchema } from 'entities/Currency/model/types/currency';
import { AxiosInstance } from 'axios/index';

export interface StateSchema {
  currency?: CurrencySchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ThunkExtra {
  api: AxiosInstance,
}

export interface ThunkConfig<T> {
  extra: ThunkExtra,
  rejectValue: T,
  state: StateSchema
}
