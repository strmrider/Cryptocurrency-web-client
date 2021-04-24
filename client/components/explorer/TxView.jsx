import React, { Component } from 'react';
import Table from '../Table'

class TxView extends Component {
    className = "table table-hover";

  getTxDetails() {
    return [
      ["Hash", this.props.tx.hash],
      ["Date", this.props.tx.date],
      ["Fee", this.props.tx.fee],
      ["Size", this.props.tx.size]
    ];
  }

  render() {
    return (
      <React.Fragment>
        <h3>Details</h3>
        <Table
          className={this.className}
          headers={[]}
          records={this.getTxDetails()}
        ></Table>
        <h3>Inputs</h3>
        <Table
          className={this.className}
          headers={["Hash", "Adress", "Amount"]}
          records={this.props.tx.inputRecords}
        ></Table>
        <h3>Outputs</h3>
        <Table
          className={this.className}
          headers={["Sender", "Recipient", "Amount"]}
          records={this.props.tx.outputRecords}
        ></Table>
      </React.Fragment>
    );
  }
}
 
export default TxView;