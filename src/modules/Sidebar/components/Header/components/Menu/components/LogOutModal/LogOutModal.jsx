import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { auth } from '../../../../../../../../firebase';
import './LogOutModal.scss';

export function LogOutModal({ isModalShow, closeModal }) {
  return (
    <Dialog
      open={isModalShow}
      onClose={closeModal}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'>
      <DialogTitle>{'Logout'}</DialogTitle>
      <DialogContent>
        <DialogContentText className='modal__text'>
          Are you sure you want to logout?
          <br />
          <br />
          Note that you can seamlessly use Telegram on all your devices at once.
        </DialogContentText>
      </DialogContent>
      <DialogActions className='modal__btns'>
        <Button className='cancel-btn' onClick={closeModal}>
          Cancel
        </Button>
        <Button className='logout-btn' onClick={() => auth.signOut()} autoFocus>
          Log out
        </Button>
      </DialogActions>
    </Dialog>
  );
}
