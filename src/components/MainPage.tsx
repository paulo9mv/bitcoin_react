import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setNewValues,
  changeCurrency,
  fetchApi,
  selectData
} from '../store/reducer';
import styles from '../features/counter/Counter.module.css';

import MyChart from './Chart';

export function MainPage() {

    const dispatch = useDispatch();

    const data = useSelector(selectData);    
 


    const handleClick = (currency: string) => {    
        /* A API só é atualizada quando o minuto vira, então
        checamos para evitar fetchs desnecessários */

        if(new Date().getMinutes() - new Date(data.lastUpdate).getMinutes() == 0){            
            dispatch(changeCurrency(currency));
        }
        else{
            dispatch(fetchApi(currency));
        }
    }

    return (
        <div>
            Preço do Bitcoin
            <div className={styles.row}>
                <button
                    className={styles.button}
                    aria-label="USD"
                    onClick={() => handleClick("USD")}
                >
                    USD
                </button>
                <button
                    className={styles.button}
                    aria-label="GBP"
                    onClick={() => handleClick("GBP")}
                >
                    GBP
                </button>
                <button
                    className={styles.button}
                    aria-label="EUR"
                    onClick={() => handleClick("EUR")}
                >
                    EUR
                </button>
            </div>
        {data.value} {data.moeda}
            
                {/**Inserir gráfico aqui */}
                <MyChart/>
            
        </div>
    );
}
