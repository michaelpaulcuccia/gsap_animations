import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';
import Slider from '../components/Slider';
import LoginComp from '../components/LoginComp';

export default function Login({allusers}) {
  const router = useRouter();
  const path = router.pathname;
  const cleanPath = path.substring(1);

  return (
    <div className={styles.wrapper}>
      <Slider path={cleanPath}/>
      <LoginComp allusers={allusers}/>
    </div>
  )
}

export async function getServerSideProps() {

  //'http://localhost:3000/api/allusers' //getStaticProps
  //process.env.NEXT_PUBLIC_FRONTEND_URL //getServerSideProps
  const res = await fetch(process.env.NEXT_PUBLIC_FRONTEND_URL);
  const allusers = await res.json();

  return {
    props: {
      allusers,
    },
    revalidate: 1,
  };
}