import React, { useEffect, useState, useRef } from 'react';
import { gsap } from "gsap";
import styles from "../styles/RegComp.module.css";

export default function RegComp() {

    const [nameState, setNameState] = useState(false);
    const [emailState, setEmailState] = useState(false);
    const [passwordState, setPasswordState] = useState(false);
    const [checkboxClicked, setCheckboxClicked] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [sendPromotions, setSendPromotions] = useState(false);

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
    const tlOne = gsap.timeline({ defaults: { duration: 1} });
    const tlTwo = gsap.timeline({defaults: { duration: .5, ease: 'Power2.eastOut'} });
    const tlThree = gsap.timeline({defaults: {duration: .75, ease: 'Power2.easeOut'}});

    //LINE ANIMATION
    const start = "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";
    const end = 'M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512';

    //INPUT FOCUS 
    //NOTE: GSAP will NOT accept ref template strings ex: ${`val`.current} so function needs to be repetitive
    const handleFocus = (val) => {
        if (val === 'Name') {
            //if already active, revert text position
            if (nameState) {
                gsap.to(placeholderName.current, 
                    {top: 0, left: 0, scale: 1, duration: .5, ease: "Power2.easeout"}
                );
                //set State back
                setNameState(false);
            } else {
                tlOne.fromTo(lineName.current, 
                    //https://greensock.com/docs/v3/GSAP/CorePlugins/AttrPlugin
                    {attr: {d: start}},
                    {attr: {d: end}, ease: 'Power2.easeOut', duration: .75},
                );
                tlOne.to(lineName.current, 
                    //'<50%' means run halfway through previous animation
                    {attr: {d: start}, ease: 'elastic.out(3, .5)'}, '<50%'
                );
                 //placeholder shift
                //'<15%' means run fifteen percent through previous animation
                tlOne.to(placeholderName.current, 
                    {top: -15, left: 0, scale: .7, duration: .5, ease: 'Power2.easeOut'}, "<15%"
                );
                //update State
                setNameState(true);
            }
        } else if (val === 'Email') {
            if (emailState) {
                gsap.to(placeholderEmail.current, 
                    {top: 0, left: 0, scale: 1, duration: .5, ease: "Power2.easeout"}
                );
                setEmailState(false);
            } else {
                tlOne.fromTo(lineEmail.current, 
                    {attr: {d: start}},
                    {attr: {d: end}, ease: 'Power2.easeOut', duration: .75},
                );
                tlOne.to(lineEmail.current, 
                    {attr: {d: start}, ease: 'elastic.out(3, .5)'}, '<50%'
                );
                tlOne.to(placeholderEmail.current, 
                    {top: -15, left: 0, scale: .7, duration: .5, ease: 'Power2.easeOut'}, "<15%"
                );
                setEmailState(true);
            }
        } else if (val === 'Password') {
            if (passwordState) {
                gsap.to(placeholderPassword.current, 
                    {top: 0, left: 0, scale: 1, duration: .5, ease: "Power2.easeout"}
                );
                setPasswordState(false);
            } else {
                tlOne.fromTo(linePassword.current, 
                    {attr: {d: start}},
                    {attr: {d: end}, ease: 'Power2.easeOut', duration: .75},
                );
                tlOne.to(linePassword.current, 
                    {attr: {d: start}, ease: 'elastic.out(3, .5)'}, '<50%'
                );
                tlOne.to(placeholderPassword.current, 
                    {top: -15, left: 0, scale: .7, duration: .5, ease: 'Power2.easeOut'}, "<15%"
                );
                setPasswordState(true)
            }
        }     
    }

    const handleCheckboxClick = () => {
        if(!checkboxClicked) {
            tlTwo.to(checkboxFill.current, 
                {top: "0%"}
            );
            tlTwo.to(checkboxLabel.current, 
                {color: '#6391e8'}
            );
            setCheckboxClicked(true);
            setSendPromotions(true);
        } else {
            tlTwo.to(checkboxFill.current, 
                {top: "100%"}
            );
            tlTwo.to(checkboxLabel.current, 
                {color: '#777474'}
            );
            setCheckboxClicked(false)
        }         
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //Create User Object 
        const newRegisteredUser = {username, email, password, sendPromotions};
        console.log(newRegisteredUser)
        //Clear State
        setUsername('');
        setEmail('');
        setPassword('');
        setSendPromotions(false);
        //FORM ANIMATIONS
        tlThree.to([contactLeft.current, contactRight.current], 
            {y: 30, opacity: 0, pointerEvents: 'none'}
        );
        tlThree.to(form.current, 
            {scale: .8}, '<'
        );
        tlThree.fromTo(submitted.current,
            {opacity: 0, y: 30},
            {opacity: 1, y:0}
        );
        //CHARACTER ANIMATIONS
        gsap.fromTo('#arm', 
            {rotation: 0, y:0},
            {rotation: -35, y:2, ease: "elastic(3, .3)", duration: 2, delay: 1}
        );
    }

    useEffect(() => {
        gsap.set('.eyes', 
            {transformOrigin: 'center'}
        );
        gsap.fromTo('.eyes', 
            {scaleY: 1},
            {scaleY: .1, repeat: -1, yoyo: true, repeatDelay: 1.5, ease: "Power2.easeOut"}
        );
    })
    
    return (
        <div className={styles.wrapper}>
        
            <form 
                className={styles.form}
                ref={form}
            >
      
                <div 
                    className={styles.contactLeft}
                    ref={contactLeft}
                >
                    <h1 className={styles.title}>Register</h1>
                    <p className={styles.description}>
                        Sign up!<br></br>
                        And let's stay <br></br>
                        in touch
                    </p>
                </div>

     
                <div 
                    className={styles.contactRight}
                    ref={contactRight}
                >
                    <div className={styles.inputContainer}>
                        <p 
                            className={styles.placeholder}
                            ref={placeholderName}
                        >
                            Your Name
                        </p>
                        <input
                            type="text"
                            name="Name"
                            autoComplete="off"
                            className={styles.input}
                            minLength='5'
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
                    <p 
                        className={styles.placeholder}
                        ref={placeholderEmail}
                    >
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
                    <p 
                        className={styles.placeholder}
                        ref={placeholderPassword}
                    >
                        Your Password
                    </p>
                    <input
                        type="text"
                        name="Password"
                        autoComplete="off"
                        className={styles.input}
                        minLength='5'
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
                    <label 
                        className={styles.checkboxLabel}
                        ref={checkboxLabel}
                    >
                        Send me promotions and offers.
                    </label>
                </div>
        
                <button 
                    className={styles.button}
                    onClick={handleSubmit}
                >
                    Register
                </button>
            </div>

            <svg 
                width="305" 
                height="419" 
                viewBox="0 0 305 419" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                id="character"
                className={styles.character}
                >
                <g id="imagebot_2">
                <path id="imagebot_43" d="M59.0941 290.603C59.6595 292.277 57.4273 355.837 57.4273 355.837L89.7652 358.069L93.1135 287.262L59.0941 290.603Z" fill="#EFA512"/>
                <path id="imagebot_42" d="M161.123 292.277C163.355 291.727 193.468 292.843 193.468 292.843L190.678 365.317L160.572 366.433L161.123 292.277Z" fill="#EFA512"/>
                <path id="imagebot_41" d="M57.9853 343.575L55.7531 369.216L0.562012 397.097C0.562012 397.097 91.2242 399.322 90.3211 398.205C89.4105 397.097 90.8791 342.451 90.8791 342.451L57.9831 343.575H57.9853Z" fill="black"/>
                <path id="imagebot_40" d="M192.353 348.017L160.57 350.244L160.003 396.521L233.609 395.975L190.672 365.306L192.353 348.017Z" fill="black"/>
                <path id="imagebot_39" d="M55.6503 146.581C55.6503 149.62 49.3575 315.407 49.3575 315.407C49.3575 315.407 195.488 328.815 195.003 325.768C194.518 322.721 196.457 142.307 196.457 142.307L55.6503 146.581V146.581Z" fill="#003F7F"/>
                <path id="imagebot_38" d="M56.3151 136.714L58.5418 287.246L26.2087 285.565L34.5713 135.054L56.3151 136.714Z" fill="#7F7F7F"/>
                <path id="imagebot_37" d="M167.804 142.992C169.239 144.132 187.675 229.383 189.032 228.538C190.389 227.693 212.002 221.876 212.002 221.876L189.177 110.782L167.804 142.992Z" fill="#7F7F7F"/>
                <path id="imagebot_36" d="M118.948 182.56C173.554 182.56 217.821 141.72 217.821 91.3399C217.821 40.9602 173.554 0.119446 118.948 0.119446C64.3418 0.119446 20.0748 40.9602 20.0748 91.3399C20.0748 141.72 64.3418 182.56 118.948 182.56Z" fill="#FDD89A"/>
                <path id="imagebot_35" d="M17.9618 121.209C27.0447 121.209 34.4078 113.595 34.4078 104.202C34.4078 94.8094 27.0447 87.1951 17.9618 87.1951C8.87899 87.1951 1.5159 94.8094 1.5159 104.202C1.5159 113.595 8.87899 121.209 17.9618 121.209Z" fill="#FDD89A"/>
                <path id="imagebot_34" d="M214.286 110.604C225.987 110.604 235.473 102.492 235.473 92.4857C235.473 82.4794 225.987 74.3676 214.286 74.3676C202.585 74.3676 193.099 82.4794 193.099 92.4857C193.099 102.492 202.585 110.604 214.286 110.604Z" fill="#FDD89A" stroke="#FDD89A" strokeWidth="2.8608"/>
                <path id="imagebot_33" className='eyes' d="M94.4262 122.487C101.971 122.487 108.087 117.373 108.087 111.064C108.087 104.755 101.971 99.6404 94.4262 99.6404C86.8818 99.6404 80.7657 104.755 80.7657 111.064C80.7657 117.373 86.8818 122.487 94.4262 122.487Z" fill="black"/>
                <path id="imagebot_32" className='eyes' d="M149.671 122.397C157.369 122.397 163.609 116.533 163.609 109.3C163.609 102.066 157.369 96.2021 149.671 96.2021C141.974 96.2021 135.734 102.066 135.734 109.3C135.734 116.533 141.974 122.397 149.671 122.397Z" fill="black"/>
                <path id="imagebot_29" d="M121.61 146.652L123.656 147.826C128.087 150.371 135.158 154.391 136.485 155.031L132.793 158.713C131.29 157.997 124.992 154.417 121.615 152.475L108.278 160.89L104.175 157.648L121.61 146.652Z" fill="black"/>
                <path id="imagebot_22" d="M17.7175 74.8482L70.6815 73.7394L93.5398 43.6264L87.9665 74.2975C87.9665 74.2975 182.741 49.2069 222.884 59.8027C263.028 70.3984 201.142 -8.21419 106.926 0.707378C106.918 0.700035 36.6694 7.38937 17.7175 74.8482V74.8482Z" fill="black"/>
                <g id="imagebot_18">
                <path id="imagebot_19" d="M118.15 200.822L122.567 200.881L121.784 265.369L117.367 265.31L118.15 200.822Z" fill="#6A472A"/>
                </g>
                <path id="imagebot_17" d="M25.6474 277.783C25.6474 277.783 13.3826 299.532 26.7635 302.873C40.1444 306.214 30.6626 323.499 45.1574 308.446C45.1574 308.446 59.1014 317.779 59.1014 293.393C59.1014 291.719 56.3185 273.318 56.3185 273.318L25.6474 277.783V277.783Z" fill="#FDD89A"/>
                <path id="imagebot_60" d="M236.839 399.486C236.969 401.95 234.23 404.394 228.78 406.677C223.33 408.96 215.277 411.037 205.086 412.787C194.896 414.537 182.769 415.926 169.407 416.874C156.044 417.822 141.711 418.311 127.234 418.311C112.757 418.311 98.4235 417.822 85.0611 416.874C71.6987 415.926 59.572 414.537 49.3814 412.787C39.1908 411.037 31.138 408.96 25.6882 406.677C20.2383 404.394 17.4994 401.95 17.6294 399.486C17.4994 397.022 20.2383 394.578 25.6882 392.295C31.138 390.013 39.1908 387.936 49.3814 386.186C59.572 384.436 71.6987 383.046 85.0611 382.098C98.4235 381.15 112.757 380.662 127.234 380.662C141.711 380.662 156.044 381.15 169.407 382.098C182.769 383.046 194.896 384.436 205.086 386.186C215.277 387.936 223.33 390.013 228.78 392.295C234.23 394.578 236.969 397.022 236.839 399.486V399.486Z" fill="black" fillOpacity="0.39216"/>
                <path id="imagebot_56" d="M146.674 155.175C155.901 138.493 135.682 144.917 125.213 143.832C111.136 142.376 102.455 137.32 98.2964 148.598C95.5214 156.106 100.562 167.351 116.443 168.508C131.855 169.625 142.162 163.33 146.674 155.175V155.175Z" fill="black"/>
                <g id="arm">
                <path id="imagebot_66" d="M191.06 230.394C192.663 230.101 249.363 261.429 249.894 260.2C250.426 258.971 262.805 243.21 262.805 243.21L189.77 201.677L191.06 230.394Z" fill="#7F7F7F"/>
                <path id="imagebot_16" d="M247.807 269.716C247.807 269.716 278.701 298.249 278.94 282.471C279.179 266.692 307.838 282.41 290.784 261.56C290.784 261.56 304.409 256.47 288.207 249.077L251.315 246.951L247.807 269.716Z" fill="#FDD89A"/>
                </g>
                </g>
            </svg>

            <div 
                className={styles.submitted}
                ref={submitted}
            >
                <p>Thanks for registering!</p>
                <p>You'll hear from us soon!</p>
            </div>

        </form>
    </div>
)
}
