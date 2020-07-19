import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setNewValues,
  fetchApi,
  selectData
} from '../store/reducer';
import styles from '../features/counter/Counter.module.css';

import MyChart from './Chart';

export function MainPage() {

    const data = useSelector(selectData);
    console.log(data);
    console.log('hi');
    const dispatch = useDispatch();

    const [moeda, setMoeda] = useState("");
    const [value, setValue] = useState("");

 
    const handleClick = (moedaSigla: number) => {

        let moedaNome: string;

        switch (moedaSigla) {
            case 0: {
                moedaNome = "USD";
                setMoeda(moedaNome);                
                break;
            }
            case 1: {
                moedaNome = "GBP";
                setMoeda(moedaNome);
                break;
            }
            case 2:{
                moedaNome = "EUR";
                setMoeda(moedaNome);
                break;
            }
            default:{
                console.log("Entrada inválida");
            }
        }

        fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(res => res.json()).then(
            res => setValue(res.bpi[moedaNome].rate)
        )
    }


    return (
        <div>
            Preço do Bitcoin
            <div className={styles.row}>
                <button
                    className={styles.button}
                    aria-label="USD"
                    onClick={() => dispatch(fetchApi())}
                >
                    USD
                </button>
                <button
                    className={styles.button}
                    aria-label="GBP"
                    onClick={() => handleClick(1)}
                >
                    GBP
                </button>
                <button
                    className={styles.button}
                    aria-label="EUR"
                    onClick={() => handleClick(2)}
                >
                    EUR
                </button>
            </div>
        {data.usd} {moeda}
            
                {/**Inserir gráfico aqui */}
                <MyChart/>
            
        </div>
    );
}
