import React from "react";
import ReactDOM from 'react-dom';
import Modal from "react-modal";
Modal.setAppElement('#modal');


class CustomModal extends React.Component {

  customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    }
  };

  componentDidMount(){
    this.element = document.querySelector("#modal")
  }

  render() {
    if (this.element === undefined) {
      return null
    }
    let modalStyles = {content:{...this.customStyles.content, ...this.props.modalCustomStyles}}
    return(
      ReactDOM.createPortal(<Modal
        isOpen={this.props.showModal}
        onRequestClose={()=>{this.props.handleModalClose()}}
        style={modalStyles}
        contentLabel="Example Modal"
      >
        {this.props.children}
      </Modal>, this.element)
    )
  }
}
export default CustomModal;
