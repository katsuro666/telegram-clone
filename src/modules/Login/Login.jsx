import React from 'react';
import { Button } from '@mui/material';
import { auth, provider } from '../../firebase';
import './Login.scss';
import { signInWithRedirect } from 'firebase/auth';
import logo from './assets/logo.png';
import googleLetter from './assets/G-logo.png';
import { useTranslation } from 'react-i18next';

export function Login() {
  const { t } = useTranslation();

  const signIn = () => {
    signInWithRedirect(auth, provider).catch((error) => alert(error.message));
  };

  return (
    <div className='login'>
      <div className='login__container'>
        <img src={logo} alt='telegram logo' className='login__logo' />
        <h1 className='login__header'>Telegram</h1>
      </div>
      <div className='login__buttons'>
        <Button variant='contained' onClick={signIn} className='login__button'>
          <div className='img-section'>
            <img src={googleLetter} alt='' className='g-letter' />
          </div>
          <span className='btn-text'>{t('Sign in with Google')}</span>
        </Button>

        {/* buttons for email sign in / sign up */}

        {/* <Button variant='contained' className='login__button'>
          <div className="img-section"></div>
          <span className="btn-text">Sign in with email</span>
        </Button>
        <Button variant='contained' className='login__button'>
          <div className="img-section"></div>
          <span className="btn-text">Sign up</span>
        </Button> */}
      </div>
    </div>
  );
}
