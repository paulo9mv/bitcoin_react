import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    changeCurrency,
    fetchApi,
    fetchGraphApi,
    selectData,
    selectGraphValues
} from '../store/reducer';
import { formatDate } from '../helpers/utils';
import styles from '../features/counter/Counter.module.css';

export function SelectionBar() {
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
            <div className={styles.row}>
                <div className={styles.cellContainer}>
                    <button
                        className={styles.button}
                        aria-label="USD"
                        onClick={() => handleClick("USD")}
                    >
                        USD
                </button>
                </div>
                <div className={styles.cellContainer}>
                    <button
                        className={styles.button}
                        aria-label="GBP"
                        onClick={() => handleClick("GBP")}
                    >
                        GBP
                </button>
                </div>
                <div className={styles.cellContainer}>
                    <button
                        className={styles.button}
                        aria-label="EUR"
                        onClick={() => handleClick("EUR")}
                    >
                        EUR
                </button>
                </div>
            </div>
        </div>
    );
}
