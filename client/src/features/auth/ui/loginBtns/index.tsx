import { FunctionComponent } from "react"
import { Button } from "../../../../shared/button"

interface IProps {}

export const LoginBtns:FunctionComponent<IProps> = () => {
  const token = localStorage.getItem('token')

  return(
    <div>
      {
        token 
          ? <Button label="Sign Out" click={() => {}} classes={['btn-primary']}/>
          : <Button label="Sign In" route='/auth' classes={['btn-primary']}/>
      } 
    </div>
  )
}