import React, { Component } from 'react';

class CommentBox extends Component {
  constructor(props) {
    super();

    this.state = {
      comment: ''
    };
    this.leaveComment = this.leaveComment.bind(this);
    this.props = props;
  }

  leaveComment(props) {
    props.leaveComment(this.state.comment);
    this.setState({
      comment: ''
    });
  }
  render() {
    return (
      <div className="row comment-box container">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s8">
              <textarea
                id="textarea1"
                className="materialize-textarea"
                value={this.state.comment}
                onChange={event => {
                  this.setState({ comment: event.target.value });
                }}
              />
              <label htmlFor="textarea1">Mesto za Vaš komentar</label>
            </div>
            <div className="col s4">
              <button
                className="btn waves-effect waves-light"
                onClick={event => {
                  event.preventDefault();
                  this.leaveComment(this.props);
                }}
              >
                {' '}
                Ostavi Komentar
                <i className="material-icons right">message</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default CommentBox;
