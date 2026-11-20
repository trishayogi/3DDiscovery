import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './ResetPassword.css'

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '')

function ResetPassword() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const token = searchParams.get('token')

    async function handleSubmit(event) {
        event.preventDefault()
        setError('')

        if (!token) {
            setError('This reset link is invalid or missing its token.')
            return
        }
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.')
            return
        }

        setIsSubmitting(true)
        try {
            const response = await fetch(`${API_URL}/api/users/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password: newPassword }),
            })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Could not reset password.')
            }

            navigate('/login', { replace: true, state: { message: data.message } })
        } catch (requestError) {
            setError(requestError.message || 'Could not connect to the server.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="reset-page">
            <div id="OuterCard">
                <div>
                    <h1>Reset Password</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="input-field"
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(event) => setNewPassword(event.target.value)}
                            minLength={8}
                            required
                        />
                        <input
                            className="input-field"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            minLength={8}
                            required
                        />
                        {error && <p role="alert">{error}</p>}
                        <button id="submit" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
