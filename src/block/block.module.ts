import { Module } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockController } from './block.controller';
import { P2pGateway } from 'src/p2p/p2p.gateway';

@Module({
  imports : [],
  controllers: [BlockController],
  providers: [BlockService,P2pGateway],
})
export class BlockModule {}
