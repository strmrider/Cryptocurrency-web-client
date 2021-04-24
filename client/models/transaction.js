export class Transaction {
  constructor(tx) {
    this.hash = tx["hash"];
    this.fee = tx["fee"];
    this.date = tx["date"];
    this.size = tx["size"];
    this.inputs = tx["inputs"];
    this.outputs = tx["outputs"];
    this.totalInputs = this.getSum(this.inputs);
    this.totalOutputs = this.getSum(this.outputs);
  }

  getSum(list) {
    let sum = 0;
    list.forEach((element) => {
      sum += element["amount"];
    });

    return sum;
  }

  toRecords(obj) {
    let records = [];
    obj.forEach((element) => {
      let current = [];
      Object.values(element).forEach((value) => {
        current.push(value);
      });
      records.push(current);
    });

    return records;
  }

  get details() {
    return [
      this.hash,
      this.date,
      this.fee,
      this.size,
      this.totalInputs,
      this.totalOutputs,
    ];
  }
  get inputRecords() {
    return this.toRecords(this.inputs);
  }

  get outputRecords() {
    return this.toRecords(this.outputs);
  }
}
