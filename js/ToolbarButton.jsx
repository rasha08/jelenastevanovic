import React from 'react';

const ToolbarButton = props => {
  if (props.user) {
    return (
      <div className="fixed-action-btn toolbar">
        <a className="btn-floating btn-large ">
          <i className="large material-icons">widgets</i>
        </a>
        <ul>
          <li className="waves-effect waves-light">
            <a
              onClick={() => {
                props.toggleCommentBox();
              }}
            >
              <i className="material-icons">textsms</i>
            </a>
          </li>
          <li className="waves-effect waves-light"><a onClick={() => {
                props.likeButtonToggle();
              }}><i id="liked" className="material-icons">thumb_up</i></a></li>
          <li className="waves-effect waves-light">
            <a><i className="material-icons">share</i></a>
          </li>
          <li className="waves-effect waves-light">
            <a onClick={() => props.logout()}><i className="material-icons">person</i></a>
          </li>
        </ul>
      </div>
    );
  }
  return (
    <div className="fixed-action-btn login">
      <a className="btn-floating btn-large" onClick={() => props.login()}>
        <i className="large material-icons">person</i>
      </a>
    </div>
  );
};

export default ToolbarButton;
