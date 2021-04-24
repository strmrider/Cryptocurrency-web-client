import React, { Component } from 'react';
import Table from '../Table'

class BlockView extends Component {
    state = {};
    className = "table table-hover";
    txs = [];
  
    notifyMainDisplay(index) {
      this.props.notifyChange(index);
    }
  
    getRecords() {
      let block = this.props.block.block;
      return [
        ["Index", block["index"]],
        ["Miner", block["miner"]],
        ["Time", block["time"]],
        ["Nonce", block["nonce"]],
        ["Difficulty", block["difficulty"]],
        ["Merkle root", block["root"]]
      ];
    }
  
    getTxs() {
      let txsList = this.props.block.txsList;
      let txs = [];
      txsList.forEach(tx => {
        let txRow = [tx.hash, tx.date];
        txs.push(txRow);
      });
      return txs;
    }
  
    render() {
      return (
        <React.Fragment>
          <h3>Block details</h3>
          <Table
            className={this.className}
            headers={[]}
            records={this.getRecords()}
          ></Table>
          <h3>Transactions</h3>
          <Table
            onClick={index => this.notifyMainDisplay(index)}
            className={this.className}
            headers={["Hash", "Date"]}
            records={this.getTxs()}
          />
        </React.Fragment>
      );
    }
}
 
export default BlockView;