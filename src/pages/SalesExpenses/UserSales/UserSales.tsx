import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IonInput } from '@ionic/react';
import { Plugins, KeyboardInfo } from '@capacitor/core';
import DataTable from 'react-data-table-component';
import { IGlobalState } from '../../../data/coreTypes';
import { customTableStyle } from '../types';
import { UserSalesProps, totalTableColumns, terminalTableColumns } from './types';
import Pagination from '../../../components/CustomPagination/Pagination';
import { UserItemizedSaleItem } from '../../../models/SalesExpense';
import { openAlert } from '../../AlertModal/actions';
import { getUserAggregates, getUserTerminals, updateOrderTip, confirmCustomerTip } from '../actions';
import { getStore } from '../../../data/configureStore';
import { getFormattedTime } from '../../../utils/methods';
import { ClockInUser } from '../../../models/ClockInUser';
import Button from '../../../components/Button/Button';

import { 
  STATION_MODE_BAR
} from '../../../data/coreTypes';

import './UserSales.scss';

const { Keyboard } = Plugins;

class UserSales extends React.PureComponent<UserSalesProps> {
  inputRef: any = React.createRef();

  state = {
    terminalTableQuery: '',
    terminalTablePerPage: 10,
    terminalTablePage: 1,
    curOrderNumber: 0
  };

  unlisten: any;

