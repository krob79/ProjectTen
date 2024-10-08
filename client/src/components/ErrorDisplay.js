import React from "react";

const ErrorDisplay = ({errorList}) => {

    return(
        <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
            {
                errorList.map( (error, i) => {
                    return(
                        <li key={"list"+i}>{error}</li>
                    )
                })
            }
            </ul>
        </div>
    )
    
}

export default ErrorDisplay;