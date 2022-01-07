import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { gsap } from "gsap";
import styles from '../styles/Slider.module.css';

export default function Slider() {

  //STATE
  const [showLinkWindow, setShowLinkWindow] = useState(false);

  //REFS
  const linkWindow = useRef();
  const hamburger = useRef();

  //LINK WINDOW ANIMATION
  const tlOne = gsap.timeline({
    defaults: {
      duration: 1.5,
      ease: "power2.out"
    },
  });
  const tlTwo = gsap.timeline({
    defaults: {
      duration: .5,
    },
  });

  const handleMenuClick = () => {
    console.log('click')
    if(!showLinkWindow) {
        tlOne.fromTo(
          linkWindow.current,
          {
            opacity: 0,
            x: 300,
          },
          {
            opacity: 1,
            x: 0,
          }
        );
        tlTwo.fromTo(
          hamburger.current,
          {
            x: 0
          },
          {
            x: -300
          }
        );
        setShowLinkWindow(true)
    } else {
      tlOne.fromTo(
        linkWindow.current,
        {
          opacity: 1,
          x: 0,
        },
        {
          opacity: 0,
          x: 250,
        }
      );
      tlTwo.fromTo(
        hamburger.current,
        {
          x: -400
        },
        {
          x: 0
        }
      );
      setShowLinkWindow(false);
    }
  }

    return (
        <div>
            <div>
            <div className={styles.hamburger} onClick={handleMenuClick} ref={hamburger}></div>
                <div className={styles.logoContainer}></div>
                {/* LINK WINDOW OPACITY: 0 */}
                <div className={styles.linkWindow} ref={linkWindow}>
                  <Link href='/home'>
                    <span className={styles.linkText}>Home</span>
                  </Link>
                  <Link href='/register'>
                    <span className={styles.linkText}>Register</span>
                  </Link>
                  <Link href='/login'>
                    <span className={styles.linkText}>Login</span>
                  </Link>              
                  <Link href='/about'>
                    <span className={styles.linkText}>About</span>
                  </Link>              
                </div>
            </div>
        </div>
    )
}
