import { Module } from '@nestjs/common';
import { VirtualServersController } from './virtual_servers.controller';
import { VirtualServersService } from './virtual_servers.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { virtual_servers } from './virtual_servers.model';
import { vm_status } from 'src/manuals/manuals.model';

@Module({
  controllers: [VirtualServersController],
  providers: [VirtualServersService],
  imports: [
    SequelizeModule.forFeature([
      virtual_servers,
      vm_status,
      
    ])
  ],
  exports: [
    
  ]
})
export class VirtualServersModule {}
