import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IonLoading, IonPage } from '@ionic/react';

import RebelityContent from '../../components/RebelityContent/RebelityContent';

import { IGlobalState } from '../../data/coreTypes';
import { ReportScreenProps } from './types';
import './Report.scss';
import { Bar, Doughnut } from 'react-chartjs-2';

import { getWorkPeriods, getUserTotals, getTerminalTotals, getPeriodNetSales, getPeriodGrossSales } from './actions';
import { WorkPeriod, WorkPeriodAggregateSaleItem } from '../../models/Report';
import { getStore } from '../../data/configureStore';
import { getFormattedTime, numberWithComma } from '../../utils/methods';
import { RouteComponentProps } from 'react-router';

class Report extends React.PureComponent<ReportScreenProps> {
  state: {
    curPeriod: number,
    periodSaleOptions: any,
    totalsData: any[],
    categorySaleData: any,
    topSellingData: any,
    paymentMethodData: any,
    totalOption: string
  } = {
    curPeriod: 0,
    periodSaleOptions: {
      legend: {
        display: false
      },
      responsive: true,
      maintainAspectRatio: false,
    },
    totalsData: [
      { label: 'Cash', count: 23, amount: '124.00', img: 'assets/img/ic_serving.png' },
      { label: 'Cards', count: 1, amount: '12.00', img: 'assets/img/card.png' },
      { label: 'Discounts', count: 41, amount: '567.00', img: 'assets/img/discounts.png' },
      { label: 'Refunds', count: 4, amount: '124.00', img: 'assets/img/refunds.png' },
    ],
    categorySaleData: {
      labels: ["FastFood (26%)", "Main Course (26%)", "Beverage (12%)", "Dessert (32%)", "Itallian (10%)", "Starter (9%)", "Indaian (16%)", "Other (6%)"],
      datasets: [{
          backgroundColor: ["#eb1e1e", "#f09514", "#f02899", "#03b8ff", "#009946", "#8d37e6", "#898989", "#3337f0"],
          data: [26, 26, 12, 32, 10, 9, 16, 6],
          borderWidth: [0, 0, 0, 0, 0, 0, 0, 0]
      }]
    },
    topSellingData: [
      { img: 'assets/img/1.png', name: 'Cream Pancake', count: 124 },
      { img: 'assets/img/1.png', name: 'Cream Pancake', count: 124 },
      { img: 'assets/img/1.png', name: 'Cream Pancake', count: 124 },
      { img: 'assets/img/1.png', name: 'Cream Pancake', count: 124 },
    ],
    paymentMethodData: [
      { label: 'Cash', amount: '12,092.80', percent: 64 },
      { label: 'Card', amount: '3,045.54', percent: 31 },
      { label: 'Online', amount: '1,000.00', percent: 5 },
      { label: 'Memberships', amount: '1,300.10', percent: 5 },
    ],
    totalOption: 'user'
  };

  barChart: React.RefObject<Bar> | null = null;
  pieChart: React.RefObject<Doughnut> | null = null;

  unlisten: any;

  componentWillMount() {
    this.unlisten = this.props.history.listen((location: any, action: any) => {
      if (location.pathname === '/report') {
        this.loadData();
      }
    });
  }
  
  componentWillUnmount() {
      this.unlisten();
  }

