import Card from "./Card";

function WithdrawFund(props) {

    return(
        <div>
            <Card>
                <form onSubmit={props.liquidateFund}>
                    <div className="divBlock">
                        <span className="titleBlock">
                            {props.title}
                        </span>
                        
                    </div>
                    <div className="descBloc">
                        <span className="bodyBlock">
                            {props.body}
                        </span>
                    </div >
                    <div className="divBlock">
                        Target Amount: {" " + props.goal + " "} ETH
                    </div>
                    <div className="divBlock">

                        Total Raised: {" " + props.web3.utils.fromWei(props.balance.toString() , 'ether') + " "} ETH
                    </div>
                    <input className="Submit" type="submit" value="Withdraw"></input>
                </form>
            </Card>
        </div>
    )
}

export default WithdrawFund;