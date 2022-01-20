import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from './Spinner'
import { Tabs, Tab } from 'react-bootstrap'
import { 
	loadBalances,
	reloadBalances,
	depositEther,
	depositToken,
	withdrawEther,
	withdrawToken
} from '../store/interactions'
import {
	web3Selector,
	exchangeSelector,
	tokenSelector,
	accountSelector,
	etherBalanceSelector,
	tokenBalanceSelector,
	exchangeEtherBalanceSelector,
	exchangeTokenBalanceSelector,
	balancesLoadingSelector,
	balancesLoadedSelector,
	etherDepositAmountSelector,
	etherWithdrawAmountSelector,
	tokenDepositAmountSelector,
	tokenWithdrawAmountSelector
} from '../store/selectors'
import {
	etherDepositAmountChanged,
	etherWithdrawAmountChanged,
	tokenDepositAmountChanged,
	tokenWithdrawAmountChanged,
	balancesReloading
} from '../store/actions'
import { wait } from '../helpers'

const newOrder = new Boolean(false)
const showForm = (props) => {
	const {
		etherBalance,
		exchangeEtherBalance,
		tokenBalance,
		exchangeTokenBalance,
		dispatch,
		etherDepositAmount,
		exchange,
		token,
		account,
		web3,
		etherWithdrawAmount,
		tokenDepositAmount,
		tokenWithdrawAmount,
		balancesLoading,
		balancesReloading,
		balancesLoaded
	} = props

	let handleRefresh

	handleRefresh = () => {
		// Refresh component 
		this.setState({})
		
	}

	return(
		<Tabs defaultActiveKey="deposit" className="bg-dark text-white">

			<Tab eventKey="deposit" title="Deposit" className="bg-dark">
				<table className="table table-dark table-sm small">
					<thead>	
						<tr>
							<th>Token</th>
							<th>Wallet</th>
							<th>Exchange</th>
						</tr>
					</thead>
					<tbody> 
						<tr> 
							<td>ETH</td>
							<td>{etherBalance.toString()}</td> 
							<td>{exchangeEtherBalance.toString()}</td>
						</tr>
					</tbody>
				</table>

				<form className="row" onSubmit={(event) => {
					event.preventDefault()
					depositEther(dispatch, exchange, web3, etherDepositAmount, account)
					console.log("form submitting...")
				}}>
					<div className="col-12 col-sm pr-sm-2">
						<input
						type="text"
						placeholder="ETH Amount"
						onChange={(e) => {dispatch(etherDepositAmountChanged(e.target.value)); }}
						className="form-control form-control-sm bg-dark text-white"
						required />
					</div>
					<div className="col-12 col-sm-auto pl-sm-0">
						<button 
						type="submit" 
						className="btn btn-primary btn-block btn-sm">
						Deposit</button>
					</div>
				</form>

				<table className="table table-dark table-sm small">
					<tbody> 
						<tr> 
							<td>DAPP</td>
							<td>{tokenBalance.toString()}</td>
							<td>{exchangeTokenBalance.toString()}</td>
						</tr>
					</tbody>
				</table>

				<form className="row" onSubmit={(event) => {
					event.preventDefault()
					depositToken(dispatch, exchange, web3, token, tokenDepositAmount, account)
					dispatch( balancesLoading() )
					newOrder = true
				}}>
					<div className="col-12 col-sm pr-sm-2">
					<input
					type="text"
					placeholder="DAPP Amount"
					onChange={(e) => dispatch( tokenDepositAmountChanged(e.target.value) )}
					className="form-control form-control-sm bg-dark text-white"
					required />
					</div>
					<div className="col-12 col-sm-auto pl-sm-0">
						<button 
						type="submit" 
						className="btn btn-primary btn-block btn-sm">
						Deposit</button>
					</div>
				</form>


				<form className="row" onSubmit={(event) => {
					event.preventDefault()
					reloadBalances(dispatch, web3, exchange, token, account)
				}}>
					<div className="col-10 col-sm-3 pl-sm-10">
						<button 
						type="submit"
						className="btn btn-primary btn-block btn-sm"
						style={{
							position: 'absolute',
							left: 150,
							top: 50
						}}>
						Refresh</button>
					</div>
				</form>
				
			</Tab>

			<Tab eventKey="withdraw" title="Withdraw" className="bg-dark">

				<table className="table table-dark table-sm small">
					<thead>	
						<tr>
							<th>Token</th>
							<th>Wallet</th>
							<th>Exchange</th>
						</tr>
					</thead>
					<tbody> 
						<tr> 
							<td>ETH</td>
							<td>{etherBalance.toString()}</td>
							<td>{exchangeEtherBalance.toString()}</td>
						</tr>
					</tbody>
				</table>

				<form className="row" onSubmit={(event) => {
					event.preventDefault()
					withdrawEther(dispatch, exchange, web3, etherWithdrawAmount, account)
					dispatch( balancesLoading() )
				}}>
					<div className="col-12 col-sm pr-sm-2">
						<input
						type="text"
						placeholder="ETH Amount"
						onChange={(e) => dispatch( etherWithdrawAmountChanged(e.target.value) )}
						className="form-control form-control-sm bg-dark text-white"
						required />
					</div>
					<div className="col-12 col-sm-auto pl-sm-0">
						<button 
						type="submit" 
						className="btn btn-primary btn-block btn-sm">
						Withdraw</button>
					</div>
				</form>
			
				<table className="table table-dark table-sm small">
					<tbody> 
						<tr> 
							<td>DAPP</td>
							<td>{tokenBalance.toString()}</td>
							<td>{exchangeTokenBalance.toString()}</td>
						</tr>
					</tbody>
				</table>

				<form className="row" onSubmit={(event) => {
					event.preventDefault()
					withdrawToken(dispatch, exchange, web3, token, tokenWithdrawAmount, account)
					dispatch( balancesLoading() )
				}}>
					<div className="col-12 col-sm pr-sm-2">
						<input
						type="text"
						placeholder="DAPP Amount"
						onChange={(e) => dispatch( tokenWithdrawAmountChanged(e.target.value) )}
						className="form-control form-control-sm bg-dark text-white"
						required />
					</div>
					<div className="col-12 col-sm-auto pl-sm-0">
						<button 
						type="submit"
						className="btn btn-primary btn-block btn-sm">
						Withdraw</button>
					</div>
				</form>

				<form className="row" onSubmit={(event) => {
					event.preventDefault()
					reloadBalances(dispatch, web3, exchange, token, account)
				}}>
					<div className="col-12 col-sm-3 pl-sm-10">
						<button 
						type="submit"
						className="btn btn-primary btn-block btn-sm"
						style={{
							position: 'absolute',
							left: 150,
							top: 50
						}}>
						Refresh</button>
					</div>
				</form>
				
			</Tab>
		</Tabs>
	)
}

