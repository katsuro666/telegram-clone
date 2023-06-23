import React from 'react'
import './Threads.scss'

export function Threads(props: any) {

  return (
    <div className="sidebar__threads">
      {props.children}
    </div>
  )
}
