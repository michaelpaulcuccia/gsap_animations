import React, { useState, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import styles from "../styles/Slider.module.css";

export default function Slider({ path }) {
  //REMOVE CURRENT PAGE (path) FROM LINK OUTPUT
  const paths = ["home", "register", "login", "about"];
  const pathFilter = paths.filter((items) => items !== path);

  //STATE
  const [showLinkWindow, setShowLinkWindow] = useState(false);

  //REFS
  const linkWindow = useRef();
  const hamburger = useRef();

  //LINK WINDOW ANIMATION
  const tlOne = gsap.timeline({
    defaults: {
      duration: 1.5,
      ease: "power2.out",
    },
  });
  const tlTwo = gsap.timeline({
    defaults: {
      duration: 0.5,
    },
  });

  const handleMenuClick = () => {
    console.log("click");
    if (!showLinkWindow) {
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
          x: 0,
        },
        {
          x: -300,
        }
      );
      setShowLinkWindow(true);
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
          x: -400,
        },
        {
          x: 0,
        }
      );
      setShowLinkWindow(false);
    }
  };

  return (
    <div>
      <div>
        <div
          className={styles.hamburger}
          onClick={handleMenuClick}
          ref={hamburger}
        ></div>
        <div className={styles.logoContainer}></div>
        {/* LINK WINDOW OPACITY: 0 */}
        <div className={styles.linkWindow} ref={linkWindow}>
          {pathFilter.map((item, i) => (
            <Link passHref={`/${item}`} key={i}>
              <span className={styles.linkText}>{item.toUpperCase()}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
