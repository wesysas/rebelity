import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IonInput } from '@ionic/react';
import DataTable from 'react-data-table-component';
import { IGlobalState } from '../../../data/coreTypes';
import { customTableStyle } from '../types';
import { WorkPeriodProps, totalTableColumns, userTableColumns } from './types';
import Pagination from '../../../components/CustomPagination/Pagination';
import { getWorkPeriodReport, getWorkPeriodTotals, batchOutCapture, getNonCapturedSales } from '../actions';
import { setActiveMenu } from '../actions';
import { WorkPeriodUserItem } from '../../../models/SalesExpense';

import Button from '../../../components/Button/Button';

import { 
  STATION_MODE_BAR
} from '../../../data/coreTypes';

import './WorkPeriod.scss';

class WorkPeriod extends React.Component<WorkPeriodProps> {
  
  state = {
    userTableQuery: '',
    userTablePerPage: 10,
    userTablePage: 1
  };

  unlisten: any;

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
    if (prevProps.periodId != this.props.periodId) {
      this.loadData();
    }
  }

  loadData() {
    this.props.getWorkPeriodReport();
    this.props.getWorkPeriodTotals();
    this.props.getNonCapturedSales();
  }

  handlePageChange = (page: number) => {
    this.setState({userTablePage: page});    
  }

  handlePerPageChange = (newPerPage: number, page: number) => {
    this.setState({
      userTablePerPage: newPerPage,
      userTablePage: page
    });    
  }

  onClickBatchOut = () => {
    console.log("batchOutCapture");
    this.props.batchOutCapture();
  }

  getTotalTableColumns = () => {
    let columns: any = totalTableColumns;
    columns[2].cell = (row: any) => <div data-tag="allowRowEvents"><div style={{color: "lawngreen", fontWeight: 'bolder'}}>{row.netSales}</div></div>;

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

  getUserTableColumns = () => {
    let columns: any = userTableColumns;
    columns[7].cell = (row: any) => (
      <div data-tag="allowRowEvents">
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
        }} onClick={(e: any) => this.seeUserSale(row)}>
          <i className="zmdi zmdi-eye" style={{color: ' #8775a7'}}></i>
        </a>
      </div>
    );

    return columns;
  }

  seeUserSale = (userData: WorkPeriodUserItem) => {
    console.log("userData");
    console.log(userData);
    this.props.setActiveMenu("user-sales", userData.userId)
  }

  render() {
    const {
      isFetching,
      workPeriodReport,
      workPeriodTotals,
      stationModeId,
      nonCapturedSales
    } = this.props;

    console.log("nonCapturedSales render")
    console.log(nonCapturedSales)

    const {
      userTableQuery,
      userTablePage,
      userTablePerPage
    } = this.state;

    let start = userTablePerPage * (userTablePage - 1);
    let end = start + userTablePerPage;
    let userTableData: WorkPeriodUserItem[] = workPeriodReport.userSales.slice(start, end);

    let periodStart = '', periodDuration = '';
    let index = workPeriodReport.header.label.indexOf('(');
    if (index === -1) {
      periodStart = workPeriodReport.header.label;
    } else {
      periodStart = workPeriodReport.header.label.substring(0, index);
      periodDuration = workPeriodReport.header.label.substring(index);
    }

    return (
      <div className="work-period">
        <div className="work-period-content">
          <div className="tab-header">
            <h1>Work Period: <b>{periodStart}</b> {periodDuration}</h1>
          </div>
          <div className="order-list">
            <DataTable
              className="custom-table"
              columns={this.getTotalTableColumns()}
              data={workPeriodTotals}
              progressPending={isFetching}
              noHeader={true}
              striped={true}
              customStyles={this.getTotalTableStyle()}
            />
          </div>
          <br></br>
          <br></br>
          <div className="tab-header">
            <h1>Users:</h1>
            <div className="search_box">
              <div className="input-prepend">
                <i className="zmdi zmdi-search"></i>
              </div>
              <IonInput value={userTableQuery} className="form-control" placeholder="Search" onIonChange={(e: any) => this.setState({userTableQuery: e.detail.value!})}></IonInput>
            </div>
          </div>
          <div className="order-list">
            <DataTable
              className="custom-table"
              columns={this.getUserTableColumns()}
              data={userTableData}
              progressPending={isFetching}
              noHeader={true}
              striped={true}
              pagination
              paginationServer
              paginationTotalRows={workPeriodReport.userSales.length}
              onChangeRowsPerPage={this.handlePerPageChange}
              onChangePage={this.handlePageChange}
              customStyles={customTableStyle}
              paginationComponent={Pagination}
            />
          </div>
          {
            stationModeId == STATION_MODE_BAR && userTableData.length > 0 ? (
              <Button cls={nonCapturedSales.length < 1 ? "btn-disconnect" : "btn-block"} title={nonCapturedSales.length < 1 ? "Authorizations Captured" : "Batch Out"} onClickButton={() => this.onClickBatchOut()}/>
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
  workPeriodReport: state.SalesExpensesState.workPeriodReport,
  workPeriodTotals: state.SalesExpensesState.workPeriodTotals,
  stationModeId: state.SettingState.stationModeId,
  nonCapturedSales: state.SalesExpensesState.nonCapturedSales,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getWorkPeriodReport: () => dispatch(getWorkPeriodReport() as any),
  getWorkPeriodTotals: () => dispatch(getWorkPeriodTotals() as any),
  setActiveMenu: (activeMenu: string, userId: number) => dispatch(setActiveMenu(activeMenu, userId) as any),
  batchOutCapture: () => dispatch(batchOutCapture() as any),
  getNonCapturedSales: () => dispatch(getNonCapturedSales() as any),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkPeriod);
