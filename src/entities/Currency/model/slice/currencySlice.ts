import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';
import { fetchCurrencyByDate } from '../services/fetchCurrencyByDate';
import {
  Currency, CurrencySchema, CurrencyType, IChartDataItem, ReturnCurrencyThunk,
} from '../types/currency';

const initialState: CurrencySchema = {
  currency: undefined,
  differenceDays: [],
  isLoading: false,
  error: undefined,
  chartData: new Map<CurrencyType, (IChartDataItem | undefined)[]>(),
  dates: new Set<string>([]),
  datesForm: undefined,
  countFetch: 0,
};

enableMapSet();
export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<CurrencyType>) => {
      if (state?.currency) {
        state.currency = [...state.currency, action.payload];
      } else {
        state.currency = [action.payload];
      }
    },
    removeCurrency: (state, action: PayloadAction<Currency>) => {
      const result = state?.currency?.filter((item) => action.payload !== item);
      if (result?.length === 0) {
        state.currency = undefined;
      } else {
        state.currency = result;
      }
    },

    setDates: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach((item) => {
        state.dates.add(item);
      });
    },
    setDatesForm: (state, action: PayloadAction<string[]>) => {
      state.datesForm = action.payload;
    },
    setCountFetch: (state, action: PayloadAction<number>) => {
      state.countFetch += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencyByDate.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchCurrencyByDate.fulfilled, (
        state,
        action: PayloadAction<ReturnCurrencyThunk>,
      ) => {
        state.isLoading = false;
        state.chartData.set(action.payload.currency, action.payload.data);
        state.countFetch += action.payload.count;
      })
      .addCase(fetchCurrencyByDate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: currencyActions } = currencySlice;
export const { reducer: currencyReducer } = currencySlice;
