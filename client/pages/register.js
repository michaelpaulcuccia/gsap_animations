import React from 'react';
import { useRouter } from 'next/router';
import Slider from '../components/Slider';
import RegComp from '../components/RegComp';

export default function testpage() {

  const router = useRouter();
  const path = router.pathname;
  const cleanPath = path.substring(1);


    return (
        <div>
            <Slider path={cleanPath}/>
            <RegComp />
        </div>
    )
}
