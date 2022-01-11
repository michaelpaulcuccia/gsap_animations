import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';
import Slider from '../components/Slider';
import LoginComp from '../components/LoginComp';
import dbConnect from '../utils/dbConnect';
import User from '../models/User';

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

export async function getStaticProps() {

  await dbConnect();  
  const res = await User.find({});

  //deals with nonsense 
  let allusers =[]
  res.forEach(item => {
    let obj = {}
    obj.username = item.username
    obj.password = item.password
    obj.email = item.email
    allusers.push(obj)
  })
  
  return {
    props: {
      allusers,
    },
    revalidate: 1,
  };
}