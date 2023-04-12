import { Module } from '@nestjs/common';
import { PhysicalServersController } from './physical_servers.controller';
import { PhysicalServersService } from './physical_servers.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { physical_servers } from './physical_servers.model';

@Module({
  controllers: [PhysicalServersController],
  providers: [PhysicalServersService],
  imports: [
    SequelizeModule.forFeature([
      physical_servers,
      
    ])
  ],
  exports: [

  ]
})
export class PhysicalServersModule {}
