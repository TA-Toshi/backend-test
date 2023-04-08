import { Module } from '@nestjs/common';
import { VirtualServersController } from './virtual_servers.controller';
import { VirtualServersService } from './virtual_servers.service';

@Module({
  controllers: [VirtualServersController],
  providers: [VirtualServersService]
})
export class VirtualServersModule {}
