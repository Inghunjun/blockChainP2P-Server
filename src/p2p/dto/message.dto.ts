import { IsArray, IsIn, IsInt, IsString } from "class-validator";
import { Block } from "src/core/blockChain/block";

export class MessageDto{
    @IsInt()
    type : number;

    @IsArray()
    payload : Block[]
}