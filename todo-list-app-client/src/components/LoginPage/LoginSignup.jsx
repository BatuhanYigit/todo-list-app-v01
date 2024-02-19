import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css'
import user_icon from './assets/person.png';
import email_icon from './assets/email.png';
import password_icon from './assets/password.png';
import { notifications } from '@mantine/notifications';

import '@mantine/notifications/styles.css';

const apiUrl = import.meta.env.VITE_API_URL;

export const LoginSignup = () => {
    console.log("Env", apiUrl)
    const navigate = useNavigate();

    const [action, setAction] = useState("Login");
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        if (action == "Login") {
            setAction('Sign Up');
        } else {
            const userRegister = {
                name: name,
                lastname: lastname,
                email: email,
                password: password,

            }

            fetch(`${apiUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userRegister),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {

                        notifications.show({
                            color: "green",
                            title: 'Registered',
                            message: data.message,

                        })




                        setAction('Login');
                    } else {
                        notifications.show({
                            color: 'red',
                            title: 'Error',
                            message: data.message,

                        })

                        console.error(data.message);

                    }


                })
                .catch(error => {
                    notifications.show({
                        color: 'red',
                        title: 'Api Error',
                        message: 'Internal Server Error',

                    })
                    console.error("Error during login:", error)
                });
        }
    }

    const handleLogin = () => {
        if (action == "Sign Up" && !name) {
            setAction('Login');

        } else {


            const userData = {
                email: email,
                password: password,
            }



            fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {

                        notifications.show({
                            color: "green",
                            title: 'Welcome',
                            message: data.message,

                        })




                        localStorage.setItem("token", data.token)






                        setAction('Login');
                        navigate('/dashboard');
                    } else {
                        notifications.show({
                            color: 'red',
                            title: 'Error',
                            message: data.message,

                        })

                        console.error(data.message);

                    }


                })
                .catch(error => {
                    notifications.show({
                        color: 'red',
                        title: 'Api Error',
                        message: 'Internal Server Error',

                    })
                    console.error("Error during login:", error)
                });
        }
    };

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                {action === "Login" ? <div></div> : <div className='input'>
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} />
                </div>}
                {action === "Login" ? <div></div> : <div className='input'>
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} />
                </div>}

                <div className='input'>
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='input'>
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            {action === "Sign Up" ? <div></div> : <div className="forgot-password">Lost Password ? <span>Click Here!</span></div>}

            <div className="submit-container">
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => {
                    handleRegister();
                }}>Sign Up</div>
                <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => {
                    handleLogin();
                }}>Login</div>
            </div>


        </div >
    )
}

export default LoginSignup
