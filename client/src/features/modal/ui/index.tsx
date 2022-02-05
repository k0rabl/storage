import { FC, useContext  } from 'react'
import ModalContext from '../model/context'

import './modal.sass'


export const Modal:FC<{}> = (props) => {
  const { isOpen, title } = useContext(ModalContext)
 
  return(
    <div className={`modalC ${isOpen && 'opened'}`}>
      <div className="modalC__content">
        <h6 className="modalC__title">{title}</h6>
        {props.children}
      </div>
    </div>
  )
}