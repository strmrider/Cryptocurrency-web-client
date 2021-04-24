import React, { Component } from "react";
import TxForm from "./TxForm";
import AddressManager from "./AddressManager";
import TxsHistory from "./TxsHistory";

const Pages = {
  PENDING: 0,
  HOME: 1,
  ADDRESS: 2,
  HISTORY: 3,
  SEND: 4,
};

class Wallet extends Component {
  state = { page: Pages.PENDING };

  constructor(props) {
    super(props);
    this.props.wallet.serverCallbacks.loadWallet = this.updateWalletView.bind(
      this
    );
  }

  componentDidMount() {
    if (this.props.wallet.isSet) {
      this.setState({ page: Pages.Home });
    }
  }

  // callback function when wallet data is received from server
  updateWalletView() {
    this.loadPage(Pages.SEND);
  }

  render() {
    return (
      <div className="container">
        {this.navBar()}
        {this.getCurrentPage()}
      </div>
    );
  }

  getCurrentPage() {
    switch (this.state.page) {
      case Pages.PENDING:
        return <h5>Loading wallet please wait...</h5>;
      case Pages.HOME:
        return <></>;
      case Pages.ADDRESS:
        return (
          <AddressManager
            generate={() => this.generateAddress()}
            serverCallbacks={this.props.wallet.serverCallbacks}
            keys={this.props.wallet.keys}
          />
        );
      case Pages.HISTORY:
        return <TxsHistory history={this.props.wallet.history} />;
      case Pages.SEND:
        return (
          <TxForm
            sendTx={(tx) => this.sendTx(tx)}
            serverCallbacks={this.props.wallet.serverCallbacks}
          />
        );
    }
  }

  loadPage(page) {
    this.setState({ page: page });
  }

  navBar() {
    return (
      <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => this.loadPage(Pages.HOME)}
            >
              Home
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link active"
              href="#"
              onClick={() => this.loadPage(Pages.ADDRESS)}
            >
              Addresses
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => this.loadPage(Pages.HISTORY)}
            >
              History
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => this.loadPage(Pages.SEND)}
            >
              Send transaction
            </a>
          </li>
        </ul>
      </nav>
    );
  }

  generateAddress() {
    return this.props.wallet.generateAddress();
  }

  sendTx(tx) {
    this.props.wallet.sendTx(tx);
  }
}

export default Wallet;
