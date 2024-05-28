import { IsString } from "class-validator";

export class MineBlockDto{
    @IsString()
    data : string
}