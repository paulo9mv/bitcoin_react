import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';

interface ApiState {
    usd: number;
    eur: number;
    gbp: number;
    lastUpdate: string;
}

const initialState: ApiState = {
    usd: 0,
    eur: 0,
    gbp: 0,
    lastUpdate: '',
}

export const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        setNewValues: (state, action) => {
            console.log(action.payload);
            state.usd = action.payload
            const resJson = action.payload.bpi;
            
            state.eur = resJson["EUR"].rate;
            state.usd = resJson["USD"].rate;
            state.gbp = resJson["GBP"].rate;

        }
    },
});

export const { setNewValues } = apiSlice.actions;

export const fetchApi = (): AppThunk => dispatch => {
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(res => res.json()).then(
            res => dispatch(setNewValues(res)));

};

export const selectData = (state: RootState) => state.api;

export default apiSlice.reducer;