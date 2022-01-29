import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { Input } from '../../../../shared/input'
import ModalContext from '../../model/context'
import './modal.sass'



export const Modal = () => {
  const {isOpen, type, setOpen, handler} = useContext(ModalContext)
  const [params, setParams] = useState<object>({})


  const getValues = (value: object) => {
    setParams({
        ...params,
        ...value,
    })
  }

  const handleClick = (type: string) => {
    
    type === 'close' ? setOpen(false) : handler()
  }

  return(
    <div className={`modalC ${isOpen && 'opened'}`}>
      <div className="modalC__content">
        <h6 className="modalC__title">{type === 'addFolder' ? 'Create folder' : 'Exit'}</h6>
        <p className="modalC__text">
          {
            type === 'addFolder' 
              ? <Input type="text" name="folderName" changeInput={getValues}/> 
              : 'You realy want exit from edit-mode?'
          }
        </p>
        <div className="modalC__buttons buttons">
            <button 
              onClick={() => handleClick('close')} 
              className="btn__no button"
              >
                No, Thanks
            </button>
            <button
                onClick={() => handleClick('accept')}
                className="btn__exit  button"
            >
                {type === 'addFolder' ? 'Create' : 'Exit'}
            </button>
        </div>    
      </div>
    </div>
  )
}