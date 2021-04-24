import React, { Component } from "react";
import Wallet from "../wallet/wallet";
import Explorer from "../explorer/Explorer";

const Page = {
  Explorer: 0,
  Wallet: 1,
};
class Main extends Component {
  state = { page: Page.Explorer };

  constructor(props) {
    super(props);
  }

  getMainNavBar() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Cryptocurrency
          </a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <button type="button" className="btn btn-outline-primary">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="#"
                    onClick={() => {
                      this.changePage(Page.Explorer);
                    }}
                  >
                    Explorer
                  </a>
                </button>
              </li>
              <li className="nav-item">
                <button type="button" className="btn btn-outline-primary">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="#"
                    onClick={() => {
                      this.changePage(Page.Wallet);
                    }}
                  >
                    Wallet
                  </a>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  changePage(newPage) {
    this.setState({ page: newPage });
  }

  getCurrentPage() {
    if (this.state.page == Page.Explorer)
      return <Explorer explorer={this.props.main.explorer}></Explorer>;
    else if (this.state.page == Page.Wallet)
      return <Wallet wallet={this.props.main.wallet}></Wallet>;
  }

  render() {
    return (
      <>
        {this.getMainNavBar()}
        {this.getCurrentPage()}
      </>
    );
  }
}

export default Main;
