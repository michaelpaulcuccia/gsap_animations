import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/About.module.css";
import Slider from "../components/Slider";

export default function About() {
  const router = useRouter();
  const path = router.pathname;
  const cleanPath = path.substring(1);

  return (
    <div className={styles.wrapper}>
      <Slider path={cleanPath} />
      <div className={styles.content}>
        <h2>Hello! My name is Michael-Paul Cuccia</h2>
        <p>
          I am a Junior Frontend Engineer at {" "}
          <Link href="https://www.designory.com/">designory.</Link>
        </p>
        <p>
          this <strong>desktop</strong> application is built with Next.js
        </p>
        <p>also includes MongoDB, React Toastify</p>
        <p>animations by GreenSock (gsap)</p>
        <p>cookie, logo, and hamburger svgs were made</p>
        <p>using Figma</p>
      </div>
    </div>
  );
}
