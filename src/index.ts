import * as crypto from "crypto";

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}
class Block implements BlockShape {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calcluateHash(prevHash, height, data);
  }
  static calcluateHash(preveHash: string, height: number, data: string) {
    const toHash = `${preveHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}

class Blockchain {
  private blocks: Block[];

  constructor() {
    this.blocks = [];
  }

  private getPrevHash() {
    if (this.blocks.length === 0) return "";
    return this.blocks[this.blocks.length - 1].hash;
  }
  public addBlock(data: string) {
    const block = new Block(this.getPrevHash(), this.blocks.length + 1, data);

    this.blocks.push(block);
  }
  public getBlokcs() {
    return [...this.blocks];
  }
}

const blockchain = new Blockchain();
blockchain.addBlock("First one");
blockchain.addBlock("Secnod one");
blockchain.addBlock("Third one");

console.log(blockchain.getBlokcs());
