import React from 'react';
import styles from '../styles/About.module.css';
import Slider from '../components/Slider';

export default function about() {
    return (
        <div className={styles.wrapper}>
            <Slider />
        </div>
    )
}