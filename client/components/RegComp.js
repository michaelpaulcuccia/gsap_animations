import React, { useState, useRef, useContext } from "react";
import { useRouter } from "next/router";
import { gsap } from "gsap";
import AuthContext from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/RegComp.module.css";

export default function RegComp() {
  const [nameState, setNameState] = useState(false);
  const [emailState, setEmailState] = useState(false);
  const [passwordState, setPasswordState] = useState(false);
  const [checkboxClicked, setCheckboxClicked] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sendPromotions, setSendPromotions] = useState(false);

  const router = useRouter();

  //REFS
  const lineName = useRef();
  const lineEmail = useRef();
  const linePassword = useRef();
  const placeholderName = useRef();
  const placeholderEmail = useRef();
  const placeholderPassword = useRef();
  const checkboxFill = useRef();
  const checkboxLabel = useRef();
  const contactLeft = useRef();
  const contactRight = useRef();
  const form = useRef();
  const submitted = useRef();

  //ANIMATION TIMELINES
  const tlOne = gsap.timeline({ defaults: { duration: 1 } });
  const tlTwo = gsap.timeline({
    defaults: { duration: 0.5, ease: "Power2.eastOut" },
  });
  const tlThree = gsap.timeline({
    defaults: { duration: 0.75, ease: "Power2.easeOut" },
  });

  //LINE ANIMATION
  const start =
    "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";
  const end =
    "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";

  //INPUT FOCUS
  //NOTE: GSAP will NOT accept ref template strings ex: ${`val`.current} so function needs to be repetitive
  const handleFocus = (val) => {
    if (val === "Name") {
      //if already active, revert text position
      if (nameState) {
        gsap.to(placeholderName.current, {
          top: 0,
          left: 0,
          scale: 1,
          duration: 0.5,
          ease: "Power2.easeout",
        });
        //set State back
        setNameState(false);
      } else {
        tlOne.fromTo(
          lineName.current,
          //https://greensock.com/docs/v3/GSAP/CorePlugins/AttrPlugin
          { attr: { d: start } },
          { attr: { d: end }, ease: "Power2.easeOut", duration: 0.75 }
        );
        tlOne.to(
          lineName.current,
          //'<50%' means run halfway through previous animation
          { attr: { d: start }, ease: "elastic.out(3, .5)" },
          "<50%"
        );
        //placeholder shift
        //'<15%' means run fifteen percent through previous animation
        tlOne.to(
          placeholderName.current,
          {
            top: -15,
            left: 0,
            scale: 0.7,
            duration: 0.5,
            ease: "Power2.easeOut",
          },
          "<15%"
        );
        //update State
        setNameState(true);
      }
    } else if (val === "Email") {
      if (emailState) {
        gsap.to(placeholderEmail.current, {
          top: 0,
          left: 0,
          scale: 1,
          duration: 0.5,
          ease: "Power2.easeout",
        });
        setEmailState(false);
      } else {
        tlOne.fromTo(
          lineEmail.current,
          { attr: { d: start } },
          { attr: { d: end }, ease: "Power2.easeOut", duration: 0.75 }
        );
        tlOne.to(
          lineEmail.current,
          { attr: { d: start }, ease: "elastic.out(3, .5)" },
          "<50%"
        );
        tlOne.to(
          placeholderEmail.current,
          {
            top: -15,
            left: 0,
            scale: 0.7,
            duration: 0.5,
            ease: "Power2.easeOut",
          },
          "<15%"
        );
        setEmailState(true);
      }
    } else if (val === "Password") {
      if (passwordState) {
        gsap.to(placeholderPassword.current, {
          top: 0,
          left: 0,
          scale: 1,
          duration: 0.5,
          ease: "Power2.easeout",
        });
        setPasswordState(false);
      } else {
        tlOne.fromTo(
          linePassword.current,
          { attr: { d: start } },
          { attr: { d: end }, ease: "Power2.easeOut", duration: 0.75 }
        );
        tlOne.to(
          linePassword.current,
          { attr: { d: start }, ease: "elastic.out(3, .5)" },
          "<50%"
        );
        tlOne.to(
          placeholderPassword.current,
          {
            top: -15,
            left: 0,
            scale: 0.7,
            duration: 0.5,
            ease: "Power2.easeOut",
          },
          "<15%"
        );
        setPasswordState(true);
      }
    }
  };

  const handleCheckboxClick = () => {
    if (!checkboxClicked) {
      tlTwo.to(checkboxFill.current, { top: "0%" });
      tlTwo.to(checkboxLabel.current, { color: "#007AB3" });
      setCheckboxClicked(true);
      setSendPromotions(true);
    } else {
      tlTwo.to(checkboxFill.current, { top: "100%" });
      tlTwo.to(checkboxLabel.current, { color: "#777474" });
      setCheckboxClicked(false);
    }
  };

  //AUTH CONTEXT
  const { register } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //Field Validations
    if (username === "" || email === "" || password === "") {
      toast.error("Please complete form");
      return;
    } else {
      //Pass form fields to Auth
      const user = { username, email, password, sendPromotions };
      register(user);
      //Clear State
      setUsername("");
      setEmail("");
      setPassword("");
      setSendPromotions(false);
      //FORM ANIMATIONS
      tlThree.to([contactLeft.current, contactRight.current], {
        y: 30,
        opacity: 0,
        pointerEvents: "none",
      });
      tlThree.to(form.current, { scale: 0.8 }, "<");
      tlThree.fromTo(
        submitted.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0 }
      );
      setTimeout(() => {
        router.push("/login");
      }, 2500);
    }
  };

  return (
    <div className={styles.wrapper}>
      <ToastContainer />
      <form className={styles.form} ref={form}>
        <div className={styles.contactLeft} ref={contactLeft}>
          <h1 className={styles.title}>Register</h1>
          <div className={styles.wu}></div>
          <p className={styles.description}>
            Sign up!<br></br>
            and let's stay<br></br>
            in touch
          </p>
        </div>

        <div className={styles.contactRight} ref={contactRight}>
          <div className={styles.inputContainer}>
            <p className={styles.placeholder} ref={placeholderName}>
              Your Name
            </p>
            <input
              type="text"
              name="Name"
              autoComplete="off"
              className={styles.input}
              minLength="5"
              onFocus={(e) => handleFocus(e.target.name)}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
            <svg
              className={styles.lineSvg}
              width="300"
              height="2"
              viewBox="0 0 300 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className={styles.elasticLine}
                d="M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512"
                stroke="#D1D4DA"
                strokeWidth="2"
                ref={lineName}
              />
            </svg>
          </div>

          <div className={styles.inputContainer}>
            <p className={styles.placeholder} ref={placeholderEmail}>
              Your Email
            </p>
            <input
              type="email"
              name="Email"
              autoComplete="off"
              className={styles.input}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              onFocus={(e) => handleFocus(e.target.name)}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <svg
              className={styles.lineSvg}
              width="300"
              height="2"
              viewBox="0 0 300 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className={styles.elasticLine}
                d="M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512"
                stroke="#D1D4DA"
                strokeWidth="2"
                ref={lineEmail}
              />
            </svg>
          </div>

          <div className={styles.inputContainer}>
            <p className={styles.placeholder} ref={placeholderPassword}>
              Your Password
            </p>
            <input
              type="text"
              name="Password"
              autoComplete="off"
              className={styles.input}
              minLength="5"
              onFocus={(e) => handleFocus(e.target.name)}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <svg
              className={styles.lineSvg}
              width="300"
              height="2"
              viewBox="0 0 300 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className={styles.elasticLine}
                d="M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512"
                stroke="#D1D4DA"
                strokeWidth="2"
                ref={linePassword}
              />
            </svg>
          </div>

          <div className={styles.promoContainer}>
            <div className={styles.checkboxContainer}>
              <span className={styles.checkmark}></span>
              <div className={styles.checkboxFill} ref={checkboxFill}></div>
              <input
                type="checkbox"
                className={styles.checkbox}
                onClick={handleCheckboxClick}
              />
              <svg
                width="19"
                height="16"
                viewBox="0 0 19 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.tickMark}
              >
                <path
                  className={styles.elasticLine}
                  d="M2 8.5L6.5 13L17.5 2"
                  stroke="white"
                  strokeWidth="4"
                />
              </svg>
            </div>
            <label className={styles.checkboxLabel} ref={checkboxLabel}>
              Send me promotions and offers.
            </label>
          </div>

          <button className={styles.button} onClick={handleSubmit}>
            Register
          </button>
        </div>

        <div className={styles.submitted} ref={submitted}>
          <p className={styles.thanks}>Thanks for registering!</p>
        </div>
      </form>
    </div>
  );
}
