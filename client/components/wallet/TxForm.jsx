import React, { Component } from "react";
import NewTX from "../../models/newTx";
import Table from "../Table";

class TxForm extends Component {
  state = {
    outputAddressValue: "",
    amountValue: 0,
    inputAddresses: [],
    recipients: [],
  };

  constructor(props) {
    super(props);
    this.newTx = new NewTX();
    this.addNewAddress = this.addNewAddress.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.props.serverCallbacks.newTx = this.newTxReceived.bind(this);
  }

  isAddressValid(address, amount) {
    return !(address === "" || address.indexOf(" ") >= 0 || amount <= 0);
  }

  addNewAddress() {
    let amount = parseFloat(this.state.amountValue);
    let address = this.state.outputAddressValue;
    if (this.isAddressValid(address, amount)) {
      this.newTx.addRecipient(address, amount);
      this.setState({
        outputAddressValue: "",
        amountValue: 0,
        recipients: this.newTx.recipients,
      });
    }
  }

  removeAddress(index) {
    this.newTx.removeRecipientByIndex(index);
    this.setState({
      recipients: this.newTx.recipients,
    });
  }

  newTxReceived() {
    console.log("tx verified");
    this.newTx = new NewTX();
    this.setState({ recipients: [], amountValue: 0 });
  }

  sendTx() {
    this.props.sendTx(this.newTx);
  }

  handleAddressChange(event) {
    this.setState({ outputAddressValue: event.target.value });
  }

  handleAmountChange(event) {
    this.setState({ amountValue: event.target.value });
  }

  getView() {
    return (
      <>
        <div className="input-group mb-3">
          <input
            type="text"
            value={this.state.outputAddressValue}
            onChange={(e) => this.handleAddressChange(e)}
            className="form-control"
            placeholder="Recipient's address"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <input
              placeholder="Insert amount"
              value={this.state.amountValue}
              onChange={(e) => this.handleAmountChange(e)}
              type="number"
              min="0"
              step="0.1"
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => this.addNewAddress()}
            >
              Add address
            </button>
          </div>
        </div>
        {this.setRecipientList()}
      </>
    );
  }

  setRecipientList() {
    if (this.state.recipients.length > 0) {
      let records = [];
      this.state.recipients.forEach((recipient) => {
        records.push([recipient["address"], recipient["amount"]]);
      });
      return (
        <Table
          index
          className="table table-hover"
          headers={["Address", "Amount"]}
          records={records}
          onRemove={(index) => this.removeAddress(index)}
        />
      );
    }
  }

  getSummary() {
    return (
      <div>
        <hr />
        <h6>Total amount: {this.newTx.amount}</h6>
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        <h3>Create new transaction</h3>
        <h6>Insert recipient's addresses and transfer amount</h6>
        {this.getView()}
        {this.getSummary()}

        <button className="btn btn-primary" onClick={() => this.sendTx()}>
          Send transaction
        </button>
      </React.Fragment>
    );
  }
}

export default TxForm;