  constructor(props: any) {
    super(props);

  }

  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      if (location.pathname === '/sales-expenses' && this.props.periodId > 0) {
        this.loadData();
      }
    });
  }
  
  componentWillUnmount() {
      this.unlisten();
  }

  componentDidMount() {
    if (this.props.periodId > 0) {
      this.loadData();
    }
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.periodId == 0 && this.props.periodId > 0) {
      this.loadData();
    } else if (prevProps.saleUserId != this.props.saleUserId) {
      this.loadData();
    }
  }

  loadData() {
    this.props.getUserAggregates();
    this.props.getUserTerminals();
  }

  handlePageChange = (page: number) => {
    this.setState({terminalTablePage: page});
  }

  handlePerPageChange = (newPerPage: number, page: number) => {
    this.setState({
      terminalTablePerPage: newPerPage,
      terminalTablePage: page
    });
  }

  onClickConfirmTip = () => {
    const { userTerminals } = this.props;
    
    let emptyTips = userTerminals.filter(s => (s.tip == "$0.00" || s.tip == null) && s.tipConfirmed == false);

    if (emptyTips.length > 0) {
      this.props.alertEmptyTip("You didn't input some tips", "You want to ingore them", this.sendConfirmTip, true);
    } else {
      this.sendConfirmTip();
    }
  }

  sendConfirmTip = () => {
    const { userTerminals } = this.props;

    let tips = userTerminals.filter(s => s.tipConfirmed == false);
    var payload = [];
    for (var i = 0; i< tips.length; i++) {
      tips[i].tip = tips[i].tip == "$0.00" || tips[i].tip == null ? "0" : tips[i].tip;
      let tip = {
        OrderNumber: tips[i].orderNumber,
        ConfirmedTipAmount: tips[i].tip
      }
      payload.push(tip);
    }
    console.log("send confirm tips");
    console.log(payload);
    this.props.confirmCustomerTip(payload);
  }

  getTotalTableColumns = () => {
    let columns: any = totalTableColumns;
    columns[2].cell = (row: any) => <div data-tag="allowRowEvents"><div style={{fontWeight: 'bolder'}}>{row.netSales}</div></div>;

    return columns;
  }

  getTotalTableStyle = () => {
    let style = Object.assign({}, customTableStyle, {
      rows: {
        style: {
          fontSize: '20px',
          color: 'white',
          backgroundColor: '#35363C',
          '&:not(:last-of-type)': {
            borderBottomStyle: 'none',
          },
        }
      }
    });

    return style;
  }

  onChangeTip(event: any, orderNumber: number) {
    this.setState({curOrderNumber: orderNumber});

    const tip = event.target.value;
    this.props.updateOrderTip(orderNumber, tip);
  }

  getTerminalTableColumns = () => {
    let columns: any = [...terminalTableColumns];

    const { stationModeId } = this.props;
    const { curOrderNumber } = this.state;
    
    if (stationModeId == STATION_MODE_BAR) {
      columns[7].cell = (row: any) => (
        <div>
          {
            row.tipConfirmed ? (
              <div>{row.tip}</div>   
            ) : (
              <input type="number" autoFocus={curOrderNumber == row.orderNumber} className="tip_editor" value={row.tip == "$0.00" ? "" : row.tip} onKeyPress={(e: any)=>this.onInputSearch(e)} onChange={(e) =>this.onChangeTip(e, row.orderNumber)} /> 
            )
          }
        </div>
      );
    }

    columns[8].cell = (row: any) => (
      <div data-tag="allowRowEvents" style={{display: 'flex'}}>
        <a style={{
          background: '#131218',
          borderRadius: '4px',
          margin: '0 3px',
          minWidth: '33px',
          height: '33px',
          fontSize: '1.2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }} onClick={(e: any) => this.printTerminalSale(row)}>
          <i className="zmdi zmdi-print" style={{color: '#8775a7'}}></i>
        </a>
        <a style={{
          background: '#131218',
          borderRadius: '4px',
          margin: '0 3px',
          minWidth: '33px',
          height: '33px',
          fontSize: '1.2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }} onClick={(e: any) => this.seeTerminalSale(row)}>
          <i className="zmdi zmdi-edit" style={{color: '#29B6FF'}}></i>
        </a>
      </div>
    );

    return columns;
  }

  printTerminalSale = (terminalData: UserItemizedSaleItem) => {
    console.log(terminalData);
  }

  seeTerminalSale = (terminalData: UserItemizedSaleItem) => {
    console.log(terminalData);
  }

  onChangeSearch = (e: any) => {
    console.log("change key");
    console.log(e);
    this.setState({terminalTableQuery: e.detail.value!})
  }

  onInputSearch = (e: any) => {
    console.log("search key");
    console.log(e.keyCode);
    console.log(e.key);
    if (e.key == "Enter") {
      Keyboard.hide();
    }
  }

  filterUserSales = () => {
    const {
      userTerminals
    } = this.props;

    const {
      terminalTableQuery
    } = this.state;
    
    var userSales = userTerminals;
    if (terminalTableQuery != "" ) {
      var query = terminalTableQuery.toLowerCase();
      userSales = userTerminals.filter((s) => {
        const terminal = s.terminal.toLowerCase();
        const isTerminal = terminal.indexOf(query) < 0 ? false : true
        const orderNumber = s.orderNumber + "";
        const isOrderNumber = orderNumber.indexOf(query) < 0 ? false : true
        const order = s.order.toLowerCase();
        const isOrder = order.indexOf(query) < 0 ? false : true
        const isAmount = s.amount.indexOf(query) < 0 ? false : true
        const itemCount = s.itemCount + "";
        const isItemCount = itemCount.indexOf(query) < 0 ? false : true
        const saleDate = s.saleDate.toLowerCase();
        const isSaleDate = saleDate.indexOf(query) < 0 ? false : true
        const payment = s.payment.toLowerCase();
        const isPayment = payment.indexOf(query) < 0 ? false : true
        const isTip = s.tip.indexOf(query) < 0 ? false : true

        return isTerminal || isOrderNumber || isOrder || isAmount || isItemCount || isSaleDate || isPayment || isTip;
      });
    }

    return userSales;
  }

  render() {
    const {
      isFetching,
      userAggregates,
      userTerminals,
      stationModeId,
      saleUserId,
      isTipConfirmed
    } = this.props;

    const {
      terminalTableQuery,
      terminalTablePage,
      terminalTablePerPage
    } = this.state;

    console.log("userAggregates");
    console.log(userAggregates);

    var userSales = this.filterUserSales();

    let start = terminalTablePerPage * (terminalTablePage - 1);
    let end = start + terminalTablePerPage;
    let terminalTableData: UserItemizedSaleItem[] = userSales.slice(start, end);
    
    let clockInUsers = getStore().getState().ClockInState.clockInUsers;
    let currentUser: ClockInUser = clockInUsers.filter(u => u.userId == saleUserId)[0];
    let currentUsername = typeof currentUser === 'undefined' ? '' : currentUser.userName;
    let periodStart = getFormattedTime(getStore().getState().ClockInState.periodStart);
    var columns = this.getTerminalTableColumns()
    return (
      <div className="work-period">
        <div className="work-period-content">
          <div className="tab-header">
            <h1>User: <b>{currentUsername}</b></h1>
            <div className="search_box" style={{justifyContent: 'center'}}>
              <span style={{color: 'orange', textAlign: 'right'}}>Clock in time: {periodStart}</span>
            </div>
          </div>
          <div className="order-list">
            <DataTable
              className="custom-table"
              columns={this.getTotalTableColumns()}
              data={userAggregates}
              progressPending={isFetching}
              noHeader={true}
              striped={true}
              customStyles={this.getTotalTableStyle()}
            />
          </div>
          <br></br>
          <br></br>
          <div className="tab-header">
            <h1>Itemized Sales:</h1>
            <div className="search_box">
              <div className="input-prepend">
                <i className="zmdi zmdi-search"></i>
              </div>
              <IonInput enterkeyhint="search" type="search" value={terminalTableQuery} className="form-control" onKeyPress={(e: any)=>this.onInputSearch(e)} placeholder="Search" onIonChange={(e: any) => this.onChangeSearch(e)}></IonInput>
            </div>
          </div>
          <div className="order-list">
            <DataTable
              className="custom-table"
              columns={columns}
              data={terminalTableData}
              // progressPending={isFetching}
              keyField='orderNumber'
              noHeader={true}
              striped={true}
              pagination
              paginationServer
              paginationTotalRows={userSales.length}
              onChangeRowsPerPage={this.handlePerPageChange}
              onChangePage={this.handlePageChange}
              customStyles={customTableStyle}
              paginationComponent={Pagination}
            />
          </div>
          {
            stationModeId == STATION_MODE_BAR && userTerminals.length > 0 ? (
              <Button cls={isTipConfirmed == true ? "btn-disconnect" : "btn-block"} title={isTipConfirmed == true ? "Tips Confirmed" : "Confirm tips"} onClickButton={() => this.onClickConfirmTip()}/>
            ) : (
              <div></div>
            )
          }
          
        </div>        
      </div>
    );
  }
};

const mapStateToProps = (state: IGlobalState) => ({
  isFetching: state.SalesExpensesState.isFetching,
  periodId: state.SalesExpensesState.periodId,
  userAggregates: state.SalesExpensesState.userAggregates,
  userTerminals: state.SalesExpensesState.userTerminals,
  stationModeId: state.SettingState.stationModeId,
  saleUserId: state.SalesExpensesState.saleUserId,
  isTipConfirmed: state.SalesExpensesState.isTipConfirmed
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getUserAggregates: () => dispatch(getUserAggregates() as any),
  getUserTerminals: () => dispatch(getUserTerminals() as any),
  updateOrderTip:(orderNumber: number, tip: number)  => dispatch(updateOrderTip(orderNumber, tip) as any),
  alertEmptyTip: (title: any, text: any, onPress: any, isConfirm: boolean) => dispatch(openAlert({title, text, onPress, isConfirm}) as any),
  confirmCustomerTip: (tips: any) => dispatch(confirmCustomerTip(tips) as any),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSales);
