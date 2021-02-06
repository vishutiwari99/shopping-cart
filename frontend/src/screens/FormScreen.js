import React, { useEffect, useState } from 'react'
import './FormScreen.css'
import Form from '../components/Form'
import { useSelector } from 'react-redux';

function FormScreen() {
    const error = useSelector(state => state.login.error);

    const [option, setOption] = useState(1);
    useEffect(() => {

    }, [])
    return (
        <div className="grid">
            <div className="container">
                <header>
                    <div
                        className={
                            "header-headings " +
                            (option === 1 ? "sign-in" : option === 2 ? "sign-up" : "forgot")
                        }
                    >{error && <span>{error}</span>}
                        <span>Sign in to your account</span>
                        <span>Create an account</span>
                        <span>Reset your password</span>
                    </div>
                </header>

                {/* Options */}
                <ul className="options">
                    <li className={option === 1 ? "active" : ""} onClick={() => setOption(1)}>
                        Sign in
				</li>
                    <li className={option === 2 ? "active" : ""} onClick={() => setOption(2)}>
                        Sign up
				</li>
                    <li className={option === 3 ? "active" : ""} onClick={() => setOption(3)}>
                        Forgot
				</li>
                </ul>
                <Form option={option} />

            </div>
        </div>
    )
}




export default FormScreen
