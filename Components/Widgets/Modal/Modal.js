import React from "react";
import ReactDOM from 'react-dom';
import Modal from "react-modal";
import EmailSubscription from '../EmailSubscription/EmailSubscription';
Modal.setAppElement('#modal');
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class CustomModal extends React.Component {

  componentDidMount(){
    this.element = document.querySelector("#modal")
  }

  render() {
    if (this.element === undefined) {
      return null
    }
    return(
      ReactDOM.createPortal(<Modal
        isOpen={this.props.showModal}
        onRequestClose={()=>{this.props.handleModalClose()}}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {this.props.children}
      </Modal>, this.element)
    )
  }
}
export default CustomModal;
