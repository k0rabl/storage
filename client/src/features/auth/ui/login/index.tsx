import { FunctionComponent, useState } from "react"
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../../redux/store";
import { Button } from "../../../../shared/button";
import { Input } from "../../../../shared/input";
import { loginThunk } from "../../model/authMidleware";

import './login.sass'

interface IProps {
  onLogin: (email: string, password: string) => void
}

interface IParams {
  email: string
  pass: string
}
const Login:FunctionComponent<IProps> = ({onLogin}) => {
  const [params, setParams] = useState<IParams>({email: '', pass: ''})

  const getValues = (value: object) => {
    setParams({
      ...params,
      ...value
    })   
  }
  
  const handleLogin = () => {
    //'korabl123@yandex.ru', 'qwerty123*'
    onLogin(params.email, params.pass)
  }

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



const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, {}, any>) => ({
  onLogin: (email: string, password: string) => {
    dispatch(loginThunk(email, password));
  }
});



export default connect(
  null,
  mapDispatchToProps
)(Login);