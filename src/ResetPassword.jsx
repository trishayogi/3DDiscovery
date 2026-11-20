import { useState } from 'react'
import './ResetPassword.css'

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [mismatch, setMismatch] = useState(false)
    const [empty, setEmpty] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (newPassword !== confirmPassword) {
            setMismatch(true)
            return
        }
        setMismatch(false)

        if (newPassword === '') {
            setEmpty(true)
            return
        }
        setEmpty(false)

        alert('Password SuccessFully Update')
        setNewPassword('')
        setConfirmPassword('')
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
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input
                            className="input-field"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {mismatch && <p id="errorMsg">Password Not Match</p>}
                        {empty && <p id="errorMsg2">Create New Password</p>}
                        <button id="submit" type="submit">Update Password</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword