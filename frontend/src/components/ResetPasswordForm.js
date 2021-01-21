import { useState } from 'react';
import axios from "axios";
import './ResetPasswordForm.css';
import { useHistory } from 'react-router-dom';


function ResetPasswordForm({ match }) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    let history = useHistory();

    console.log(match)

    const resetPasswordHandler = async (e) => {
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
            return setError("Passwords don't match");
        }

        try {
            const {
                data
            } = await axios.put(
                `/api/auth/resetPassword/${match.params.resetToken}`, {
                password,
            },
                config
            );

            console.log(data);
            setSuccess(data.data);
            history.push("/");
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };


    return (
        <form className="account-form" onSubmit={resetPasswordHandler} >
            <div
                className={
                    "account-form-fields    reset-password"
                }
            >
                {error && <span className="error-message">{error}</span>}
                {error ? <span className="error-message">{error}</span> : <span className="error-message">{success}</span>}
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    id="repeat-password"
                    name="repeat-password"
                    type="password"
                    placeholder="Repeat password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <button className="btn-submit-form" type="submit">
                Reset Password
            </button>
        </form>
    )
}

export default ResetPasswordForm
