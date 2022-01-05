import './App.css';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import FundMeABI from './FundMe.json'
import NewFund from './NewFund';
import DonateFund from './DonateFund';
import WithdrawFund from './WithdrawFund';
import Nav from './Nav';
import Home from './Home';

import {BrowserRouter, Route, Routes } from 'react-router-dom'
import RenderCard from './RenderCard';

function App() {

  let [networkID, SetNetworkID] = useState(0x0);
  let [account, SetAccount] = useState('');

  let provider = window.ethereum;
  const web3 = new Web3(provider);
  let FundMe = new web3.eth.Contract(FundMeABI.abi, '0x1e581898e02cfdbd482b8458ab7bba943b15d452')
  

  useEffect( async () => {

    if(provider) {
        provider.request({method: 'eth_requestAccounts'})
        .then(accs => {
          SetAccount(accs[0])

        })
        .catch(err => {
          console.log(err)
        })

        provider.request({ method: 'eth_chainId' }).then(res => {
          SetNetworkID(res);
        })

    }
    else {
      alert("This browser is not web 3.0 compatible. Consider installing an extension like Metamask.");
    }

    provider.on('accountsChanged', acc => {
      SetAccount(acc[0])
    })

    provider.on('chainChanged', res => {
      SetNetworkID(res);
    })

  }, []);

  function SignIn() {
    provider.request({method: 'eth_requestAccounts'})
    .then(accs => {
      SetAccount(accs[0])
    })
    .catch(err => {
      console.log(err)
    })
}

  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const goalInputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    FundMe.methods.createNewFund(titleInputRef.current.value,descriptionInputRef.current.value,parseInt(goalInputRef.current.value)).send({from: account});
  }

  const donateInputRef = useRef();
  const addressInputRef = useRef();

  const contributeToFund = (event) => {
    event.preventDefault();
    FundMe.methods.contributeToFund(addressInputRef.current.value).send({
      from: account,
      value: parseInt(web3.utils.toWei(donateInputRef.current.value.toString(), 'ether'))
    });
  }

  const liquidateFund = (event) => {
    event.preventDefault();
    FundMe.methods.liquidateYourFund().send({
      from: account
    });
  }



  return (
    <div className='App'>
      <BrowserRouter>
        <Nav SignIn={SignIn} networkID={networkID} account={account} />
        <div className="Content">
        <Routes>
            <Route path='/' element={<Home inAdress={false}/>} />
            <Route path='/EthereumGoFundMe/' element={<Home inAdress={false}/>} />
            <Route path='/:acc' element={<RenderCard
              web3={web3}
              FundMe={FundMe}
              userAccount = {account} 
              handleSubmit={handleSubmit} titleInputRef={titleInputRef} descriptionInputRef={descriptionInputRef} goalInputRef={goalInputRef}
              contributeToFund={contributeToFund} donateInputRef={donateInputRef} addressInputRef={addressInputRef}
              liquidateFund={liquidateFund}
            />} />
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
