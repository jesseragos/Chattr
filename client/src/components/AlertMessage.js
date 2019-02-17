import React from "react";

function AlertMessage(props) {
  let errorUserAction = props.errorUserAction;

  if (errorUserAction.length > 0) {
    props.toggleLoading(false);

    return (
      <div className="pt-5">
        <div
          className="alert bg-danger alert-dismissible fade show"
          role="alert"
        >
          {errorUserAction}
        </div>
      </div>
    );
  }

  return <React.Fragment />;
}

export default AlertMessage;
