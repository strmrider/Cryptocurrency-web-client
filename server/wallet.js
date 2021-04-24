const net = require("net");
const struct = require("python-struct");

const Requests = {
  UTXO: 0,
  ADDRESSES: 1,
  NEW_TX: 2,
  RECEIVE: 3,
  WALLET_DETAILS: 4,
  NEW_ADDRESS: 5,
};

// data is a Buffer
function parseIncomeData(data) {
  try {
    data = JSON.parse(data.toString());
  } catch {
    if (data.length > 2) {
      data = data.subarray(4, data.length).toString();
      data = data.toString();
      data = JSON.parse(data);
    } else {
      return null;
    }
  }
  return data;
}

class Wallet {
  // Receives client's socket and wallet server's ip and port address
  constructor(socket, ip, port) {
    this.socket = socket;
    this.walletServer = new net.Socket();
    this.walletServer.connect(port, ip, () => {
      console.log("Connected to wallet");
    });
    this.setEvents();
    this.listenToIncomeData();
    this.send({ type: Requests.WALLET_DETAILS });
  }

  setEvents() {
    this.socket.on("wallet", () => {
      const request = { type: Requests.WALLET_DETAILS };
      this.send(JSON.stringify(request));
    });

    this.socket.on("address", () => {
      this.send({ type: Requests.NEW_ADDRESS });
    });

    this.socket.on("newTx", (tx) => {
      this.send({ type: Requests.NEW_TX, tx: tx });
    });
  }

  listenToIncomeData() {
    this.walletServer.on("data", (data) => {
      const res = parseIncomeData(data);
      if (res) this.handleIncomeData(res);
    });
  }

  handleIncomeData(data) {
    switch (data.type) {
      case Requests.WALLET_DETAILS:
        this.socket.emit("wallet", data.args);
        break;
      case Requests.NEW_ADDRESS:
        this.socket.emit("address", data.args);
        break;
      case Requests.NEW_TX:
        this.socket.emit("newTx");
    }
  }

  send(message) {
    message = JSON.stringify(message);
    this.walletServer.write(struct.pack("!I", message.length) + message);
  }
}

module.exports = { Wallet: Wallet, parseIncomeData: parseIncomeData };
