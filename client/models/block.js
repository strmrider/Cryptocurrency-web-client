import { Transaction } from "./transaction";

export default class Block {
  constructor(blockJson) {
    this.block = blockJson;
    this.size = 0;
    this.txs = [];
    this.block["data"].forEach(tx => {
      let newTx = new Transaction(JSON.parse(tx));
      this.size += newTx.size;
      this.txs.push(newTx);
    });
    delete this.block.data;
  }

  get txsList() {
    return this.txs;
  }

  getTx(txHash) {
    this.txs.forEach(tx => {
      if (tx.hash === txHash) return tx;
    });
    return null;
  }
}
