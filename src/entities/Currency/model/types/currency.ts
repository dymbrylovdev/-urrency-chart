import * as buffer from 'buffer';

export enum Currency {
  'RUB' = 'rub',
  'EUR' = 'eur',
  'USD' = 'usd',
  'CNY' = 'cny',
}

export type CurrencyType = Currency.EUR | Currency.USD | Currency.CNY;

export interface CurrencySchema {
  currency?: CurrencyType[];
  differenceDays?: Array<Date>,
  isLoading: boolean,
  error?: string,
  chartData: IChartData,
  dates: Set<string>,
  datesForm: string[] | undefined,
  countFetch: number,
}

export type CurrencyKey = Record<CurrencyType, Record<string, number>>;

export interface IReturnTypeCurrencyByDate extends CurrencyKey {
  date: string
}

export type IChartDataItem = {
  date: string,
  value: number
};

export type IChartData = Map<CurrencyType, (IChartDataItem | undefined)[]>;

export type ReturnCurrencyThunk = {
  currency: CurrencyType,
  data: (IChartDataItem | undefined)[],
  count: number,
};
