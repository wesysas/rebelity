import React, { useEffect }  from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { connect, Provider } from 'react-redux';
import { Dispatch } from 'redux';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/gogle_sans_font.css';
import './theme/base.css';
import './theme/material-design-iconic-font.css';

import { IGlobalState } from './data/coreTypes';
import { getStore } from './data/configureStore';
import { authenticate } from './utils/session';

import Login from './pages/Login/Login';
import ClockIn from './pages/ClockIn/ClockIn';
import Pos from './pages/Pos/Pos';
import People from './pages/People/People';
import Report from './pages/Report/Report';
import Setting from './pages/Setting/Setting';
import Utility from './pages/Utility/Utility';
import SalesExpenses from './pages/SalesExpenses/SalesExpenses';

import { ErrorModal } from './components/ErrorState/ErrorState';
import { AlertModal } from './components/AlertState/AlertState';

const App: React.FC = () => {
  return (
    <Provider store={getStore()}>
      <IonicAppConnected />
    </Provider>
    // <AppContextProvider>
    //   <IonicAppConnected />
    // </AppContextProvider>
  );
};

interface StateProps {
  isLoginedIn: boolean;
  isCheckingLogin: boolean;
}

interface DispatchProps {
  authenticate: typeof authenticate;
  // loadUserData: typeof loadUserData;
  // setIsLoggedIn: typeof setIsLoggedIn;
  // setUsername: typeof setUsername;
}

const mapStateToProps = (state: IGlobalState) => ({
  isLoginedIn: state.LoginState.isLoginedIn,
  isCheckingLogin: state.LoginState.isCheckingLogin
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  authenticate: () => dispatch(authenticate() as any)
});

interface IonicAppProps extends StateProps, DispatchProps { }

const IonicApp: React.FC<IonicAppProps> = ({ isLoginedIn, isCheckingLogin, authenticate}) => {

  useEffect(() => {
    authenticate();
  }, []);

  console.log("app login");
  console.log(isLoginedIn);

  console.log("isCheckingLogin");
  console.log(isCheckingLogin);

  return (
    <IonApp>
      {
        isCheckingLogin ? (
          <div></div>
        ) : (
          <div>
            <IonReactRouter>
              <IonRouterOutlet id="main">
                {/*
                We use IonRoute here to keep the tabs state intact,
                which makes transitions between tabs and non tab pages smooth
                */}
                {
                  //isLoginedIn ? (<Redirect to="/clockin" />) : (<Redirect to="/login" />)
                }
                <Route path="/login" component={Login} exact={true} />
                <Route path="/clockin" component={ClockIn} exact={true} />
                <Route path="/pos" component={Pos} exact={true} />
                <Route path="/people" component={People} exact={true} />
                <Route path="/report" component={Report} exact={true} />
                <Route path="/setting" component={Setting} exact={true} />
                <Route path="/utility" component={Utility} exact={true} />
                <Route path="/sales-expenses" component={SalesExpenses} exact={true} />
                
                <Route exact path="/" render={() => {
                  console.log("app isLoginedIn");
                  console.log(isLoginedIn);
                  return isLoginedIn ? <Redirect to="/clockin" /> : <Redirect to="/login" />;
                }} />
              </IonRouterOutlet>
            </IonReactRouter>
            <ErrorModal/>
            <AlertModal/>
          </div>
        )
      }
    </IonApp>
  )
}

export default App;

const IonicAppConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(IonicApp);

