import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';
import Slider from '../components/Slider';
import LoginComp from '../components/LoginComp';

export default function Login({allusers}) {

  console.log(allusers)

    const router = useRouter();
    const path = router.pathname;
    const cleanPath = path.substring(1);

    return (
        <div className={styles.wrapper}>
            <Slider path={cleanPath}/>
            <LoginComp />
        </div>
    )
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/allusers');
  const allusers = await res.json();

  return {
    props: {
      allusers,
    },
    revalidate: 1,
  };
}