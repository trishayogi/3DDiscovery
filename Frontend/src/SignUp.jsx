import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './SignUp.css'

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
                        <br /><input type="password" className="input" name="password" value={formData.password} onChange={handleChange} required />
                    </label>
                    <label className="required">
                        Confirm Password<span className="star">*</span>
                        <br />
                        <input type="password" className="input" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                    </label>
                    {error && <p role="alert">{error}</p>}
                    <button id="signUp" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Signing up...' : 'SignUp'}
                    </button>
                    <p id="html">
                        Have An Account <Link style={{ color: 'darkorange' }} to="/login">Login</Link>
                    </p>
                    <p id="textt">----- Or SignUp With -----</p>
                    <button id="Google" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"
                            style={{ display: 'block', margin: 'auto' }}>
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                        </svg>
                    </button>
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
