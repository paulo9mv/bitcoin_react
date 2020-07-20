import { createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "./store";

interface ApiState {
  USD: number;
  EUR: number;
  GBP: number;
  currentCurrency: string;
  lastUpdate: number;
  graphValues: Array<number>;
  error: boolean;
}

const initialState: ApiState = {
  USD: 0,
  EUR: 0,
  GBP: 0,
  currentCurrency: "USD",
  lastUpdate: 0,
  graphValues: [],
  error: false,
};

//Update state
export const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    setNewValues: (state, action) => {
      try {
        const resJson = action.payload.bpi;

        state.USD = resJson["USD"].rate;
        state.EUR = resJson["EUR"].rate;
        state.GBP = resJson["GBP"].rate;

        state.lastUpdate = new Date().getTime();
        state.currentCurrency = action.payload.moeda;
        state.error = false;
      } catch (e) {
        state.error = true;
      }
    },
    changeCurrency: (state, action) => {
      state.currentCurrency = action.payload;
    },
    setGraphValues: (state, action) => {
      state.error = false;
      state.graphValues = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setGraphValues,
  setNewValues,
  changeCurrency,
  setError,
} = apiSlice.actions;

//Async functions
export const fetchApi = (moeda: string): AppThunk => (dispatch) => {
  fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
    .then((res) => res.json())
    .then((res) => dispatch(setNewValues({ ...res, moeda })))
    .catch(function (error) {
      console.log(error.message);
      dispatch(setError(true));
    });
};

export const fetchGraphApi = (startDate: string, endDate: string): AppThunk => (
  dispatch
) => {
  fetch(
    `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`
  )
    .then((res) => res.json())
    .then((res) => res.bpi)
    .then((res) => Object.values(res))
    .then((res) => dispatch(setGraphValues(res)))
    .catch(function (error) {
      console.log(error.message);
      dispatch(setError(true));
    });
};

//Get data
export const selectData = (state: RootState) => {
  return {
    value: state.api[state.api.currentCurrency],
    moeda: state.api.currentCurrency,
    lastUpdate: state.api.lastUpdate,
  };
};

export const selectGraphValues = (state: RootState) => state.api.graphValues;

export const selectError = (state: RootState) => state.api.error;

export default apiSlice.reducer;
