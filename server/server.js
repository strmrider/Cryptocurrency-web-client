const walletModule = require("./wallet");
const Wallet = walletModule.Wallet;
const parseData = walletModule.parseIncomeData;
const express = require("express");
const app = express();
const http = require("http").createServer(app);

const net = require("net");

// wallet server's ip and port address
const ip = "127.0.0.1";
const port = 56789;

function fetchBlockChain(ip, port, browserSocket) {
  // create a socket and connect a node
  const node = new net.Socket();
  node.connect(port, ip, () => {
    console.log("Connected node");
  });
  // fetch blockchain in json format
  node.on("data", (blocks) => {
    const data = parseData(blocks);
    console.log("blocks check:", data);
    // send to client in json format
    if (data) browserSocket.emit("blocks", data);
  });
}

let io = require("socket.io")(http);
let wallet = null;
io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);
  wallet = new Wallet(socket, ip, port);

  fetchBlockChain("127.0.0.1", 46123, socket);

  socket.on("disconnect", () => {
    console.log("A user disconnected: ", socket.id);
  });
});

http.listen(8080, () => {
  console.log("listening on *:8080");
});
