import React, { useState, useEffect } from 'react';
import MyChart from './Chart';
import styles from '../features/counter/Counter.module.css';

export function MainPage() {

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
                    onClick={() => handleClick(0)}
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
        {value} {moeda}
            
                {/**Inserir gráfico aqui */}
                <MyChart/>
            
        </div>
    );
}
