import { Link } from "react-router-dom"
import { useState } from "react"
import Card from "./Card"

function Home(props) {

    let [account, setAccount] = useState('0x0');

    function inputDetect(e) {
        setAccount(e.target.value);
    }

    return(

        <Card>
            <form>
                {(props.inAdress) && <div className="NotFound">Account has not registered a fund</div>}
                <div className="formBlock">
                    <label className="LabelInp" htmlFor="title"><span className="lableTxt">Address</span></label>
                    <input onChange={inputDetect} placeholder="0x0" autoComplete="off" type="text" required className="inputTxt" id="title" name="title"></input><br/><br/>
                </div>
                 <Link className="Submit" to={'/'+account}>View Account: <span className="smallbtn">{" " + account}</span></Link>
            </form>
        </Card>

    )
}

export default Home;