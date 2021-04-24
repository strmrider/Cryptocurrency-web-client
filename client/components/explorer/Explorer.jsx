import React, { Component } from "react";
import Table from "../Table";
import BlockView from "./BlockView";
import TxView from "./TxView";

let LOADING = -1;
let MAIN_VIEW = 0;
let BLOCK_VIEW = 1;
let TX_VIEW = 2;

class Exlporer extends Component {
  state = {
    view: LOADING,
    block: -1,
    tx: -1,
    path: ["Explorer"],
  };

  constructor(props) {
    super(props);
    this.props.explorer.notifyView = this.explorerLoaded.bind(this);
  }

  componentDidMount() {
    if (this.props.explorer.isSet) this.setState({ view: MAIN_VIEW });
  }

  explorerLoaded() {
    if (this.state.view == LOADING) this.setState({ view: MAIN_VIEW });
  }

  blockMode(index) {
    this.setState((state) => {
      let block = this.props.explorer.blocks[index];
      let path = this.state.path;
      path.push("Block " + index);
      return {
        view: BLOCK_VIEW,
        block: block,
        path: path,
      };
    });
  }

  TxViewMode(index) {
    this.setState((state) => {
      let path = [...this.state.path];
      path.push("Transaction");
      return { view: TX_VIEW, tx: this.state.block.txsList[index], path: path };
    });
  }

  getBlocksRecords() {
    let blocks = this.props.explorer.blocks;
    let records = [];
    blocks.forEach((block) => {
      let current = [
        block.block["index"],
        block.block["time"],
        block.block["miner"],
        block.size,
      ];
      records.push(current);
    });

    return records;
  }

  getCurrentView() {
    switch (this.state.view) {
      case LOADING:
        return <h5>Loading explorer, please wait...</h5>;
      case MAIN_VIEW:
        return (
          <Table
            className="table table-hover"
            onClick={(index) => this.blockMode(index)}
            headers={["Index", "Time", "Miner", "Size"]}
            records={this.getBlocksRecords()}
          />
        );
      case BLOCK_VIEW:
        return (
          <BlockView
            notifyChange={(index) => this.TxViewMode(index)}
            block={this.state.block}
          />
        );
      case TX_VIEW:
        return <TxView tx={this.state.tx} />;
      default:
        return <h2>No display</h2>;
    }
  }

  onPathChange(index) {
    let path;
    switch (index) {
      case 0:
        path = [...this.state.path];
        path.splice(1, 2);
        this.setState({ view: MAIN_VIEW, path: path });
        break;
      case 1:
        path = [...this.state.path];
        path.splice(2, 2);
        this.setState((state) => {
          return { view: BLOCK_VIEW, path: path };
        });
        break;
      default:
        break;
    }
  }

  getPath() {
    return this.state.path.map((item, index) => (
      <li
        className="breadcrumb-item"
        onClick={() => this.onPathChange(index)}
        key={index}
      >
        <a href="#">{item}</a>
      </li>
    ));
  }

  render() {
    return (
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">{this.getPath()}</ol>
        </nav>
        {this.getCurrentView()}
      </div>
    );
  }
}

export default Exlporer;
