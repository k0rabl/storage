import { FC, useContext } from 'react'
import { Button } from '@shared/button'
import ModalContext from '@features/modal/model/context'

import './settings.sass'

export const SettingsModal: FC<{}> = () => {
  const { setOpen } = useContext(ModalContext)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className="addFiles">
        <p className="modalC__text">
        <input type="checkbox" id="toggle" className="toggle--checkbox" />
        <label htmlFor="toggle" className="toggle--label">
          <span className="toggle--label-background"></span>
        </label>
          {/* <div className="setting">
            Set Folder Theme
          </div> */}
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
