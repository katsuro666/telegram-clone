import React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './Menu.scss';

export function Menu(props: any) {


  return (
    <div className={props.className}>
      <Paper className='menu'>
      <MenuList className='menu__list'>
        <MenuItem className='menu__item'>
          <ListItemIcon>
            <LogoutIcon className='menu__icon' />
          </ListItemIcon>
          <ListItemText className='menu__text'>Log out</ListItemText>
        </MenuItem>
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
