import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeCurrency,
  fetchApi,
  fetchGraphApi,
  selectData,
  selectGraphValues,
} from "../store/reducer";
import { formatDate } from "../helpers/utils";
import MyChart from "./Chart";
import { SelectionBar } from "./SelectionBar";

export function MainPage() {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const graphValues = useSelector(selectGraphValues);

  useEffect(() => {
    const semanaEmMiliseconds = 7 * 24 * 60 * 60 * 1000;
    const dataAtual = new Date().getTime();

    dispatch(fetchApi("USD"));
    dispatch(
      fetchGraphApi(
        formatDate(dataAtual - semanaEmMiliseconds),
        formatDate(dataAtual)
      )
    );
  }, []);

  return (
    <div>
      <SelectionBar />
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: 40 }}>{data.value}</div>
        {data.moeda}
        {`↔️`}
        <div style={{ fontSize: 40 }}>1</div>BTC
      </div>

      {graphValues.length > 0 && <MyChart values={graphValues} />}
    </div>
  );
}
