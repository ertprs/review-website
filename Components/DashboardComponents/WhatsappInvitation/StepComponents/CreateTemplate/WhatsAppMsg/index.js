import styles from "./style";
import moment from "moment";
import _get from "lodash/get";

class Time extends React.Component {
  render() {
    return (
      <span className="time">
        <style jsx>{styles}</style>
        {this.props.time}
      </span>
    );
  }
}

const Message = ({ message }) => {
  return (
    <div className="row">
      <style jsx>{styles}</style>
      <span className="message out">
        {message}
        <span style={{ color: "blue" }}>https://www.facebook.com</span>
        <Time time={moment().format("LT")} />
      </span>
    </div>
  );
};

const MessageContainer = ({ message }) => {
  return (
    <div className="container">
      <style jsx>{styles}</style>
      <Message message={message} />
      <div className="message tile"></div>
    </div>
  );
};

class App extends React.Component {
  state = {
    message: "Hello"
  };

  componentDidUpdate(prevProps, prevState) {
    const salutation = _get(this.props, "formData.salutation.value", "");
    let msg = _get(this.props, "formData.message.value", "");
    let reviewUrl = _get(this.props, "formData.reviewUrl.value", "");
    let message = `${salutation} XYZ, ${msg} ${reviewUrl}`;
    if (this.props !== prevProps) {
      this.setState({
        message
      });
    }
  }

  render() {
    return (
      <div className="app">
        <style jsx>{styles}</style>
        <MessageContainer message={this.state.message} />
      </div>
    );
  }
}

export default App;
