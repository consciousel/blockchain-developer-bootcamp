import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from './Spinner'
import{
	filledOrdersLoadedSelector,
	filledOrdersSelector 
} from '../store/selectors'
import { ETHER_ADDRESS } from '../helpers'

const showFilledOrders = (filledOrders) => {

	return(
		<>
		<tbody>
			{ filledOrders.map((order) => {

				// Format display to show price change 
				const priceClass = order.tokenPriceClass === 'success'
				let textColor
				if(priceClass) {
					textColor="text-success"
				} else {
					textColor="text-danger" 
				}

				return(
		   			<tr className={'order-${order.id}'} key={order.id}>
		              <td className={'text-muted'}>{order.formattedTimeStamp}</td>
					  <td >{order.tokenAmount}</td>
				      <td className={textColor}>{order.tokenPrice}</td>
				 	</tr>
		  		)
	  		}) }	                  
	    </tbody>
	    </>
	)
}

class Trades extends Component {
	render() {
		return (
			<>
			<div className="card bg-dark text-white">
	              <div className="card-header">
	                Trades
	              </div>
	              <div className="card-body">
	                <table className="table table-dark table-sm small">
	                  <thead>
	                    <tr>
	                    	<th>Time</th>
	                    	<th>DAPP</th>
	                    	<th>DAPP/ETH</th>
	                    </tr>
	                  </thead>
	                  { this.props.filledOrdersLoaded ? showFilledOrders(this.props.filledOrders) : <Spinner type="table" /> }
	                </table>
	              </div>
	        </div>
	        </>
		)
	}
}

function mapStateToProps(state) {
	return {
		filledOrdersLoaded: filledOrdersLoadedSelector(state),
		filledOrders: filledOrdersSelector(state),
	}
}

export default connect(mapStateToProps)(Trades)

