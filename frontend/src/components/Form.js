import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Form.css";
function Form({ option }) {
    let history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const []

    const [user, setUser] = useState({
        email, password, confirmPassword
    })

    setUser

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            history.push("/");
        }
    }, [history]);

    // login completed
    const loginHandler = async (e) => {
        e.preventDefault();
        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            const { data } = await axios.post(
                "/api/auth/login",
                { email, password },
                config
            );

            localStorage.setItem("authToken", data.token);
            history.push("/");
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    // login completed

    const signupHandler = async (e) => {
        e.preventDefault();
        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };
        if (password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Password do not match");
        }

        try {
            const { data } = await axios.post(
                "/api/auth/register",
                { email, password, confirmPassword },
                config
            );
            localStorage.setItem("authToken", data.token);
            history.push("/");
            alert("Registered");
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    const forgetPasswordHandler = async (e) => {
        e.preventDefault();
        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            const { data } = await axios.post(
                "/api/auth/forgotpassword",
                {
                    email,
                },
                config
            );

            setSuccess(data.data);
        } catch (error) {
            setError(error.response.data.error);
            setEmail("");
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };
    return (
        <form
            className="account-form"
            onSubmit={
                option === 1
                    ? loginHandler
                    : option === 2
                        ? signupHandler
                        : forgetPasswordHandler
            }
        >
            <div
                className={
                    "account-form-fields " +
                    (option === 1 ? "sign-in" : option === 2 ? "sign-up" : "forgot")
                }
            >
                {error && <span className="error-message">{error}</span>}
                {success && <span className="success-message">{success}</span>}
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    required={option === 1 || option === 2 ? true : false}
                    disabled={option === 3 ? true : false}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    id="repeat-password"
                    name="repeat-password"
                    type="password"
                    placeholder="Repeat password"
                    required={option === 2 ? true : false}
                    disabled={option === 1 || option === 3 ? true : false}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <button className="btn-submit-form" type="submit">
                {option === 1 ? "Sign in" : option === 2 ? "Sign up" : "Reset password"}
            </button>
        </form>
    );
}

export default Form;
