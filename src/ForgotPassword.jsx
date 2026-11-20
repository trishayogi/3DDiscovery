import { useNavigate } from 'react-router-dom'
import './ForgotPassword.css'

function ForgotPassword() {
    const navigate = useNavigate()

    return (
        <div className="forgot-page">
            <div id="OuterCard">
                <div>
                    <h1>Forget Password</h1>
                    <label>
                        Enter your Registered Email and send link to Forget password
                        <br />
                        <input className="input-field" type="text" id="Email" placeholder="Email" />
                    </label>
                    <button className="submit" id="send" onClick={() => navigate('/resetpassword')}>
                        Send Link
                    </button>
                    <button className="submit" id="Login" onClick={() => navigate('/login')}>
                        Back To Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword