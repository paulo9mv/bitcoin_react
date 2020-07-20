import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeCurrency,
  fetchApi,
  fetchGraphApi,
  selectData,
  selectGraphValues
} from '../store/reducer';
import {formatDate} from '../helpers/utils';
import styles from '../features/counter/Counter.module.css';

import MyChart from './Chart';

export function Button() {

    

    return (
        <div>
                <button
                    className={styles.button}
                    aria-label="USD"
                    onClick={() => {}}
                >
                    USD
                </button>
                </div>
    );
}
