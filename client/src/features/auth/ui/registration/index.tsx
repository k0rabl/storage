import { FunctionComponent, useState } from "react"
import { Button } from "../../../../shared/button"
import { Input } from "../../../../shared/input"
import { registrationPost } from "../../model/actions"

interface IProps {}

interface IParams {
  email: string
  password: string
  name: string
}

export const Registration:FunctionComponent<IProps> = () => {
  const [params, setParams] = useState<IParams>({email: '', password: '', name: ''})
  const getValues = (value: object) => {
    setParams({
      ...params,
      ...value
    })   
  }
  
  const handleReg = () => {
    //korabl123@yandex.ru
    //qwerty123*
    registrationPost(params)
  }
  
  return(
    <>
      <img className="login__img" src="/label.png" alt="" />
      <h2 className="login__title">Sign Up</h2>
      <div className="login__inputs">
        <Input name="email" type="email"  changeInput={getValues} label="E-Mail"/> 
        <Input name="name" type="text"  changeInput={getValues} label="Name"/> 
        <Input name="password" type="password"  changeInput={getValues} label="Password"/> 
      </div>

      <Button label="Registration" click={handleReg} classes={['login__btn']}/>
      
    </>
  )
}