import { Module } from '@nestjs/common';

import { P2pGateway } from './p2p/p2p.gateway';
import { BlockModule } from './block/block.module';

@Module({
  imports: [BlockModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
