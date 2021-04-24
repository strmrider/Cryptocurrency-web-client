import React, { Component } from "react";
import Table from "../Table";

class TxsHistory extends Component {
  state = {};
  render() {
    return (
      <>
        <h4>Income transactions</h4>
        <hr />
        {this.getTable(this.props.history.income)}
        <h4>Spent transactions</h4>
        <hr />
        {this.getTable(this.props.history.spent)}
      </>
    );
  }

  getTable(array) {
    return (
      <Table
        className="table table-hover"
        headers={["Hash", "Address", "Date", "Amount"]}
        records={this.getTxs(array)}
        index
      />
    );
  }

  getTxs(array) {
    let records = [];
    array.forEach((tx) => {
      records.push([tx.hash, tx.address, tx.date, tx.amount]);
    });
    return records;
  }

  /*getTxs() {
    let records = [];
    console.log(this.props.history);
    this.props.history.forEach((tx) => {
      records.push([tx.hash, tx.address, tx.date, tx.amount]);
    });
    return records;
  }*/
}

export default TxsHistory;
