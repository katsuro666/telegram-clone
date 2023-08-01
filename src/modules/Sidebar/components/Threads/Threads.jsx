import React from 'react'
import './Threads.scss'

export function Threads(props) {

  return (
    <ul className="sidebar__threads">
      {props.children}
    </ul>
  )
}
