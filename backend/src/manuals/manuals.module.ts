import { Module } from '@nestjs/common';
import { ManualsController } from './manuals.controller';
import { ManualsService } from './manuals.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { physical_servers } from 'src/physical_servers/physical_servers.model';
import { disk, memory_type, os, backup, zabbix_agent, location, backup_physical_machine, vm_status, disk_location, backup_creation_mechanism } from './manuals.model';
import { virtual_servers } from 'src/virtual_servers/virtual_servers.model';

@Module({
  controllers: [ManualsController],
  providers: [ManualsService],
  imports: [
    SequelizeModule.forFeature([
      physical_servers, 
      os,
      memory_type,
      disk,
      backup,
      zabbix_agent,
      location,
      backup_physical_machine,
      vm_status,
      disk_location,
      backup_creation_mechanism,
      virtual_servers,
    ]),
  ],
})
export class ManualsModule {}
