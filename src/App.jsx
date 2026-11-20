import './App.css'
import { Routes, Route, } from 'react-router-dom'
import Home from "./Home"
import Login from "./Login"
import SignUp from "./SignUp"
import ResetPassword from './ResetPassword'
import ForgotPassword from './ForgotPassword'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={< ResetPassword />} />

      </Routes>
    </>
  )
}

export default App
