import React, { useState } from 'react';
import Modal from 'react-modal';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Paper, MenuItem, MenuList, ListItemText, ListItemIcon } from '@mui/material';
import './Menu.scss';
import { Theme } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { set } from 'features/themeSlice';
import { LogOutModal } from './components';

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

  const [isModalShow, setIsModalShow] = useState(false);

  const closeModal = () => setIsModalShow(false);

  const openModal = () => setIsModalShow(true);

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

      <LogOutModal isModalShow={isModalShow} closeModal={closeModal} />
    </div>
  );
}
