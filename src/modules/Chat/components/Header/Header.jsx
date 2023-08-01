import React from 'react'
import CallIcon from '@mui/icons-material/Call'
import SearchIcon from '@mui/icons-material/Search'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Avatar, IconButton } from '@mui/material'
import './Header.scss'

export function Header() {
  return (
    <div className='chat__header'>
      <div className="chat__info">
        <Avatar />
        <div className="chat__user">
          <h4 className="user__name">Name</h4>
          <p className="user__last-seen">last seen recently</p>
        </div>
      </div>
      <div className="chat__utils">
        <IconButton className="utils__icon">
          <CallIcon />
        </IconButton>
        <IconButton className="utils__icon">
          <SearchIcon />
        </IconButton>
        <IconButton className="utils__icon">
          <MoreVertIcon />
        </IconButton>
      </div>
    </div>
  )
}
