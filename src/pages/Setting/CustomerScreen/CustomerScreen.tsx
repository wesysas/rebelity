import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IonLoading, IonRow, IonCol, IonInput } from '@ionic/react';

import Button from '../../../components/Button/Button';
import { IGlobalState } from '../../../data/coreTypes';
import { CustomerScreenProps } from './types';
import { 
  getCustomerScreenOptions,
  getCustomerScreenOption,
  addCustomerScreenOption,
  saveCustomerScreenOption
} from '../actions';

import './CustomerScreen.scss';
import { StationModel } from '../../../models/Setting';

class CustomerScreen extends React.PureComponent<CustomerScreenProps> {
  state = {
    stationId: 0,
    merchantId: 0,
    stationName: '',
    enableUserTipping: true,
    enableUserTouchScreen: false,
    displayCartByDefault: true,
    displayDefaultImage: false,
    displayDefaultWebpage: false,
    displayDefaultVideo: false,
    defaultImageUrl: '',
    defaultWebpageUrl: '',
    defaultVideoUrl: ''
  };

  componentDidMount() {
    this.props.getCustomerScreenOptions();
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.customerScreenOptions && this.props.customerScreenOptions !== prevProps.customerScreenOptions) {
      if (this.props.stationId > 0 && this.props.customerScreenOptions.some(o => o.id == this.props.stationId)) {
        this.props.getCustomerScreenOption(this.props.stationId);
      }
    }
    if (this.props.customerScreenOption && this.props.customerScreenOption !== prevProps.customerScreenOption) {
      this.setState(this.props.customerScreenOption);
    }
  }

  saveCustomerScreenOptions = () => {
    let options: StationModel = this.state;
    if (this.state.stationId == 0) {
      this.props.addCustomerScreenOption(options);
    } else {
      this.props.saveCustomerScreenOption(options);
    }
  };

  toggleUserTipping = () => {
    let userTipping = !this.state.enableUserTipping;
    let userTouch = this.state.enableUserTouchScreen;
    if (userTipping) {
      userTouch = false;
    }

    this.setState({
      enableUserTipping: userTipping,
      enableUserTouchScreen: userTouch
    });
  };

  toggleUserTouch = () => {
    let userTouch = !this.state.enableUserTouchScreen;
    let userTipping = this.state.enableUserTipping;
    if (userTouch) {
      userTipping = false;
    }

    this.setState({
      enableUserTipping: userTipping,
      enableUserTouchScreen: userTouch
    });
  };

  toggleDisplayCart = () => {
    let displayCart = !this.state.displayCartByDefault;
    let displayImage = this.state.displayDefaultImage;
    let displayVideo = this.state.displayDefaultVideo;
    let displayWebpage = this.state.displayDefaultWebpage;

    if (displayCart) {
      displayImage = false;
      displayVideo = false;
      displayWebpage = false;
    }

    this.setState({
      displayCartByDefault: displayCart,
      displayDefaultImage: displayImage,
      displayDefaultVideo: displayVideo,
      displayDefaultWebpage: displayWebpage
    });
  };

  toggleDisplayImage = () => {
    let displayImage = !this.state.displayDefaultImage;
    let displayCart = this.state.displayCartByDefault;
    let displayVideo = this.state.displayDefaultVideo;
    let displayWebpage = this.state.displayDefaultWebpage;

    if (displayImage) {
      displayCart = false;
      displayVideo = false;
      displayWebpage = false;
    }

    this.setState({
      displayCartByDefault: displayCart,
      displayDefaultImage: displayImage,
      displayDefaultVideo: displayVideo,
      displayDefaultWebpage: displayWebpage
    });
  };

  toggleDisplayVideo = () => {
    let displayVideo = !this.state.displayDefaultVideo;
    let displayCart = this.state.displayCartByDefault;
    let displayImage = this.state.displayDefaultImage;
    let displayWebpage = this.state.displayDefaultWebpage;

    if (displayVideo) {
      displayCart = false;
      displayImage = false;
      displayWebpage = false;
    }

    this.setState({
      displayCartByDefault: displayCart,
      displayDefaultImage: displayImage,
      displayDefaultVideo: displayVideo,
      displayDefaultWebpage: displayWebpage
    });
  };

  toggleDisplayWebpage = () => {
    let displayWebpage = !this.state.displayDefaultWebpage;
    let displayCart = this.state.displayCartByDefault;
    let displayImage = this.state.displayDefaultImage;
    let displayVideo = this.state.displayDefaultVideo;

    if (displayWebpage) {
      displayCart = false;
      displayImage = false;
      displayVideo = false;
    }

    this.setState({
      displayCartByDefault: displayCart,
      displayDefaultImage: displayImage,
      displayDefaultVideo: displayVideo,
      displayDefaultWebpage: displayWebpage
    });
  };

  render() {
    const {
      isFetching
    } = this.props;

    const {
      enableUserTipping,
      enableUserTouchScreen,
      displayCartByDefault,
      displayDefaultImage,
      displayDefaultWebpage,
      displayDefaultVideo,
      defaultImageUrl,
      defaultWebpageUrl,
      defaultVideoUrl
    } = this.state;

    return (
      <div className="customer-screen">
        <IonLoading
          cssClass= ''
          isOpen={isFetching}
          message='Please Wait...'
        />
        <div className="customer-screen-content">
          <IonRow className="panel-row">
            <IonCol className="panel-col">
              <div className="bg-second p-4">
                <h3 className="mt-0 mb-5 text-white">Screen Configuration</h3>
                <div className="form-group">
                  <div className="container">
                    <IonRow>
                      <IonCol size="12">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-itm">
                            <label>Enable User Tipping<i className="italic-label"> (Touchscreen is Enabled Only for Card Transaction Process) </i></label>
                            <label className={enableUserTipping ? 'switch float-right checked' : 'switch float-right'} onClick={(e: any) => this.toggleUserTipping()}>
                              <span className="slider round"></span>
                            </label>
                          </li>
                          <li className="list-group-itm">
                            <label>Enable User Touchscreen <i className="italic-label"> (Touchscreen is Enabled at all times) </i></label>
                            <label className={enableUserTouchScreen ? 'switch float-right checked' : 'switch float-right'} onClick={(e: any) => this.toggleUserTouch()}>
                              <span className="slider round"></span>
                            </label>
                          </li>
                        </ul>
                      </IonCol>
                    </IonRow>
                  </div>
                </div>
                <div className="ion-text-center">
                  <i className="special-label"> *Checkout View and Tipping Screen will override Default Screen Display during checkout </i>
                </div>
              </div>
            </IonCol>
            <IonCol className="panel-col">
              <div className="bg-second p-4 mb-4">
                <h3 className="mt-0 mb-5 text-white">Default Screen Display Options <i className="special-label-2"> (*Only one option can be selected at a time) </i></h3>
                <div className="container">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-itm">
                      <div className="label-container">
                        <label>Display Cart by Default :​ <i className="italic-label">Cart will be shown by default on customer screen at all times</i></label>
                        <label className={displayCartByDefault ? 'switch float-right checked' : 'switch float-right'} onClick={(e: any) => this.toggleDisplayCart()}>
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </li>
                    <li className="list-group-itm">
                      <div className="label-container">
                        <label>Display a Default Image on Customer Screen <i className="italic-label"> (1920 × 1080px, JPEG, GIF, PNG ) </i></label>
                        <label className={displayDefaultImage ? 'switch float-right checked' : 'switch float-right'} onClick={(e: any) => this.toggleDisplayImage()}>
                          <span className="slider round"></span>
                        </label>
                      </div>
                      <div className="upload ion-text-center">
                        <div className="upload-box mt-3 mb-1">
                          <label className="img m-0 active">
                            <i className="zmdi zmdi-image-alt"></i>
                            <input id="img" type="file"/>
                            <span>Select Default Image</span>
                          </label>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-itm">
                      <div className="form-group">
                        <div className="label-container">
                          <label className="text-white">Display a Default Webpage on Customer Screen</label>
                          <label className={displayDefaultWebpage ? 'switch float-right checked' : 'switch float-right'} onClick={(e: any) => this.toggleDisplayWebpage()}>
                            <span className="slider round"></span>
                          </label>
                        </div>
                        <IonInput value={defaultWebpageUrl} className="form-control" placeholder="Webpage URL" onIonChange={(e: any) => this.setState({defaultWebpageUrl: e.detail.value!})}></IonInput>
                      </div>
                    </li>
                    <li className="list-group-itm">
                      <div className="label-container">
                        <label>Display a Default Video on Customer Screen <i className="italic-label"> (MPEG) Video will be played in a loop </i></label>
                        <label className={displayDefaultVideo ? 'switch float-right checked' : 'switch float-right'} onClick={(e: any) => this.toggleDisplayVideo()}>
                          <span className="slider round"></span>
                        </label>
                      </div>
                      <div className="upload ion-text-center">
                        <div className="upload-box mt-3 mb-1 ">
                          <label className="img m-0 active">
                            <i className="zmdi zmdi-collection-video"></i>
                            <input id="img" type="file"/>
                            <span>Select Default Video</span>
                          </label>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <Button cls="btn pt-2 btn-block" title="Save Default Options" onClickButton={() => this.saveCustomerScreenOptions()}/>
            </IonCol>
          </IonRow>
        </div>        
      </div>
    );
  }
};

const mapStateToProps = (state: IGlobalState) => ({
  isFetching: state.SettingState.isFetching,
  stationId: state.SettingState.stationId,
  customerScreenOptions: state.SettingState.customerScreenOptions,
  customerScreenOption: state.SettingState.customerScreenOption
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCustomerScreenOptions: () => dispatch(getCustomerScreenOptions() as any),
  getCustomerScreenOption: (stationId: number) => dispatch(getCustomerScreenOption(stationId) as any),
  addCustomerScreenOption: (station: StationModel) => dispatch(addCustomerScreenOption(station) as any),
  saveCustomerScreenOption: (station: StationModel) => dispatch(saveCustomerScreenOption(station) as any)
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerScreen);