  componentDidMount() {
    this.barChart = React.createRef();
    this.pieChart = React.createRef();
    this.loadData();
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.workPeriods !== this.props.workPeriods && this.props.workPeriods.length > 0) {
      this.setState({
        curPeriod: this.props.workPeriods[0].id,
      });
      this.loadPeriodData(this.props.workPeriods[0].id);
    }
  }

  loadData() {
    this.props.getWorkPeriods();
  }

  gotoSalesPage() {
    if (this.state.curPeriod > 0) {
      getStore().getState().SalesExpensesState.periodId = this.state.curPeriod;
      this.props.history.push('/sales-expenses');
    }
  }

  showSalesByUser() {
    if (this.state.totalOption !== 'user') {
      this.setState({
        totalOption: 'user'
      });
      if (this.state.curPeriod > 0) {
        this.props.getUserTotals(this.state.curPeriod);
      }
    }    
  }

  showSalesByTerminal() {
    if (this.state.totalOption !== 'terminal') {
      this.setState({
        totalOption: 'terminal'
      });
      if (this.state.curPeriod > 0) {
        this.props.getTerminalTotals(this.state.curPeriod);
      }
    }
  }

  applyPeriod(periodId: number) {
    this.setState({
      curPeriod: periodId
    });
    this.loadPeriodData(periodId);
  }

  loadPeriodData(periodId: number) {
    if (this.state.totalOption === 'user') {
      this.props.getUserTotals(periodId);
    } else {
      this.props.getTerminalTotals(periodId);
    }
    this.props.getPeriodNetSales(periodId);
    this.props.getPeriodGrossSales(periodId);
  }

  render() {
    const {
      isFetching,
      workPeriods,
      userTotals,
      terminalTotals,
      netSales,
      grossSales
    } = this.props;

    let totals = this.state.totalOption === 'user' ? userTotals : terminalTotals;
    let barChartData = {
      labels: totals.map((t: WorkPeriodAggregateSaleItem) => t.name),
      datasets: [{
          label: "Items",
          backgroundColor: ["#28a745", "#28a745", "#28a745", "#28a745", "#28a745"],
          data: totals.map((t: WorkPeriodAggregateSaleItem) => t.total),
          position: 'outside'
      }]
    };
    let netSalesStr = '$' + numberWithComma(netSales);

    const {
      curPeriod,
      periodSaleOptions,
      totalsData,
      categorySaleData,
      topSellingData,
      paymentMethodData,
      totalOption
    } = this.state;

    let periodDate = '';
    if (curPeriod > 0) {
      let selectedPeriod = workPeriods.filter(p => p.id == curPeriod)[0];
      if (isNaN(Date.parse(selectedPeriod.startTime))) {
        periodDate = selectedPeriod.startTime;
      } else {
        periodDate = getFormattedTime(selectedPeriod.startTime).split(' ')[0];
      }
    }

    return (
      <IonPage>
        <RebelityContent
          isFetching={false}>
          <IonLoading
            cssClass= ''
            isOpen={isFetching}
            message='Please Wait...'
          />
          <div className="report-container">
            <div className="total-sales">
              <p className="net-sales-title">Net Sales</p>
              <p className="net-sales-val">{netSalesStr}</p>
              <p className="sale-date">For {periodDate}</p>
              <label className="btn-success" onClick={() => this.gotoSalesPage()}>Detailed reports</label>
              <p className="gross-sales-title">GROSS SALES</p>
              <p className="gross-sales-val">{grossSales.totalSales}</p>
              <p className="order-info">{grossSales.details}</p>
            </div>
            <div className="report-content">
              <div className="histo-chart-panel">
                <div className="chart-toolbar">
                  <div className="menus">
                    <label className={totalOption === 'user' ? 'active' : ''} onClick={() => this.showSalesByUser()}>Sales by User</label>
                    <label className={totalOption === 'terminal' ? 'active' : ''} onClick={() => this.showSalesByTerminal()}>Sales by Terminal</label>
                  </div>
                  <div className="select-container">
                    <select onChange={(e: any) => this.applyPeriod(e.target.value!)} value={curPeriod}>
                      {workPeriods.map((option: WorkPeriod) => (
                        <option key={option.id} value={option.id}>{option.startTime}</option>
                      ))}
                    </select>                    
                  </div>
                </div>
                <div className="chart-area" style={{height: '450px'}}>
                  <Bar ref={this.barChart} data={barChartData} options={periodSaleOptions}/>
                </div>
              </div>
              <div className="row">
                <div className="col-7">
                  <div className="row">
                    {totalsData.map((item, index) => (
                      <div className="col-6 report-card" key={index}>
                        <div className="card-content">
                          <img src={item.img}/>
                          <div className="label-area"> 
                            <span>{item.label} / Total</span>
                            <strong>{item.count} / ${item.amount}</strong>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-5">
                  <div className="pie-chart-area">
                    <Doughnut ref={this.pieChart} data={categorySaleData} options={{ maintainAspectRatio: false }}/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <div className="top-selling">
                    <h4 className="selling-title">Top Selling items</h4>
                    {topSellingData.map((item: any, index: number) => (
                      <div className="selling-item" key={index}>
                        <img src={item.img} alt="" width="65" height="65"/>
                        <div className="selling-item-body">
                            <h5>{item.name}</h5>
                            <span>{item.count} times</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-7">
                  <div className="payment-methods">
                    <h4 className="title">Payment Methods</h4>                    
                    {paymentMethodData.map((item: any, index: number) => (
                      <div className="progress-bar-box" key={index}>
                        <span className="sub-title">{item.label}</span>
                        <div className="progress">
                          <div className="progress-bar" style={{width: item.percent + '%'}}></div>
                        </div>
                        <span className="value-label">${item.amount} <span className="text-muted">({item.percent}%)</span></span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RebelityContent>
      </IonPage>
    );
  }
}

const mapStateToProps = (state: IGlobalState, state2: RouteComponentProps) => ({
  isFetching: state.ReportState.isFetching,
  workPeriods: state.ReportState.workPeriods,
  userTotals: state.ReportState.userTotals,
  terminalTotals: state.ReportState.terminalTotals,
  netSales: state.ReportState.netSales,
  grossSales: state.ReportState.grossSales,
  history: state2.history
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getWorkPeriods: () => dispatch(getWorkPeriods() as any),
  getUserTotals: (periodId: number) => dispatch(getUserTotals(periodId) as any),
  getTerminalTotals: (periodId: number) => dispatch(getTerminalTotals(periodId) as any),
  getPeriodNetSales: (periodId: number) => dispatch(getPeriodNetSales(periodId) as any),
  getPeriodGrossSales: (periodId: number) => dispatch(getPeriodGrossSales(periodId) as any)
});

export default connect(mapStateToProps, mapDispatchToProps)(Report);
