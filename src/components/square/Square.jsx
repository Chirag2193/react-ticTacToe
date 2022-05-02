import React from 'react';
import styles from './square.module.scss';

export default function Square({ count, data, onClick }) {
    return (
        <div className={styles.square} onClick={() => onClick(count)}>
            {data[count]}
        </div>
    )
}