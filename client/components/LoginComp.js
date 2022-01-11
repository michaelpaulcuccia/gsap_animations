import React, { useState, useRef, useContext } from 'react';
import Link from 'next/link';
import { gsap } from "gsap";
import AuthContext from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "../styles/LoginComp.module.css";

export default function LoginComp({ allusers }) {

    const [nameState, setNameState] = useState(false);
    const [passwordState, setPasswordState] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
   
    //REFS
    const lineName = useRef();
    const linePassword = useRef();
    const placeholderName = useRef();
    const placeholderPassword = useRef();
    const contactLeft = useRef();
    const contactRight = useRef();
    const form = useRef();

    //ANIMATION TIMELINES
    const tlOne = gsap.timeline({ defaults: { duration: 1} });

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
        }  else if (val === 'Password') {
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

    //AUTH CONTEXT
    const { login } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        //Field Validations
        if (username === '' || password === ''){  
            //Clear State
            setUsername('');
            setPassword(''); 
            toast.error('Please complete form')
            return;
        } else {
            //check if user exists
            const userExists = allusers.filter(user => user.username === username);
            if(userExists.length > 0) {
                //Create User Object
                const user = {username, password}
                //Pass Oject to Auth
                login(user);
                //Clear State
                setUsername('');
                setPassword('');
            } else {
                toast.error('User does not exist')
            }
        }
        
    }
            
    return (
        <div className={styles.wrapper}>
             <ToastContainer />
            <form 
                className={styles.form}
                ref={form}
            >
      
                <div 
                    className={styles.contactLeft}
                    ref={contactLeft}
                >
                    <h1 className={styles.title}>Log In</h1>
                    <div
                        className={styles.wu}
                    ></div>
                    <p className={styles.description}>
                        Welcome Back!
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
           
                <button 
                    className={styles.button}
                    onClick={handleSubmit}
                >
                    Login
                </button>
                <p>Not a member? <Link href='/register'>Sign up!</Link></p>
            </div>

        </form>
    </div>
)
}
