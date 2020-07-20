import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchApi,
  fetchGraphApi,
  selectGraphValues,
  selectError,
  selectData,
} from "../store/reducer";
import { formatDate } from "../helpers/utils";
import MyChart from "./Chart";
import { SelectionBar } from "./SelectionBar";
import { Content } from "./Content";
import { ErrorMessage } from "./ErrorMessage";
import ReactLoading from 'react-loading';

export function MainPage() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const { lastUpdate } = useSelector(selectData);
  const graphValues: Array<number> = useSelector(selectGraphValues);

  useEffect(() => {
    const semanaEmMiliseconds: number = 7 * 24 * 60 * 60 * 1000;
    const dataAtual: number = new Date().getTime();

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
      {lastUpdate === 0 ?
      <ReactLoading type={'spinningBubbles'} color={'rgb(255,200,0)'} height={50} width={375} />
      : <div>
          <SelectionBar />
          <Content />
          {graphValues.length > 0 && <MyChart values={graphValues} />}
          {error && <ErrorMessage />}
        </div>
      }  
    </div>
  );
}
