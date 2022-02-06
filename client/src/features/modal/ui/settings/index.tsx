import { FC, useContext } from 'react'
import { Button } from '../../../../shared/button'
import ModalContext from '../../model/context'

// import './addFileModal.sass'

export const SettingsModal: FC<{}> = () => {
  const { setOpen } = useContext(ModalContext)

  const handleClose = () => {
    setOpen(false)
  }


  return (
    <div className="addFiles">
        <p className="modalC__text">
          <div className="setting">
            <input type="radio" />
            Set Dark Theme
          </div>
          <div className="setting">
            Set Folder Themex x``
          </div>
        </p>
        <div className="modalC__buttons buttons">
            <Button 
              label='Close'
              click={handleClose} 
              classes={['btn_no']}
            />
        </div>     
    </div>
  )
}

function dispatch(arg0: any) {
  throw new Error('Function not implemented.')
}
