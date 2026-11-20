import { Link } from 'react-router-dom'
import './SignUp.css'

function SignUp() {
    return (
        <div className="signup-page">
            <div id="outerDiv">
                <div id="form">
                    <h1>Create An Account!</h1>
                    <div id="name">
                        <label className="required">
                            FirstName<span className="star">*</span> <br />
                            <input type="text" className="input1" required />
                        </label>
                        <label id="second">
                            LastName <br />
                            <input type="text" className="input1" />
                        </label>
                    </div>
                    <label className="required">
                        Email<span className="star">*</span>
                        <br /><input type="email" className="input" required />
                    </label>
                    <label>
                        PhoneNo.
                        <br />
                        <input type="number" className="input" />
                    </label>
                    <label className="required">
                        Password<span className="star">*</span>
                        <br />
                        <input type="password" className="input" required />
                    </label>
                    <label>
                        Confirm Password
                        <br />
                        <input type="password" className="input" />
                    </label>
                    <button id="signUp">SignUp</button>
                    <p id="html">
                        Have An Account <Link style={{ color: 'darkorange' }} to="/login">Login</Link>
                    </p>
                    <p id="textt">----- Or SignUp With -----</p>
                    <button id="Google">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"
                            style={{ display: 'block', margin: 'auto' }}>
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                        </svg>
                    </button>
                </div>
                <div id="image">
                    <img id="sidebar"
                        src="https://assets.awwwards.com/awards/element/2026/10/6abe2fc746bc3752051822.jpg"
                        alt="No Image" />
                </div>
            </div>
        </div>
    )
}

export default SignUp