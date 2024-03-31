import { StoreProvider } from './ui/StoreProvider';
import { AppDispatch, createReduxStore } from './config/store';
import type { StateSchema } from './config/StateSchema';
import { createReducerManager } from './config/reducerManager';

export {
  ReducerManager,
  ReduxStoreWithManager,
  StateSchemaKey,
  ThunkConfig,
  ThunkExtra,
} from './config/StateSchema';

export {
  StoreProvider,
  createReduxStore,
  StateSchema,
  createReducerManager,
  AppDispatch,
};
