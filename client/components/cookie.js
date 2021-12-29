import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import styles from "@/styles/Cookie.module.css";
import goldenOreo from "../public/images/goldenOreo.svg";
import { normalizeConfig } from "next/dist/server/config-shared";

export default function cookie() {
  const wrapper = useRef();
  const cookieContainer = useRef();
  const text = useRef();
  const button = useRef();

  const tlOne = gsap.timeline({
    defaults: {
      duration: 0.75,
      ease: "power1.out",
    },
  });

  useEffect(() => {
    //ENTRANCE ANIMATIONS
    tlOne.from(
      cookieContainer.current,
      {
        scale: 0,
      },
      {
        scale: 1,
      }
    );

    tlOne.fromTo(
      ".cookie",
      {
        opacity: 0,
        x: -50,
        rotation: "-45deg",
      },
      {
        opacity: 1,
        x: 0,
        rotation: "0deg",
      }
    );

    tlOne.fromTo(
      text.current,
      {
        x: 30,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
      },
      //syncs with previous animation
      "<"
    );
  }, []);

  const handleClick = () => {
    const tl = gsap.timeline({
      defaults: {
        duration: 0.75,
      },
    });

    tl.fromTo(
      ".cookie",
      {
        y: 0,
        rotation: "0deg",
      },
      {
        rotation: "-270deg",
        y: -3,
        yoyo: true,
        repeat: 2,
      }
    );

    tl.to(cookieContainer.current, {
      opacity: 0,
      y: 100,
      duration: 0.5,
    });

    tl.to(wrapper.current, {
      display: "none",
      duration: 0.5,
    });
  };

  return (
    <div className={styles.wrapper} ref={wrapper}>
      <div className={styles.cookiecontainer} ref={cookieContainer}>
        <Image src={goldenOreo} width={90} height={90} className="cookie" />

        <div className={styles.text} ref={text}>
          <h2 className={styles.cookietitle}>Cookie Policy</h2>

          <p className={styles.cookiesubtitle}>
            This Site Uses Cookies and Your Privacy Choice Is Important to Us
          </p>

          <p className={styles.legal}>
            We suggest you choose Customize My Settings to make your
            individualized choices. Accept All Cookies means that you are
            choosing to accept third-party Cookies and that you understand this
            choice.
          </p>

          <button
            className={styles.buttonClass}
            ref={button}
            onClick={handleClick}
          >
            Accept Cookies
          </button>
        </div>
      </div>
    </div>
  );
}
