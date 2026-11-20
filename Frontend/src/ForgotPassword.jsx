import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ForgotPassword.css'

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '')

function ForgotPassword() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        setMessage('')
        setError('')
        setIsSubmitting(true)

        try {
            const response = await fetch(`${API_URL}/api/users/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim() }),
            })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Could not send reset email.')
            }

            setMessage(data.message)
        } catch (requestError) {
            setError(requestError.message || 'Could not connect to the server.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="forgot-page">
            <div id="OuterCard">
                <div>
                    <h1>Forgot Password</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Enter your registered email to receive a password reset link
                            <br />
                            <input
                                className="input-field"
                                type="email"
                                id="Email"
                                placeholder="Email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </label>
                        {message && <p role="status">{message}</p>}
                        {error && <p role="alert">{error}</p>}
                        <button className="submit" id="send" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send Link'}
                        </button>
                    </form>
                    <button className="submit" id="Login" type="button" onClick={() => navigate('/login')}>
                        Back To Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
