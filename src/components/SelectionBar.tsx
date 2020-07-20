import React from "react";

import { Button } from "./Button";
import styles from "../features/counter/Counter.module.css";

export function SelectionBar() {
  return (
    <div>
      <div className={styles.row}>
        <div className={styles.cellContainer}>
          <Button nome={"USD"} />
        </div>
        <div className={styles.cellContainer}>
          <Button nome={"EUR"} />
        </div>
        <div className={styles.cellContainer}>
          <Button nome={"GBP"} />
        </div>
      </div>
    </div>
  );
}
