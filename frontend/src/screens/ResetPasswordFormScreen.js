import './ResetPasswordFormScreen.css';
import ResetPasswordForm from '../components/ResetPasswordForm';

function ResetPasswordFormScreen({ match }) {

    return (
        <div className="grid">
            <div className="container">
                <header>
                    <div
                        className={
                            "header-headings " + "reset-password"
                        }
                    >
                        <span>Reset your password</span>
                    </div>
                </header>

                <ResetPasswordForm match={match} />

            </div>
        </div>
    )
}

export default ResetPasswordFormScreen
