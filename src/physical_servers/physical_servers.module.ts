import { Module } from '@nestjs/common';
import { PhysicalServersController } from './physical_servers.controller';
import { PhysicalServersService } from './physical_servers.service';

@Module({
  controllers: [PhysicalServersController],
  providers: [PhysicalServersService]
})
export class PhysicalServersModule {}
