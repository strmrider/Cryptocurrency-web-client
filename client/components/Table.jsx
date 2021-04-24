import React, { Component } from "react";

class Table extends Component {
  state = { records: this.props.records };

  render() {
    return (
      <React.Fragment>
        <table className={this.props.className}>
          <thead>
            <tr>
              {this.props.index ? <th>#</th> : <></>}
              {this.props.headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>{this.setRecords()}</tbody>
        </table>
      </React.Fragment>
    );
  }

  clickRow(key) {
    if (this.props.onClick) this.props.onClick(key);
  }

  removeRow(key) {
    this.props.onRemove(key);
  }

  setRemoveButton(key) {
    if (this.props.onRemove)
      return (
        <td>
          <button onClick={() => this.removeRow(key)}>X</button>
        </td>
      );
  }

  setRecords() {
    return this.props.records.map((record, index) => (
      <tr onClick={() => this.clickRow(index)} key={index}>
        {this.props.index ? <td>{index + 1}</td> : <></>}
        {record.map((field, index) => (
          <td key={index}>{field}</td>
        ))}
        {this.setRemoveButton(index)}
      </tr>
    ));
  }
}

export default Table;
