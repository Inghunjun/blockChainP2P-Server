import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { BlockService } from './block.service';
import { MineBlockDto } from './dto/mine-block.dto';
@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  //채굴
  @Post("/mineBlock")
  create(@Body() mineBlockDto: MineBlockDto) {
    const mine = this.blockService.mine(mineBlockDto);
    return new HttpException({data : mine.data},mine.status)
  }

  //블럭가져오기
  @Get("/getChain")
  getChain() {
    const chain =  this.blockService.getChain();
    return new HttpException({chain : chain.chain},chain.status)
  }

}
