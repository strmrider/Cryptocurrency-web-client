import Server from "./server";
import Explorer from "./explorer";
import Wallet from "./wallet";

export default class Main {
  constructor(url) {
    this.server = new Server(url);
    this.explorer = new Explorer(this.server);
    this.wallet = new Wallet(this.server);
    this.server.start();
  }
}
