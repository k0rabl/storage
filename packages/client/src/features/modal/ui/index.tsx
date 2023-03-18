import { FC, useContext, useEffect, useState  } from 'react'
import { createPortal } from 'react-dom'
import ModalContext from '../model/context'

import './modal.sass'

const modalRot = document.getElementById('modal')

export const Modal:FC<{}> = (props) => {
  const { isOpen, title, child } = useContext(ModalContext)
  const [el] = useState<Element>(document.createElement('div'))

  useEffect(() => {
    modalRot?.appendChild(el)
    
    return () =>  {
      modalRot?.removeChild(el)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
 
  return createPortal((
    <div className={`modalC ${isOpen && 'opened'}`}>
      <div className="modalC__content">
        <h6 className="modalC__title">{title}</h6>
        {child}
      </div>
    </div>
  ), el)
}