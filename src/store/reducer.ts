import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';
import { act } from '@testing-library/react';

interface ApiState {
    USD: number;
    EUR: number;
    GBP: number;
    currentCurrency: string;
    lastUpdate: number;
}

const initialState: ApiState = {
    USD: 0,
    EUR: 0,
    GBP: 0,
    currentCurrency: 'USD',
    lastUpdate: 0,
}

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
        }
    },
});

export const { setNewValues, changeCurrency } = apiSlice.actions;

export const fetchApi = (moeda: string): AppThunk => dispatch => {




        fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(res => res.json())
        .then(res => dispatch(setNewValues({...res, moeda})));
    

    

};

export const selectData = (state: RootState) => {
    console.log( {
        value : state.api[state.api.currentCurrency],
        moeda : state.api.currentCurrency,
        lastUpdate : state.api.lastUpdate,
    }    )
    return {
        value : state.api[state.api.currentCurrency],
        moeda : state.api.currentCurrency,
        lastUpdate : state.api.lastUpdate,
    }    
}

export default apiSlice.reducer;