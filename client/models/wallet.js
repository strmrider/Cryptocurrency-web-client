import Server from "./server";

class ServerCallbacks {
  constructor() {
    this._loadWallet = null;
    this._newAddress = null;
    this._newTx = null;
  }

  set loadWallet(callback) {
    this._loadWallet = callback;
  }

  set newAddress(callback) {
    this._newAddress = callback;
  }

  set newTx(callback) {
    this._newTx = callback;
  }

  get loadWallet() {
    return this._loadWallet;
  }

  get newAddress() {
    return this._newAddress;
  }

  get newTx() {
    return this._newTx;
  }
}

export default class Wallet {
  constructor(server) {
    this.keys = [];
    this.txHistory = [];
    this.utxo = [];
    this._balance = 0;
    this.isSet = false;

    this.serverCallbacks = new ServerCallbacks();
    this.server = server;
    this.server.loadWalletCallback = this.setWallet.bind(this);
    this.server.newAddressCallback = this.receiveNewAddress.bind(this);
    this.server.newTxCallback = this.newTxVerified.bind(this);
  }

  setWallet(wallet) {
    this.keys = wallet.addresses;
    this.txHistory = wallet.history;
    this.utxo = wallet.utxo;
    this.isSet = true;
    if (this.serverCallbacks.loadWallet) {
      this.serverCallbacks.loadWallet();
    }
  }

  generateAddress() {
    // request new address from server
    this.server.generateAddress();
  }

  receiveNewAddress(address) {
    this.keys.push(address);
    if (this.serverCallbacks.newAddress)
      this.serverCallbacks.newAddress(address);
  }

  newTxVerified() {
    this.serverCallbacks.newTx();
  }

  sendTx(tx) {
    this.server.sendNewTx(tx.export());
  }

  getUTXO() {}

  get balance() {
    return 0;
  }

  get history() {
    return this.txHistory;
  }
}
