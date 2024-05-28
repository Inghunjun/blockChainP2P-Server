import { IBlock } from "src/blockTypes/block";
import { IBlockHeader } from "src/blockTypes/blockHeader.t";

export class BlockHeader implements IBlockHeader{
    version: string;
    height: number;
    timestamp: number;
    previousHash: string;
    constructor(previousBlock : IBlock){
        this.version = BlockHeader.getVersion();
        this.timestamp = BlockHeader.getTimesptamp();
        this.height = previousBlock.height+1;
        this.previousHash = previousBlock.hash;
    }

    public static getVersion(){
        return "1.0.0"
    }

    public static getTimesptamp(){
        return new Date().getTime()
    }
}