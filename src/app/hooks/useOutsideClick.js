import { useRef, useState, useEffect } from 'react'

export default function useOutsideClick(initialIsVisible) {
  const [isShow, setIsShow] = useState(initialIsVisible)

  const ref = useRef(null)

  const handleClickOutside = (event) => {
    if (ref.current || !ref.current.contains(event.target)) {
      setIsShow(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  return {ref, isShow, setIsShow}
}