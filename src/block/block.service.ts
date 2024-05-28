import { Injectable } from '@nestjs/common';
import { P2pGateway } from 'src/p2p/p2p.gateway';
import { MineBlockDto } from './dto/mine-block.dto';
//const p2pGateway = new P2pGateway()

@Injectable()
export class BlockService {
  constructor(private readonly p2pGateway: P2pGateway) {}

  mine(mineBlockDto: MineBlockDto) {
    try{
      const {data} = mineBlockDto;
      const newBLock = this.p2pGateway.addBlock([data])
      return {status : 200, data : newBLock.value}  
    }catch (error) {
      console.log(error)
      return {status : 500, data : null}
    }
  }

  getChain() {
    {
      try{
        const chain = this.p2pGateway.getChain()
        return {chain : chain, status : 200}
      }
      catch (error) {
        throw {chain : null, status : 500}
      }
    }
  }


}
