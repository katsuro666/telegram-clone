import React, { useState } from 'react';
import Modal from 'react-modal';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { auth } from '../../../../../../firebase';
import { Button } from '@mui/material';
import './Menu.scss';

Modal.setAppElement('#root')


export function Menu(props) {

// TODO: сделать чтобы меню закрывалось при нажатии на бургер

  const [showModal, setShowModal] = useState(false)

  const closeModal = () => setShowModal(false)

  const openModal = () => setShowModal(true)

  const customStyles = {
    overlay: {
      display: 'flex',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    content: {
      alignItems: 'center',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      border: 'none',
      transform: 'translate(-50%, -50%)',
      maxWidth: '400px',
      minWidth: '17.5rem',
      padding: '18px 32px',
      width: 'min-content',
      backgroundColor: '#212121',
      color: '#ffffff',
      borderRadius: '10px'
    },
  };

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

          <Modal 
            isOpen={showModal}
            onRequestClose={closeModal}
            style={customStyles}
          >
            <h3 className='modal__header'>Logout</h3>
            <p className='modal__text'>
              Are you sure you want to logout?
              <br />
              <br />
              Note that you can seamlessly use Telegram on all your devices at once.
            </p>
            <div className="modal__btns">
              <Button className='cancel-btn' onClick={closeModal}>Cancel</Button>
              <Button className='logout-btn' onClick={() => auth.signOut()}>Log out</Button>
            </div>
          </Modal>

          <a href="https://desktop.telegram.org/" className="nav-link" target="_blank" rel="noreferrer">
            <MenuItem className='menu__item'>
              <ListItemIcon>
              <AddCircleOutlineIcon className='menu__icon' />
              </ListItemIcon>
              <ListItemText className='menu__text'>Install app</ListItemText>
            </MenuItem>
          </a>
        </MenuList>
      </Paper>
    </div>
  )
}
