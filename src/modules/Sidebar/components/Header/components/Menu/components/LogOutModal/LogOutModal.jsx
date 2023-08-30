import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { auth } from '../../../../../../../../firebase';
import './LogOutModal.scss';
import { useTranslation } from 'react-i18next';

export function LogOutModal({ isModalShow, closeModal }) {
  const { t } = useTranslation();

  return (
    <Dialog
      open={isModalShow}
      onClose={closeModal}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'>
      <DialogTitle>{t('Logout')}</DialogTitle>
      <DialogContent>
        <DialogContentText className='modal__text'>
          {t('Are you sure you want to logout?')}
          <br />
          <br />
          {t('Note that you can seamlessly use Telegram on all your devices at once.')}
        </DialogContentText>
      </DialogContent>
      <DialogActions className='modal__btns'>
        <Button className='cancel-btn' onClick={closeModal}>
          {t('Cancel')}
        </Button>
        <Button className='logout-btn' onClick={() => auth.signOut()} autoFocus>
          {t('Logout')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
