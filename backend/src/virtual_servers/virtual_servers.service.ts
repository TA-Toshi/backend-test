import { Injectable } from '@nestjs/common';
import { virtual_servers } from './virtual_servers.model';
import { InjectModel } from '@nestjs/sequelize';
import { create_dto_virtual_servers } from './dto/create_virtual_servers.dto';

@Injectable()
export class VirtualServersService {

    constructor(@InjectModel(virtual_servers) private virtual_servers_repository: typeof virtual_servers){}

    async virtual_servers_get_all() {
        const all_virtual_servers = await this.virtual_servers_repository.findAll({
            where:{},
            include:[{
                association: "vm_status_status",
                attributes: ["status"]
            },
            {
                association: "os_status",
                attributes: ["status"]
            },
            {
                association: "disk_location_status",
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
                association: "backup_creation_mechanism_status",
                attributes: ["status"]
            },
        ]}
        );
        return all_virtual_servers;
    }

    async virtual_server_create(dto: create_dto_virtual_servers) {
        const vr_server = this.virtual_servers_repository.create(dto);
        return vr_server;
    }

    async virtual_server_check(id: string) {
        const vr_server = this.virtual_servers_repository.findOne({
            where: {"id": id},
            include:[{
                association: "vm_status_status",
                attributes: ["status"]
            },
            {
                association: "os_status",
                attributes: ["status"]
            },
            {
                association: "disk_location_status",
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
                association: "backup_creation_mechanism_status",
                attributes: ["status"]
            },
        ]});
        return vr_server;
    }

    async virtual_server_delete(id: string) {
        const vr_server = this.virtual_servers_repository.destroy({where: {"id": id}});
        return vr_server;
    }

    async virtual_server_update(dto: create_dto_virtual_servers, id: string) {
        const vr_server = this.virtual_servers_repository.update(dto, {where: {"id": id}});
        return vr_server;
    } 
}
