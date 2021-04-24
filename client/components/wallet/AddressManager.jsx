import React, { Component } from "react";
import Table from "../Table";

class AddressManager extends Component {
  state = {};

  constructor(props) {
    super(props);

    let records = [];
    props.keys.forEach((key) => {
      records.push([key]);
    });

    this.state = {
      records: records,
    };

    this.props.serverCallbacks.newAddress = this.applyNewAddress.bind(this);
  }

  // callback function when new address is received from the server
  applyNewAddress(address) {
    let records = [...this.state.records];
    records.push([address]);
    this.setState({ records: records });
  }

  render() {
    return (
      <>
        <Table
          className="table table-hover"
          headers={["Address"]}
          records={this.state.records}
          index
        />
        <button
          className="btn btn-primary"
          onClick={() => this.props.generate()}
        >
          Generate new Address
        </button>
      </>
    );
  }
}

export default AddressManager;
