import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { physical_servers } from './physical_servers.model';
import { create_dto_physical_servers } from './dto/create_physical_servers.dto';
import { where } from 'sequelize';


@Injectable()
export class PhysicalServersService {

    constructor(
        @InjectModel(physical_servers) private physical_servers_repository: typeof physical_servers,
    ){}

    async physical_servers_get_all() {
        let all_physical_servers = await this.physical_servers_repository.findAll({
            where:{},
            include:[{
                association: "memory_type_status",
                attributes: ["status"]
            },
            {
                association: "os_status",
                attributes: ["status"]
            },
            {
                association: "disk_status",
                attributes: ["status"]
            },
            {
                association: "backup_status",
                attributes: ["status"]
            },
            {
                association: "location_status",
                attributes: ["status"]
            },
            {
                association: "backup_physical_machine_status",
                attributes: ["status"]
            },
        ]
        });
        
        return all_physical_servers;
    }

    async physical_servers_create(dto: create_dto_physical_servers) {
        const physical_servers = this.physical_servers_repository.create(dto);
        return physical_servers;
    }

    async physical_servers_check(id: string) {
        let physical_server = await this.physical_servers_repository.findOne({
            where: {"id": id},
        include:[{
            association: "memory_type_status",
            attributes: ["status"]
        },
        {
            association: "os_status",
            attributes: ["status"]
        },
        {
            association: "disk_status",
            attributes: ["status"]
        },
        {
            association: "backup_status",
            attributes: ["status"]
        },
        {
            association: "location_status",
            attributes: ["status"]
        },
        {
            association: "backup_physical_machine_status",
            attributes: ["status"]
        },
    ]});

        return physical_server;
    }

    async physical_servers_delete(id: string) {
        const physical_server = await this.physical_servers_repository.destroy({where: {"id": id}});
        return physical_server;
    }

    async physical_servers_update(dto: create_dto_physical_servers ,id: string) {
        const physical_server = await this.physical_servers_repository.update(dto, {where: {"id": id}})
        return physical_server
    }
}

