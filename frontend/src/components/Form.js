import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser, signupUser, forgetUserPassword } from '../redux/actions/loginActions'
import "./Form.css";
function Form({ option }) {
    const dispatch = useDispatch();
    let history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // const [error, setError] = useState("");
    // const [success, setSuccess] = useState("");

    const user = {
        email, password, confirmPassword
    }
    const login = useSelector(state => state.login.isLogin);

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            history.push("/");
        }
    }, [history, login]);

    // login completed
    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(loginUser(user));
    }
    // signup completed
    const signupHandler = async (e) => {
        e.preventDefault();
        dispatch(signupUser(user));
    };

    const forgetPasswordHandler = async (e) => {
        e.preventDefault();
        dispatch(forgetUserPassword(user));
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
                {/* {email, password} */}
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
            {/* {user} */}
            <button className="btn-submit-form" type="submit">
                {option === 1 ? "Sign in" : option === 2 ? "Sign up" : "Reset password"}
            </button>
        </form>
    );
}

export default Form;
