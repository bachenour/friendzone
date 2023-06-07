import './ErrorsComponent.css'
import IconLeft from "../register/icons8-personne-homme-64.png";
import React from "react";

class ErrorsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: props.error };
    }
    render() {
        return (
            <div className="message-row">
                <img src={IconLeft} alt="left icon" className="icon-left"/>
                <div className="bubble-left">
                    <label htmlFor="email">{this.state.error} :/</label>
                </div>
            </div>
        );
    }
}

export default ErrorsComponent;