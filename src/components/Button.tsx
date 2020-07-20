import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeCurrency, fetchApi, selectData } from "../store/reducer";
import styles from "../features/counter/Counter.module.css";

export function Button(props) {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const nomeMoeda = props.nome;

  const handleClick = (currency: string) => {
    /* A API só é atualizada quando o minuto vira, então
        checamos para evitar fetchs desnecessários */

    if (new Date().getMinutes() - new Date(data.lastUpdate).getMinutes() === 0) {
      dispatch(changeCurrency(currency));
    } else {
      dispatch(fetchApi(currency));
    }
  };

  return (
    <div>
      <div className={styles.cellContainer}>
        <button
          className={styles.button}
          aria-label={nomeMoeda}
          onClick={() => {
            handleClick(nomeMoeda);
          }}
        >
          {nomeMoeda}
        </button>
      </div>
    </div>
  );
}
