import { useRef, useState, useEffect } from 'react'



export default function useOutsideClick(initialIsVisible: boolean) {
  const [isShow, setIsShow] = useState(initialIsVisible)

  const ref = useRef<any>(null)

  const handleClickOutside = (event: MouseEvent) => {
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
