export default class NewTx {
  constructor() {
    this.inputAddr = [];
    this.recipientAddr = [];
    this.fee = 0;
  }

  get inputAddresses() {
    return this.inputAddr;
  }

  get recipients() {
    return this.recipientAddr;
  }

  get amount() {
    let total = 0;
    this.recipients.forEach((recipient) => {
      total += recipient["amount"];
    });

    return total;
  }

  addInputAddres(address) {
    this.inputAddr.push(address);
  }

  addRecipient(address, amount) {
    let new_recipient = { recipient: address, amount: amount };
    this.recipientAddr.push(new_recipient);
  }

  removeRecipientByIndex(index) {
    if (index != -1) this.recipientAddr.splice(index, 1);
  }

  removeRecipient(address) {
    let index = this.recipientAddr.indexOf(address);
    if (index != -1) this.recipientAddr.splice(index, 1);
  }

  removeInputAddress(address) {
    let index = this.inputAddr.indexOf(address);
    if (index != -1) this.inputAddr.splice(index, 1);
  }

  export() {
    return { recipients: this.recipients, amount: this.amount, fee: this.fee };
  }

  json() {
    return JSON.stringify(this.export());
  }
}
