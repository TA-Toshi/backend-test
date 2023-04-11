import { Module } from '@nestjs/common';
import { VirtualServersController } from './virtual_servers.controller';
import { VirtualServersService } from './virtual_servers.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { virtual_servers } from './virtual_servers.model';

@Module({
  controllers: [VirtualServersController],
  providers: [VirtualServersService],
  imports: [
    SequelizeModule.forFeature([
      virtual_servers,
    ])
  ],
  exports: [
    
  ]
})
export class VirtualServersModule {}
