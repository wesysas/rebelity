import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IonContent, IonPage, IonButton, IonLabel, IonInput, IonText, IonLoading } from '@ionic/react';

import { IGlobalState } from '../../data/coreTypes';
import { ErrorModal } from '../../components/ErrorState/ErrorState';
import { AlertModal } from '../../components/AlertState/AlertState';
import { LoginScreenProps, LoginScreenFromData } from './types';
import { loginAdmin } from './actions';
import './Login.scss';

const Login: React.FC<LoginScreenProps> = ({loginAdmin, isFetching, isLoginedIn, history}) => {

  useEffect(() => {
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!username) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
    if(!password) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if(username && password) {
      const values : LoginScreenFromData = {
        username: username,
        password: password
      }

      loginAdmin(values, null, history);  
    }
  };

  return (
    <IonPage id="page_sign_in">
      <IonContent>
        <IonLoading
          cssClass=''
          isOpen={isFetching}
          message={'Please wait...'}
        />
        <div className="login-background">
          <div className="login-container">
            <form noValidate onSubmit={login}>
              <div className="login-form-container">
                <div className="logo-box">
                  <img src="assets/img/logo.png" alt="Ionic logo" />        
                </div>
                <h2 className="text-white">Login to your Account</h2>
                <IonLabel class="login-label" position="stacked" color="light">Username</IonLabel>
                <IonInput name="username" type="text" class="login-text" value={username} placeholder="Enter Username" spellCheck={false} autocapitalize="off" onIonChange={e => setUsername(e.detail.value!)}
                  required></IonInput>

                {formSubmitted && usernameError && <IonText color="danger">
                  <p className="ion-padding-start">
                    Username is required
                  </p>
                </IonText>}

                <IonLabel class="login-label" position="stacked" color="light">Password</IonLabel>
                <IonInput name="password" type="password" class="login-text" value={password} placeholder="Enter Password" onIonChange={e => setPassword(e.detail.value!)}></IonInput>

                {formSubmitted && passwordError && <IonText color="danger">
                  <p className="ion-padding-start">
                    Password is required
                  </p>
                </IonText>}
              </div>
              <IonButton type="submit" color="primary" expand="full" class="login-bottom-btn" disabled={isFetching}>Login</IonButton>
            </form>
          </div>
          {/* <img src="assets/img/appicon.svg" alt="Ionic logo" /> */}
        </div>
        {/* <ErrorModal/>
        <AlertModal/> */}
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  isFetching: state.LoginState.isFetching,
  isLoginedIn: state.LoginState.isLoginedIn
});
/**/
const mapDispatchToProps = (dispatch: Dispatch) => ({
  loginAdmin: (data: LoginScreenFromData, setErrors: any, navigation: any) =>
    dispatch(loginAdmin(data, setErrors, navigation) as any)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