const showUpdatedForm = showForm

const refresh = () => {
		// re-renders the component
		this.setState({})
	}

class Balance extends Component {
	UNSAFE_componentWillMount() {
		this.loadBlockchainData()
	}

	async loadBlockchainData() {
		const { dispatch, web3, exchange, token, account } = this.props 
		await loadBalances(dispatch, web3, exchange, token, account)
	}

	render(){
		if(newOrder){
			return (
				<div className="card bg-dark text-white">
					<div className="card-header">
						Balance
					</div>
					 <div className="card-body">
					 	{ this.props.showUpdatedForm ? showUpdatedForm(this.props)  : <Spinner />}
					 </div>
				</div>
			)
		} else {
			return (
				<div className="card bg-dark text-white">
					<div className="card-header">
						Balance
					</div>
					 <div className="card-body">
					 	{ this.props.showForm ? showForm(this.props)  : <Spinner />}
					 </div>
				</div>
			)
	}
	}
}

function mapStateToProps(state) {
	const balancesLoading = balancesLoadingSelector(state)
	const balancesLoaded = balancesLoadedSelector(state)

	return {
		account: accountSelector(state),
		exchange: exchangeSelector(state),
		token: tokenSelector(state),
		web3: web3Selector(state),
		etherBalance: etherBalanceSelector(state),
		tokenBalance: tokenBalanceSelector(state),
		exchangeEtherBalance: exchangeEtherBalanceSelector(state),
		exchangeTokenBalance: exchangeTokenBalanceSelector(state),
		balancesLoading,
		balancesLoaded,
		showUpdatedForm: !balancesLoading && balancesLoaded,
		showForm: !balancesLoading,
		etherDepositAmount: etherDepositAmountSelector(state),
		etherWithdrawAmount: etherWithdrawAmountSelector(state),
		tokenDepositAmount: tokenDepositAmountSelector(state),
		tokenWithdrawAmount: tokenWithdrawAmountSelector(state),
	}
	
} 

export default connect(mapStateToProps)(Balance)