import React from 'react'
import { Button } from '@mui/material'
import { auth, provider } from '../../firebase'
import './Login.scss'
import { signInWithRedirect } from 'firebase/auth'

export function Login() {

  const signIn = () => {
    signInWithRedirect(auth, provider).catch((error) => alert(error.message))
  }

  return (
    <div className='login'>
      <div className="login__telegram">
        <img src="" alt="" />
        <h1 className="header">Telegram</h1>
      </div>
      <Button variant='outlined' onClick={signIn} className='login__button'>Log In</Button>
    </div>
  )
}
