import { FunctionComponent } from "react"
import { Button } from "../../../../shared/button"
import { Input } from "../../../../shared/input"

interface IProps {}

export const Registration:FunctionComponent<IProps> = () => {

  return(
    <>
      <img className="login__img" src="/label.png" alt="" />
      <h2 className="login__title">Sign Up</h2>
      <div className="login__inputs">
        <Input name="email" type="email"  changeInput={() => {}} label="E-Mail"/> 
        <Input name="name" type="text"  changeInput={() => {}} label="Name"/> 
        <Input name="pass" type="password"  changeInput={() => {}} label="Password"/> 
      </div>

      <Button label="Registration" click={() => {}} classes={['login__btn']}/>
      
    </>
  )
}