import React from "react";
import { useSelector } from "react-redux";
import { selectData } from "../store/reducer";
import { formatFullDate } from "../helpers/utils";

export function Content() {
  const data = useSelector(selectData);
  const ultimaAtualizacaoDate = formatFullDate(data.lastUpdate);

  return (
    <div>
      <div style={styles.rowBaseline}>
        <div style={styles.bigFont}>{data.value}</div>
        {data.moeda}
        {`↔️`}
        <div style={styles.bigFont}>1</div>BTC
      </div>
      <div style={styles.smallFont}>
        Última atualização: {ultimaAtualizacaoDate}
      </div>
    </div>
  );
}

const styles = {
  rowBaseline: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
  },
  smallFont: {
    fontSize: 16,
  },
  bigFont: {
    fontSize: 40,
  },
};
