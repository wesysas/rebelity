import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IonPage, IonGrid, IonRow, IonCol, IonItem, IonLabel } from '@ionic/react';
import { calendarOutline, enterOutline, exitOutline, closeCircleOutline } from 'ionicons/icons';

import RebelityContent from '../../components/RebelityContent/RebelityContent';
import NavButton from '../../components/NavButton/NavButton';

import { IGlobalState, ROLE_ADMIN_ID } from '../../data/coreTypes';
import { UtilityScreenProps } from './types';
import { clockInUser, clockOutUser, startWordPeriod, endWordPeriod, exitPinUser } from '../ClockIn/actions';
import { clearOrder } from '../Pos/actions';
import './Utility.scss';
import { getFormattedTime } from '../../utils/methods';
import { getCustomerScreenOption } from '../Setting/actions';
import { displayCart } from '../../utils/customer-screen';
import { getStore } from '../../data/configureStore';

const Utility: React.FC<UtilityScreenProps> = ({
          isLoginedIn, adminName, pinNumber, isFetching, isClockedIn, currentUserId, clockInUsers, currentRole, periodId, 
          periodStart, stationId, customerScreenUpdated, history, stationModeId,
          clockInUser, clockOutUser, startWordPeriod, endWordPeriod, exitPinUser, getCustomerScreenOption, clearOrder}) => {
  
  const getCurUser = () => {
    let cnt = clockInUsers.length;
    for (var i = 0; i< cnt; i++) {
      if (clockInUsers[i].userId == currentUserId) {
        return clockInUsers[i];
      }
    }
         
    return null;
  }
  const startWork = () => {
    console.log("start Work");
    startWordPeriod();
  }

  const endWork = () => {
    console.log("end Work");
    endWordPeriod(periodId);
    clearOrder();
  }

  const clockIn = () => {
    console.log("clock in");
    clockInUser(pinNumber, periodId);
  }

  const clockOut = () => {
    console.log("clock out");
    const payload = {
      pinNumber,
      currentUserId,
      periodId,
      stationModeId
    }
    console.log(payload);
    clockOutUser(payload);
    clearOrder();
  }

  const getTimeInterval = (d: string) => {
    var workTime = "";
    var workHours: number = 0;
    var workMins: number = 0;

    const today = new Date();
    const date = new Date(d);
    
    const currentUtcTime = today.getTime();// - today.getTimezoneOffset() * 60 * 1000;
    workHours = Math.floor((currentUtcTime - date.getTime()) / (60* 60 * 1000));
    workMins = Math.round(((currentUtcTime - date.getTime()) / (60* 60 * 1000) - workHours) * 60);
    console.log(workHours);
    console.log(workMins);

    if (workHours == 1) {
      workTime = "1hr ";  
    } else if (workHours > 1) {
      workTime = workHours + "hrs ";
    }

    if (workMins == 1) {
      workTime += "1min"
    } else if (workMins > 1) {
      workTime += workMins + "mins";
    }

    return workTime;
  }

  const exitOut = () => {
    console.log("exit out");
    clearOrder();
    exitPinUser();
  }

  console.log("untility page clocked in");
  console.log(isClockedIn);
  const user = getCurUser();

  var userWorkHours = "";
  var workTime = "";
  if (!(periodStart == null || periodStart == "")) {
    console.log("periodStartperiodStart");
    console.log(periodStart);
    workTime = getTimeInterval(periodStart);
  }
  
  if (user != null) {
    console.log("clockin date");
    console.log(user.clockInDate);
    userWorkHours = getTimeInterval(user.clockInDate);
  }

  if (!customerScreenUpdated) {
    if (stationId > 0) {
      getCustomerScreenOption(stationId);
    } else {
      displayCart(getStore().getState().PosState.order, false);
    }
  }  
  
  return (
    <IonPage>
      <RebelityContent
        isFetching={isFetching}>
        <div className="utility-container">
          <IonGrid>
            <IonRow>
              <div className="alert">
                  <button type="button" className="close" data-dismiss="alert" aria-hidden="true"></button>
                  <strong>Hello</strong>
                  {
                    currentRole == ROLE_ADMIN_ID ? (
                      <div>
                        {
                          periodId == 0 ? (
                            <span>A WORK PERRIOD HAS NOT BEEN STARTED.</span>
                          ) : (
                            <div>
                              {
                                isClockedIn ? (
                                  <span>WORK PERIOD: ({getFormattedTime(periodStart)})</span>
                                ) : (
                                  <span>YOU ARE NOT CLOCKED IN. To make any sales or track work hours, please clock in</span>                
                                )
                              }
                            </div>
                          )
                        }
                      </div>
                    ) : (
                      <div>
                        {
                          periodId == 0 ? (
                            <span>A WORK PERRIOD HAS NOT BEEN STARTED. Please get a supervisor or Manager to create one</span>
                          ) : (
                            <div>
                              {
                                isClockedIn ? (
                                  <span>WORK PERIOD: ({getFormattedTime(periodStart)})</span>
                                ) : (
                                  <span>YOU ARE NOT CLOCKED IN. To make any sales or track work hours, please clock in</span>                
                                )
                              }
                            </div>
                          )
                        }
                      </div>
                    )
                  }
              </div>
            </IonRow>
            <IonRow>
              <IonCol size="8" class="button-container">
                {
                  currentRole == ROLE_ADMIN_ID ? (
                    <div>
                      {
                        periodId == 0 ? (
                          <NavButton path={undefined} icon={calendarOutline} title="Start Workday" cls="clockin-button" onClickButton={startWork} />
                        ) : (
                          <NavButton path={undefined} icon={calendarOutline} title="End Workday" cls="clockin-button" onClickButton={endWork} />
                        )
                      }
                    </div>
                  ) : (
                    <div></div>
                  )
                }
                {
                  isClockedIn ? (
                    <NavButton path={undefined} icon={exitOutline} title="Clock Out" cls="clockin-button clock-out" onClickButton={clockOut} />
                  ) : (
                    <NavButton path={undefined} icon={enterOutline} title="Clock In" cls="clockin-button clock-in" onClickButton={clockIn} />
                  )
                }
                <NavButton path="/clockin" icon={closeCircleOutline} title="Exit Out" cls="clockin-button exit-button" onClickButton={exitOut} />
              </IonCol>
              <IonCol size="4" class="info-container">
                <IonItem>
                  <IonLabel className="account">
                    Account:
                  </IonLabel>
                  <IonLabel className="basement">
                    The Basement
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    User
                  </IonLabel>
                  <IonLabel className="user-name">
                    {
                      user == null ? "" : user.userName
                    }
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    Clock-In Time
                  </IonLabel>
                  <IonLabel>
                    {
                      user == null ? "" : getFormattedTime(user.clockInDate)
                    }
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    Work Period Start
                  </IonLabel>
                  <IonLabel>
                  { periodStart == null ? "" : getFormattedTime(periodStart) }
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    Work Period Time
                  </IonLabel>
                  <IonLabel>
                    {workTime}
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    Work Hours
                  </IonLabel>
                  <IonLabel>
                    {userWorkHours}
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    Supervisor
                  </IonLabel>
                  <IonLabel>
                    {adminName}
                  </IonLabel>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </RebelityContent>
    </IonPage>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  isLoginedIn: state.LoginState.isLoginedIn,
  adminName: state.LoginState.adminName,
  pinNumber: state.ClockInState.pinNumber,
  isFetching: state.ClockInState.isFetching,
  isClockedIn: state.ClockInState.isClockedIn,
  currentUserId: state.ClockInState.currentUserId,
  periodId: state.ClockInState.periodId,
  periodStart: state.ClockInState.periodStart,
  currentRole: state.ClockInState.currentRole,
  clockInUsers: state.ClockInState.clockInUsers,
  stationId: state.SettingState.stationId,
  customerScreenUpdated: state.SettingState.customerScreenUpdated,
  stationModeId: state.SettingState.stationModeId,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  exitPinUser: () => dispatch(exitPinUser() as any),
  clockInUser: (pinNumber: string, periodId: number) => dispatch(clockInUser(pinNumber, periodId) as any),
  clockOutUser: (payload: any) => dispatch(clockOutUser(payload) as any),
  endWordPeriod: (periodId: number) => dispatch(endWordPeriod(periodId) as any),
  startWordPeriod: () => dispatch(startWordPeriod() as any),  
  getCustomerScreenOption: (stationId: number) => dispatch(getCustomerScreenOption(stationId) as any),
  clearOrder: () => dispatch(clearOrder() as any)
});

export default connect(mapStateToProps, mapDispatchToProps)(Utility);
