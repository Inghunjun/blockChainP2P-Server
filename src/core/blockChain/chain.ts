import { IBlock } from "src/blockTypes/block";
import { Block } from "./block";

export class Chain{
    private blockChain : Block[];
    constructor(){
        this.blockChain = [Block.getGenesisBlock()]
    }
    
    public getLastBlock(){//마지막블럭가져오기'
        return this.blockChain[this.blockChain.length-1]
    }
    
    public getLength(){//체인 길이 가져오기
        return this.blockChain.length
    }

    public getChain(){//체인 가져오기
        return this.blockChain
    }

    public addTochain(newBlock : Block){//유효한 블럭인지 검사후 체인에 추가하기
        const isValidBlock = Block.isValidNewBlock(newBlock,this.getLastBlock())
        if(isValidBlock.error){
            return isValidBlock
        }
        this.blockChain.push(newBlock)
        return {error : false}
    }

    public isValidChain(_chain : Block[]){//유효한 체인인지 검증하기
        for(let i = 1; i < _chain.length;i++ ){
            const newBlock = _chain[i]
            const previousBlock = _chain[i-1]
            const isValid = Block.isValidNewBlock(newBlock,previousBlock)
            
            if(isValid.error){
                return isValid
            }
        }
        return {error : false}
    }

    replaceChain(_newChain : Block[]){//체인검사후 교체하기
        const _lastBlock = _newChain[_newChain.length-1]
        const lastBlock = this.getLastBlock()
        if(_lastBlock.height==0){
            return {error : true,explanation : " 받은 체인의 마지막 블럭이 제네시스블럭이다"}
        }
        if(_lastBlock.height <= lastBlock.height){//입력받은 체인이 현재 체인보다 짧을때
            return {error : true,explanation : ""}
        }
        //현재 체인보다 입력받은 체인이 더 길면
        this.blockChain = _newChain
        return {error : false}
    }

    public addBlock(data : string[]){//블럭추가하기
        const previousBlock = this.getLastBlock()
        const adjuestmentBlock = this.getAdjuestmentBlock()
        const newBLock = Block.generateBLock(previousBlock,data,adjuestmentBlock)
        const validNewBlock = Block.isValidNewBlock(newBLock,previousBlock);
        if(validNewBlock.error){
            return validNewBlock
        }
        this.blockChain.push(newBLock);

        return {error : false, value : newBLock}
    }

    getAdjuestmentBlock(){//10개 이전의 블럭구하기
        const chainLength = this.getLength();
        const adjustmentBLock = chainLength < 10 ?
        Block.getGenesisBlock() : this.blockChain[chainLength-10]
        return adjustmentBLock
    }
}