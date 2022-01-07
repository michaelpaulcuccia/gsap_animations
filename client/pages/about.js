import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/About.module.css';
import Slider from '../components/Slider';

export default function about() {

    const router = useRouter();
    const path = router.pathname;
    const cleanPath = path.substring(1);

    return (
        <div className={styles.wrapper}>
            <Slider path={cleanPath} />
        </div>
    )
}