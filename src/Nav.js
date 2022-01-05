import { useEffect } from "react";
import './Nav.css'

function Nav(props) {
    
    const lookUp = {
        "0x1" : "Ethereum Main Network",
        "0x3" : "Ropsten Test Network",
        "0x4" : "Rinkeby Test Network",
        "0x5" : "Görli Test Network",
        "0x2a" : "Kovan Test Network"

    }

    return (
        <div className="NavBar">
            <div className="Account">
                {(props.account != '') ?
                    props.account
                    :
                    <button onClick={props.SignIn} className="SignInButt">Sign In With Wallet</button>
                }
            </div>
            <div className="Network">
                <span className="net">
                {(lookUp[props.networkID] !== undefined) ?
                    " " + lookUp[props.networkID]
                    :
                    " Unsuported Network"
                }
                </span>
            </div>
        </div>
    )
}

export default Nav;