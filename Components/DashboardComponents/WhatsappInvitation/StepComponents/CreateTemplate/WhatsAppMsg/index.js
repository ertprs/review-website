import styles from "./style";
import moment from "moment";
import _get from "lodash/get";

class App extends React.Component {
  state = {
    salutation: "Hi",
    message: "Hello",
    reviewUrl: ""
  };

  updateState = () => {
    const salutation = _get(this.props, "formData.salutation.value", "");
    let message = _get(this.props, "formData.message.value", "");
    let reviewUrl = _get(this.props, "formData.reviewUrl.value", "");
    this.setState({ salutation, message, reviewUrl });
  };

  componentDidMount() {
    this.updateState();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      this.updateState();
    }
  }

  render() {
    const { salutation, message, reviewUrl } = this.state;
    return (
      <div className="app">
        <style jsx>{styles}</style>
        <div className="container">
          <div className="row">
            <span className="message out">
              <span>{salutation} Customer, </span>
              <span>{message}</span>
              <span className="link"> {reviewUrl}</span>
              <span className="time">{moment().format("LT")}</span>
            </span>
          </div>
          <div className="message tile"></div>
        </div>
      </div>
    );
  }
}

export default App;
