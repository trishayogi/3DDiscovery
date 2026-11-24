import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './login.css'

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '')

function Login() {
    const navigate = useNavigate()
    const location = useLocation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        setError('')
        setIsSubmitting(true)

        try {
            const response = await fetch(`${API_URL}/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim(), password }),
            })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Login failed.')
            }

            sessionStorage.setItem('token', data.token)
            if (data.user?.name) {
                sessionStorage.setItem('userName', data.user.name)
            }
            navigate('/', { replace: true })
        } catch (requestError) {
            setError(requestError.message || 'Could not connect to the server.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="login-page">
            <div id="outerDiv">
                <form id="form" onSubmit={handleSubmit}>
                    <h2>Hello Again!</h2>
                    {location.state?.message && <p role="status">{location.state.message}</p>}
                    <input type="email" placeholder="Email" id="text" value={email} onChange={(event) => setEmail(event.target.value)} required />
                    <div className="password-field">
                        <input type={showPassword ? 'text' : 'password'} placeholder="Password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                        <button className="password-toggle" type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword}>
                            {showPassword ? (
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8" /><path d="M9.9 5.2A10.8 10.8 0 0112 5c5 0 8.5 4.5 9.5 7-.4 1-1.3 2.2-2.5 3.3M6.2 6.2C3.9 7.6 2.8 9.6 2.5 12c.7 1.8 3.9 7 9.5 7 1.1 0 2.1-.2 3-.6" /></svg>
                            ) : (
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" /><circle cx="12" cy="12" r="2.5" /></svg>
                            )}
                        </button>
                    </div>
                    <span id="openModalBtn" className="forgot-link" onClick={() => navigate('/forgotpassword')}>Forgot Password</span>
                    {error && <p role="alert">{error}</p>}
                    <button id="loginn" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                    <p>----- Or continue With -----</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 48 48"
                        style={{ display: 'block', margin: 'auto' }}>
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                    </svg>
                </form>
                <div id="image">
                    <img id="sidebar"
                        src="https://assets.awwwards.com/awards/element/2026/10/6abe2fc752596717849364.jpg"
                        alt="No image" />
                </div>
            </div>
        </div>
    )
}

export default Login
