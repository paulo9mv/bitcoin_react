import React from "react";
import { arrayOfDates } from "../helpers/utils";
import { Chart } from "react-charts";

export default function MyChart(props) {
  const values = props.values;
  const labels = arrayOfDates(new Date().getTime(), 7);

  const series = React.useMemo(
    () => ({
      type: "line",
    }),
    [values]
  );
  const axes = React.useMemo(
    () => [
      { primary: true, position: "bottom", type: "ordinal" },
      { position: "right", type: "linear", stacked: false },
    ],
    [values]
  );
  const data = React.useMemo(
    () => [
      {
        label: "Series 1",
        datums: values.map((item, index) => {
          return {
            x: labels[index],
            y: item,
          };
        }),
      },
    ],
    [values]
  );

  return (    
    <div
      style={{
        width: "400px",
        height: "300px",
      }}
    >
      <Chart data={data} series={series} axes={axes} />
    </div>
  );
}
