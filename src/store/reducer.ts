import { createSlice } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';

interface ApiState {
    USD: number;
    EUR: number;
    GBP: number;
    currentCurrency: string;
    lastUpdate: number;
    graphValues : Array<number>;
}

const initialState: ApiState = {
    USD: 0,
    EUR: 0,
    GBP: 0,
    currentCurrency: 'USD',
    lastUpdate: 0,
    graphValues: []
}

//Update state
export const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        setNewValues: (state, action) => {
            const resJson = action.payload.bpi;
            
            state.USD = resJson["USD"].rate;
            state.EUR = resJson["EUR"].rate;            
            state.GBP = resJson["GBP"].rate;

            state.lastUpdate = new Date().getTime();
            state.currentCurrency = action.payload.moeda;
        },
        changeCurrency: (state, action) => {
            state.currentCurrency = action.payload;
        },
        setGraphValues: (state, action) => {
            state.graphValues = action.payload;
        }
    },
});

export const { setGraphValues, setNewValues, changeCurrency } = apiSlice.actions;

//Async functions
export const fetchApi = (moeda: string): AppThunk => dispatch => {
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then(res => res.json())
    .then(res => dispatch(setNewValues({...res, moeda})))
    .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      });
};

export const fetchGraphApi = (startDate : string, endDate: string): AppThunk => dispatch => {
    fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`)
    .then(res => res.json())
    .then(res => res.bpi)
    .then(res => Object.values(res))
    .then(res => dispatch(setGraphValues(res)))
    .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      });;
}

//Get data
export const selectData = (state: RootState) => {
    return {
        value : state.api[state.api.currentCurrency],
        moeda : state.api.currentCurrency,
        lastUpdate : state.api.lastUpdate,
    }    
}

export const selectGraphValues = (state: RootState) => state.api.graphValues;

export default apiSlice.reducer;