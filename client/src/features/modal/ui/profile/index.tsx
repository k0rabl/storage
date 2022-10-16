import { FC, useContext } from 'react'
import { Button } from '@shared/button'
import ModalContext from '@features/modal/model/context'

// import './addFileModal.sass'

export const ProfileModal: FC<{}> = () => {
  const { setOpen } = useContext(ModalContext)

  const handleClose = () => {
    setOpen(false)
  }


  return (
    <div className="addFiles">
        <p className="modalC__text">

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
