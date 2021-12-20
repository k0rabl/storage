import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { loginThunk } from './features/auth/authMidleware';
import { RootState } from './redux/store';



interface IProps {
  onLogin: () => void
}


const App:FunctionComponent<{} & IProps> = (onLogin) => {
  return (
    <div className="App">
      {/* <button onClick={() => onLogin('k0rab1@yandex.ru', '123123@asd')}>TEst</button> */}
    </div>
  );
}
const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, {}, any>) => {
  return {
    onLogin: (email: string, password: string) => {
      dispatch(loginThunk(email, password));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
// export default App;
