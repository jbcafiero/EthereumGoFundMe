import Card from "./Card";

function NewFund(props) {

    return(
        <div>
            <Card>
                <form onSubmit={props.handleSubmit}>
                    <div className="formBlock">
                        <label className="LabelInp" htmlFor="title"><span className="lableTxt">Title</span></label>
                        <input autoComplete="off" type="text" required className="inputTxt" id="title" name="title" ref={props.titleInputRef}></input><br/><br/>
                    </div>
                    <div className="formBlock">
                        <label className="LabelInp" htmlFor="descrip"><span className="lableTxt">Description</span></label>
                        <input autoComplete="off" type="text" required className="inputTxt" id="descrip" name="descrip" ref={props.descriptionInputRef}></input><br/><br/>
                    </div>
                    <div className="formBlock">
                        <label className="LabelInp" htmlFor="goal"><span className="lableTxt">Goal</span></label>
                        <input placeholder="10.00 ETH" autoComplete="off" type="text" required className="inputTxt" id="goal" name="goal" ref={props.goalInputRef}></input><br/><br/>
                    </div>
                    <input className="Submit" type="submit" value="Submit"></input>
                </form>
            </Card>
        </div>
    )
}

export default NewFund;