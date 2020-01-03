import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../redux/actions";

class ConnectedModalLogin extends React.Component {
  render() {
    return (
      <div id="loginModal" className="modal">
        <div className="modal-content button">
          <span
            id="close"
            className="close"
            onClick={x => this.props.closeModal(this.props.user)}
          >
            &times;
          </span>
          <p id="modalText">{this.props.text}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    text: state.userReducer.modal,
    user: state.userReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: user => {
      dispatch(closeModal(user));
    }
  };
};

const ModalLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedModalLogin);

export default ModalLogin;
