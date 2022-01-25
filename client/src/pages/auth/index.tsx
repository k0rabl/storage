import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { loginThunk } from '../../features/auth/model/authMidleware';
import { RootState } from '../../redux/store';

interface IProps {
  onLogin: (email: string, password: string) => void
}

const Auth:FunctionComponent<IProps> = ({onLogin}) => 
  <div>
    Auth
    <button onClick={() => onLogin('korabl123@yandex.ru', 'qwerty123*')}>TEst</button>
  </div>


const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, {}, any>) => ({
  onLogin: (email: string, password: string) => {
    dispatch(loginThunk(email, password));
  }
});


export default connect(
  null,
  mapDispatchToProps
)(Auth);