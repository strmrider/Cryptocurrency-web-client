import Block from "./block";

export default class Explorer {
  constructor(server) {
    this.blocks = [];
    this.notifyView = null;
    this.isSet = false;
    this.server = server;
    this.server.explorerCallback = this.blocksUpdate.bind(this);
  }

  blocksUpdate(blocks) {
    blocks.forEach((block) => {
      this.blocks.push(new Block(block));
    });
    this.isSet = true;
    if (this.notifyView) this.notifyView();
  }
}
