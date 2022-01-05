import { useParams } from "react-router-dom";
import NewFund from "./NewFund";
import DonateFund from "./DonateFund";
import WithdrawFund from "./WithdrawFund";
import Home from "./Home";
import { useEffect, useState } from 'react';

function RenderCard(props) {
 
    let {acc} = useParams();

    let [accountExists, setAccountExists] = useState(false);
    let [title, setTitle] = useState('');
    let [body, setBody] = useState('');
    let [goal, setGoal] = useState(0);
    let [balance, setBalance] = useState(0);

    let [tryAgain, setTryAgain] = useState(false);

    const contributeToFund = (event) => {
        event.preventDefault();
        props.FundMe.methods.contributeToFund(acc).send({
          from: props.userAccount,
          value: parseInt(props.web3.utils.toWei(props.donateInputRef.current.value.toString(), 'ether'))
        });
      }

    function select(paramsAddress, accountAddress) {

        console.log("Parameter Address: " +
        paramsAddress.toString().toLowerCase() +
        "CurrentUser Address: " +
        accountAddress.toString().toLowerCase() +
        "  Comparison determines if account being looked at is the signed in user's account")

        if(paramsAddress.toString().toLowerCase()===accountAddress.toString().toLowerCase()) {
            if(accountExists) {
                return(
                    //If its user's account and they made a fund
                    <WithdrawFund 
                    web3={props.web3}
                    title={title}
                    body={body}
                    goal={goal}
                    balance={balance}
                    liquidateFund={props.liquidateFund}/> //add curr balance to this function
                )
            }
            else {
                return(
                    //If its user's account but they haven't made a fund
                    <NewFund 
                    title={title}
                    body={body}
                    goal={goal}
                    balance={balance}
                    handleSubmit={props.handleSubmit} titleInputRef={props.titleInputRef} descriptionInputRef={props.descriptionInputRef} goalInputRef={props.goalInputRef}/>
                )
            }
        }
        if(paramsAddress.toString().toLowerCase()!==accountAddress.toString().toLowerCase()) {
            if(accountExists) {
                return(
                    //If its user's account and they made a fund
                    <DonateFund
                    web3={props.web3}
                    title={title}
                    body={body}
                    goal={goal}
                    balance={balance}
                    contributeToFund={contributeToFund} donateInputRef={props.donateInputRef} addressInputRef={props.addressInputRef} />
                )
            }
            else {
                return(
                    //If its user's account but they haven't made a fund
                    <>
                    
                    <Home inAdress={true}/>
                    </>
                )
            }
        }
    }

    useEffect(async () => {
        console.log("USE EFFFFECT")
        try {
            let funds = await props.FundMe.methods.funds(acc).call();
            props.FundMe.methods.funds(props.userAccount).call()
            setAccountExists(funds.owner.toString().toLowerCase() === acc.toString().toLowerCase());
            setTitle(funds.title);
            setBody(funds.body);
            setGoal(funds.goal);
            setBalance(funds.balance);
            console.log(funds.owner.toString().toLowerCase() === acc.toString().toLowerCase())
            console.log("Parameter Address: " +
            acc.toString().toLowerCase() +
            "Current Fund Owner Address: " +
            funds.owner.toString().toLowerCase() +
            "  Comparison determines if a fund is registered to the viewed address in parameters")
        }
        catch(err) {
            setTryAgain(!tryAgain);
            console.log(err);
        }
    }, [tryAgain])

    return(
    <>
        {/* {acc}
      <NewFund handleSubmit={props.handleSubmit} titleInputRef={props.titleInputRef} descriptionInputRef={props.descriptionInputRef} goalInputRef={props.goalInputRef}/>
      <DonateFund contributeToFund={props.contributeToFund} donateInputRef={props.donateInputRef} addressInputRef={props.addressInputRef} />
      <WithdrawFund liquidateFund={props.liquidateFund}/> */}
        {(props.userAccount)?
        select(acc, props.userAccount)
        :
        ""
        }
    </>
    );
}

export default RenderCard;