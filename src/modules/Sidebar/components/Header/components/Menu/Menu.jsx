import React, { useState } from 'react';
import Modal from 'react-modal';
// import Paper from '@mui/material/Paper';
// import MenuList from '@mui/material/MenuList';
// import MenuItem from '@mui/material/MenuItem';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { auth } from '../../../../../../firebase';
import {
  Button,
  Paper,
  MenuItem,
  MenuList,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import './Menu.scss';
import { Theme } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { set } from 'features/themeSlice';

Modal.setAppElement('#root');

export function Menu(props) {
  // @ts-ignore
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleChange = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    dispatch(set(next));
  };

  // TODO: сделать чтобы меню закрывалось при нажатии на бургер

  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);

  const openModal = () => setShowModal(true);

  return (
    <div className={props.className} ref={props.innerRef}>
      <Paper className='menu'>
        <MenuList className='menu__list'>
          <MenuItem className='menu__item' onClick={openModal}>
            <ListItemIcon>
              <LogoutIcon className='menu__icon' />
            </ListItemIcon>
            <ListItemText className='menu__text'>Log out</ListItemText>
          </MenuItem>

          <a href='https://desktop.telegram.org/' className='nav-link' target='_blank' rel='noreferrer'>
            <MenuItem className='menu__item'>
              <ListItemIcon>
                <AddCircleOutlineIcon className='menu__icon' />
              </ListItemIcon>
              <ListItemText className='menu__text'>Install app</ListItemText>
            </MenuItem>
          </a>

          <MenuItem className='menu__item' onClick={handleChange}>
            <div style={{ display: 'flex' }}>
              <ListItemIcon>
                <Theme className={'menu__icon'} />
              </ListItemIcon>
              <ListItemText className='menu__text'>Change theme</ListItemText>
            </div>
          </MenuItem>
        </MenuList>
      </Paper>

      <Dialog
        open={showModal}
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
    </div>
  );
}
