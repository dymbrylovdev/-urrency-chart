import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { isFulfilled } from 'shared/lib/utils';
import { AxiosResponse } from 'axios';
import { enableMapSet } from 'immer';
import {
  Currency, CurrencyType, IReturnTypeCurrencyByDate, ReturnCurrencyThunk,
} from '../types/currency';

enableMapSet();
export const fetchCurrencyByDate = createAsyncThunk<
ReturnCurrencyThunk,
{
  currency: CurrencyType,
},
ThunkConfig<string>
>(
  'currency/fetchCurrencyByDate',
  async ({ currency }, thunkApi) => {
    const {
      extra, rejectWithValue, getState,
    } = thunkApi;
    const state = getState();
    const dateForm = state.currency?.dates;
    const chartData = state.currency?.chartData;
    let count = 0;

    try {
      if (!dateForm) {
        throw new Error();
      }
      const promiseArr = Array.from(dateForm)?.map(async (date) => {
        const hasData = dateForm?.has(date);
        if (hasData) { // Если данные даты уже есть в кэше берем их
          const findChartData = chartData?.get(currency)?.find((item) => item?.date === date);
          if (findChartData) {
            return new Promise<AxiosResponse<IReturnTypeCurrencyByDate>>((resolve, reject) => {
              resolve({
              // @ts-ignore
                data: {
                  date: findChartData.date,
                  [currency]: {
                    [Currency.RUB]: findChartData.value,
                  },
                },
              });
            });
          }
        }
        // Если данные новые даты новые то кидаем запрос на получение новых данных
        count += 1;
        return extra.api.get<IReturnTypeCurrencyByDate>(`npm/@fawazahmed0/currency-api@${date}/v1/currencies/${currency}.json`);
      });

      const result = await Promise.allSettled(promiseArr);
      const response = result.map((res) => {
        if (isFulfilled(res)) {
          return {
            date: res.value.data.date,
            value: res.value.data[currency].rub,
          };
        }
      });

      return {
        currency,
        data: response,
        count,
      };
    } catch (e) {
      console.error(e);
      return rejectWithValue('error');
    }
  },
);
