import { FC, useEffect, useState } from "react"
import { connect, ConnectedProps } from "react-redux";
import { useNavigate } from "react-router";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../../redux/store";
import { Button } from "../../../../shared/button";
import { Input } from "../../../../shared/input";
import { loginThunk } from "../../model/authMidleware";

import './login.sass'


interface IParams {
  email: string
  pass: string
}

const mapProps = (dispatch: ThunkDispatch<RootState, {}, any>) => ({
  onLogin: (email: string, password: string) => {    
    dispatch(loginThunk(email, password))
  }
})

const mapState = (state: RootState) => ({
  activeUser: state.auth.activeUser
})

const connector = connect(mapState, mapProps)

type IProps = ConnectedProps<typeof connector> 

const Login:FC<IProps> = (props) => {
  const [params, setParams] = useState<IParams>({email: '', pass: ''})
  const navigate = useNavigate()
  
  const getValues = (value: object) => {
    setParams({
      ...params,
      ...value
    })   
  }
  
  const handleLogin = () => {
    //korabl123@yandex.ru
    //qwerty123*
    props.onLogin(params.email, params.pass)
  }

  useEffect(() => {
    if(props.activeUser)
      navigate('/storage')
  })

  return(
    <>
      <img className="login__img" src="/label.png" alt="" />
      <h2 className="login__title">Sign In</h2>
      <div className="login__inputs">
        <Input name="email" type="email"  changeInput={getValues} label="E-Mail"/> 
        <Input name="pass" type="password"  changeInput={getValues} label="Password"/> 
      </div>

      <Button label="Log In" click={handleLogin} classes={['login__btn']}/>
      
    </>
  )
}


export default connector(Login);