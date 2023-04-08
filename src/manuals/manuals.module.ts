import { Module } from '@nestjs/common';
import { ManualsController } from './manuals.controller';
import { ManualsService } from './manuals.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { physical_servers } from 'src/physical_servers/physical_servers.model';
import { os } from './manuals.model';
// import { PhysicalServersService } from 'src/physical_servers/physical_servers.service';

@Module({
  controllers: [ManualsController],
  providers: [ManualsService],
  imports: [
    SequelizeModule.forFeature([physical_servers, os]),

  ],
  // exports: [
  //   PhysicalServersService,
  // ]
})
export class ManualsModule {}
