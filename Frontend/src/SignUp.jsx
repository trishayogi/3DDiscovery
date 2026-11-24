import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './signUp.css'

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '')

function SignUp() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    })
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    function handleChange(event) {
        const { name, value } = event.target
        setFormData((current) => ({ ...current, [name]: value }))
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setError('')

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.')
            return
        }

        setIsSubmitting(true)
        try {
            const response = await fetch(`${API_URL}/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: [formData.firstName.trim(), formData.lastName.trim()].filter(Boolean).join(' '),
                    email: formData.email.trim(),
                    phone: formData.phone.trim(),
                    password: formData.password,
                }),
            })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed.')
            }

            navigate('/login', { state: { message: data.message } })
        } catch (requestError) {
            setError(requestError.message || 'Could not connect to the server.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="signup-page">
            <div id="outerDiv">
                <form id="form" onSubmit={handleSubmit}>
                    <h1>Create An Account!</h1>
                    <div id="name">
                        <label className="required">
                            FirstName<span className="star">*</span> <br />
                            <input type="text" className="input1" name="firstName" value={formData.firstName} onChange={handleChange} required />
                        </label>
                        <label id="second">
                            LastName <br />
                            <input type="text" className="input1" name="lastName" value={formData.lastName} onChange={handleChange} />
                        </label>
                    </div>
                    <label className="required">
                        Email<span className="star">*</span>
                        <br /><input type="email" className="input" name="email" value={formData.email} onChange={handleChange} required />
                    </label>
                    <label>
                        PhoneNo.
                        <br />
                        <input type="tel" className="input" name="phone" value={formData.phone} onChange={handleChange} />
                    </label>
                    <label className="required">
                        Password<span className="star">*</span>
                        <br /><div className="signup-password-field">
                            <input type={showPassword ? 'text' : 'password'} className="input" name="password" value={formData.password} onChange={handleChange} required />
                            <button className="password-toggle" type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword}>
                                {showPassword ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8" /><path d="M9.9 5.2A10.8 10.8 0 0112 5c5 0 8.5 4.5 9.5 7-.4 1-1.3 2.2-2.5 3.3M6.2 6.2C3.9 7.6 2.8 9.6 2.5 12c.7 1.8 3.9 7 9.5 7 1.1 0 2.1-.2 3-.6" /></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" /><circle cx="12" cy="12" r="2.5" /></svg>}
                            </button>
                        </div>
                    </label>
                    <label className="required">
                        Confirm Password<span className="star">*</span>
                        <br />
                        <div className="signup-password-field">
                            <input type={showConfirmPassword ? 'text' : 'password'} className="input" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                            <button className="password-toggle" type="button" onClick={() => setShowConfirmPassword((visible) => !visible)} aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'} aria-pressed={showConfirmPassword}>
                                {showConfirmPassword ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8" /><path d="M9.9 5.2A10.8 10.8 0 0112 5c5 0 8.5 4.5 9.5 7-.4 1-1.3 2.2-2.5 3.3M6.2 6.2C3.9 7.6 2.8 9.6 2.5 12c.7 1.8 3.9 7 9.5 7 1.1 0 2.1-.2 3-.6" /></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" /><circle cx="12" cy="12" r="2.5" /></svg>}
                            </button>
                        </div>
                    </label>
                    {error && <p role="alert">{error}</p>}
                    <button id="signUp" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Signing up...' : 'SignUp'}
                    </button>
                    <p id="html">
                        Have An Account <Link style={{ color: 'darkorange' }} to="/login">Login</Link>
                    </p>

                </form>
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
