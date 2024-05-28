import { IBlock } from "src/blockTypes/block";
import { Block } from "./blockChain/block";

export class GenesisConfig implements Block{
    merkleRoot: string;
    hash: string;
    difficulty: number;
    nonce: number;
    data: string[];
    version: string;
    height: number;
    timestamp: number;
    previousHash: string;
    constructor(){
        this.merkleRoot="0".repeat(64);
        this.hash = "0".repeat(64)
        this.difficulty = 0
        this.nonce = 0
        this.data = ["genesisBlock"]
        this.version = "1.0.0"
        this.height = 0
        this.timestamp = new Date().getTime()
        this.previousHash = "0".repeat(64)
    }

}