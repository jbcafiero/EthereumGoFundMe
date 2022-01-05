import Card from "./Card";

function DonateFund(props) {

    return(
        <div>
            <Card>
                <form onSubmit={props.contributeToFund}>
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
                    <div className="formBlock">
                        <label className="LabelInp" htmlFor="dono"><span className="lableTxt">Donation Ammount in ETH</span></label>
                        <input placeholder="1.00" autoComplete="off" type="dono" required className="inputTxt" id="dono" name="dono" ref={props.donateInputRef}></input><br/><br/>
                    </div>
                    <input className="Submit" type="submit" value="Submit"></input>
                </form>
            </Card>
        </div>
    )
}

export default DonateFund;