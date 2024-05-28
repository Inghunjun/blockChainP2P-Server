import { IBlock } from "src/blockTypes/block";
import { BlockHeader } from "./blockHeader";
//mport  merkle from "merkle";
import { SHA256 } from "crypto-js";
import { GenesisConfig } from "../genesis.config";
//import hexToBinary from "hex-to-binary";
const hexToBinary = require('hex-to-binary');
const merkle  = require('merkle')
export class Block extends BlockHeader implements IBlock{
    merkleRoot : string;
    hash : string ;
    difficulty : number;
    nonce : number;
    data : string[];
    constructor(previousBlock : IBlock,data : string[],adjuestmentBlock : IBlock){
        super(previousBlock)
        this.merkleRoot = Block.getmerkleRoot(data)
        this.hash = Block.createBLockHash(this)
        this.nonce = 0;
        this.difficulty = Block.getDifficulty(
            this,
            adjuestmentBlock,
            previousBlock,
            
        ) 
        this.data = data;
    }

    public static getmerkleRoot<T>(data : T[]){
        const merkleTree = merkle("sha256").sync(data)
        return merkleTree.root()
    }

    static createBLockHash(block : IBlock){
        const {version,height,timestamp,previousHash,merkleRoot,nonce,difficulty} = block
        const value = `${version}${height}${timestamp}${previousHash}${merkleRoot}${difficulty}${nonce}`;
        return SHA256(value).toString();
    }

    static getGenesisBlock(){
        return new GenesisConfig()
    }

    static generateBLock(previousBlock : IBlock, data : string[],adjuestmentBlock : IBlock){//새 블럭만들기
        const generateBLock = new Block(previousBlock,data,adjuestmentBlock);

        const newBLock = Block.findBLock(generateBLock);//마이닝 끝난 블록

        return generateBLock
    }

    public static getDifficulty(newBLock : IBlock, adjustmentBLock : IBlock, previousBlock : IBlock){
        if(newBLock.height <=9){
            return 0;
        }
        if(newBLock.height <= 19){
            return 1;
        }

        if(newBLock.height % 10 != 0){
            return previousBlock.difficulty
        }

        const timeTaken = newBLock.timestamp-adjustmentBLock.timestamp//10개 상상하는데 걸린시간 
        const timeExpected = 6000000
        if (timeExpected/2 > timeTaken) {
            return adjustmentBLock.difficulty+1

        }else if (timeExpected * 2 <timeTaken) {
            return adjustmentBLock.difficulty-1
        }
        return adjustmentBLock.difficulty
    }

    static findBLock(generateBLock){//find hash  //JavaScript의 단일 스레드 특성으로 인해 반복문이 실행되는 동안 다른 작업을 처리하지 못하고 기다리게 됩니다.
        let hash : string;
        let nonce : number = 0;
        while(true){
            nonce++;
            generateBLock.nonce = nonce;
            hash = this.createBLockHash(generateBLock)
            const binary : string = hexToBinary(hash);
            const result = binary.startsWith("0".repeat(generateBLock.difficulty));//난이도 개수만큼 0으로 시작하면 true 아니면 false
            if(result){
                generateBLock.hash = hash;
               // generateBLock.timestamp = new Date().getTime() 이게 원인이였음 ㅇㅇ
               console.log(generateBLock)
                return generateBLock
            }
        }
    }

    static isValidNewBlock(newBLock : IBlock, previousBlock : IBlock){
        if(newBLock.height != previousBlock.height+1){//높으기 맞지않을때
            return {error : true,explanation : "height error"}
        }
        else if (newBLock.previousHash != previousBlock.hash){//이전해시와 맞지않을때
            return {error : true,explanation : "previousHash error"}
        }
        else if (newBLock.hash != Block.createBLockHash(newBLock)) {//해시값이마지지않을때
            return {error : true,explanation : "block error"}
        }

        return {error : false,value : newBLock}
    }
}