import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IonInput } from '@ionic/react';
import DataTable from 'react-data-table-component';
import { IGlobalState } from '../../../data/coreTypes';
import { customTableStyle } from '../types';
import { TerminalSalesProps, totalTableColumns, orderTableColumns } from './types';
import Pagination from '../../../components/CustomPagination/Pagination';
import { getTerminalAggregates, getTerminalOrders } from '../actions';
import { TerminalOrderItem } from '../../../models/SalesExpense';
import { getStore } from '../../../data/configureStore';

class TerminalSales extends React.PureComponent<TerminalSalesProps> {

  state = {
    orderTableQuery: '',
    orderTablePerPage: 10,
    orderTablePage: 1
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
    if (prevProps.periodId == 0 && this.props.periodId > 0) {
      this.loadData();
    }
  }

  loadData() {
    this.props.getTerminalAggregates();
    this.props.getTerminalOrders();
  }

  handlePageChange = (page: number) => {
    this.setState({orderTablePage: page});
  }

  handlePerPageChange = (newPerPage: number, page: number) => {
    this.setState({
      orderTablePerPage: newPerPage,
      orderTablePage: page
    });
  }

  getTotalTableColumns = () => {
    let columns: any = totalTableColumns;
    columns[2].cell = (row: any) => <div data-tag="allowRowEvents"><div style={{fontWeight: 'bolder'}}>{row.netSales}</div></div>;

    return columns;
  }

  getUserTableColumns = () => {
    let columns: any = orderTableColumns;
    columns[7].cell = (row: any) => (
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
        }} onClick={(e: any) => this.printOrderSale(row)}>
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
        }} onClick={(e: any) => this.seeOrderSale(row)}>
          <i className="zmdi zmdi-edit" style={{color: '#29B6FF'}}></i>
        </a>
      </div>
    );

    return columns;
  }

  printOrderSale = (orderData: TerminalOrderItem) => {
    console.log(orderData);
  }

  seeOrderSale = (orderData: TerminalOrderItem) => {
    console.log(orderData);
  }

  render() {
    const {
      isFetching,
      terminalAggregates,
      terminalOrders,
      terminal
    } = this.props;

    const {
      orderTableQuery,
      orderTablePage,
      orderTablePerPage
    } = this.state;

    let start = orderTablePerPage * (orderTablePage - 1);
    let end = start + orderTablePerPage;
    let orderTableData: TerminalOrderItem[] = terminalOrders.slice(start, end);

    return (
      <div className="work-period">
        <div className="work-period-content">
          <div className="tab-header">
            <h1>Terminal: <b>{terminal == null ? "" : terminal}</b></h1>
            <div className="search_box">
              <div className="input-prepend">
                <i className="zmdi zmdi-search"></i>
              </div>
              <IonInput value={orderTableQuery} className="form-control" placeholder="Search" onIonChange={(e: any) => this.setState({orderTableQuery: e.detail.value!})}></IonInput>
            </div>
          </div>
          <div className="order-list">
            <DataTable
              className="custom-table"
              columns={this.getTotalTableColumns()}
              data={terminalAggregates}
              progressPending={isFetching}
              noHeader={true}
              striped={true}
              customStyles={customTableStyle}
            />
          </div>
          <br></br>
          <br></br>
          <div className="order-list">
            <DataTable
              className="custom-table"
              columns={this.getUserTableColumns()}
              data={orderTableData}
              progressPending={isFetching}
              noHeader={true}
              striped={true}
              pagination
              paginationServer
              paginationTotalRows={terminalAggregates.length}
              onChangeRowsPerPage={this.handlePerPageChange}
              onChangePage={this.handlePageChange}
              customStyles={customTableStyle}
              paginationComponent={Pagination}
            />
          </div>
        </div>        
      </div>
    );
  }
};

const mapStateToProps = (state: IGlobalState) => ({
  isFetching: state.SalesExpensesState.isFetching,
  periodId: state.SalesExpensesState.periodId,
  terminalAggregates: state.SalesExpensesState.terminalAggregates,
  terminalOrders: state.SalesExpensesState.terminalOrders,
  terminal: state.SettingState.terminal
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getTerminalAggregates: () => dispatch(getTerminalAggregates() as any),
  getTerminalOrders: () => dispatch(getTerminalOrders() as any)  
});

export default connect(mapStateToProps, mapDispatchToProps)(TerminalSales);
