import { IBlockHeader } from "./blockHeader.t";

export class IBlock extends IBlockHeader{
    merkleRoot : string;//머클트리해쉬값
    hash : string;//해쉬값
    difficulty : number;//채굴난이도
    nonce : number;//해쉬값을 찾아낼때 까지 1씩 증가하는 계산 횟수
    data : string[]; //트랜잭션의 내용
}