import { io } from "socket.io-client";

const Request = {
  ConnectWallet: 1,
  NewAddress: 2,
  NewTx: 3,
  Utxo: 4,
};

// Handles the communication with the server
export default class Server {
  constructor(serverUrl) {
    this.url = serverUrl;
    // components callbacks
    this.loadWalletCallback = null;
    this.newAddressCallback = null;
    this.newTxCallback = null;
    this.explorerCallback = null;
  }

  start() {
    this.socket = io(this.url, {
      reconnection: false,
      upgrade: false,
      transports: ["websocket"],
    });

    this.socket.on("wallet", (wallet) => {
      this.loadWallet(wallet);
    });

    this.socket.on("address", (address) => {
      this.newAddressCallback(address.address);
    });

    this.socket.on("newTx", () => {
      this.newTxCallback();
    });

    this.socket.on("blocks", (data) => {
      console.log(data);
      const blocks = this.parseBlockChain(data.blocks);
      this.explorerCallback(blocks);
    });
  }

  parseBlockChain(blocks) {
    let parsedBlocks = [];
    blocks.forEach((block) => {
      parsedBlocks.push(JSON.parse(block));
    });
    return parsedBlocks;
  }

  loadWallet(wallet) {
    this.id = wallet.id;
    const myWallet = {
      addresses: wallet.addresses,
      utxo: wallet.utxo,
      history: wallet.history,
    };
    this.loadWalletCallback(myWallet);
  }

  generateAddress() {
    this.socket.emit("address");
  }

  sendNewTx(tx) {
    console.log(tx, "on srever");
    this.socket.emit("newTx", tx);
  }
}
