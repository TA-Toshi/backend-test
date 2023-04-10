import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { PhysicalServersModule } from './physical_servers/physical_servers.module';
import { ManualsModule } from './manuals/manuals.module';
import { VirtualServersModule } from './virtual_servers/virtual_servers.module';
import { backup, backup_creation_mechanism, backup_physical_machine, disk, disk_location, location, memory_type, os, vm_status, zabbix_agent } from "./manuals/manuals.model";
import { physical_servers } from "./physical_servers/physical_servers.model";
import { virtual_servers } from "./virtual_servers/virtual_servers.model";


@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [
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
            ],
            autoLoadModels: true,
          }),
        PhysicalServersModule,
        ManualsModule,
        VirtualServersModule,
    ]
})
export class AppModule {}